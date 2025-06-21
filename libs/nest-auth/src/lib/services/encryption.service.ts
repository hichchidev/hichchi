import { Injectable } from "@nestjs/common";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { LoggerService } from "@hichchi/nest-core";

const IV_LENGTH = 16;

@Injectable()
export class EncryptionService {
    /**
     * Convert a secret string into a cryptographic key
     *
     * This private method generates a consistent 32-byte key from a secret string.
     * If the secret is already a valid 32-byte hex string, it's converted directly.
     * Otherwise, it hashes the string to create a key.
     *
     * @param {string} secret - The secret string to convert
     * @returns {Buffer} A 32-byte buffer containing the key
     * @private
     */
    private getKey(secret: string): Buffer {
        // If the secret is already a valid 32-byte hex string (64 characters)
        if (/^[0-9a-f]{64}$/i.test(secret)) {
            return Buffer.from(secret, "hex");
        }

        // Otherwise, hash the string to get a consistent 32-byte key
        return createHash("sha256").update(secret).digest();
    }

    /**
     * Encrypt data using AES-256-CBC
     *
     * This method encrypts a string using AES-256-CBC encryption with a random initialization vector.
     * The result is a string containing the base64-encoded IV and encrypted data, separated by a colon.
     *
     * @param {string} data - The data to encrypt
     * @param {string} secret - The secret key for encryption
     * @returns {string} The encrypted data in the format "iv:encryptedData"
     * @throws {Error} If encryption fails
     *
     * @example
     * ```TypeScript
     * const encrypted = encryptionService.encrypt('sensitive data', 'my-secret-key');
     * // Result: "iv-base64:encrypted-data-base64"
     * ```
     */
    encrypt(data: string, secret: string): string {
        try {
            const iv = randomBytes(IV_LENGTH);
            const cipher = createCipheriv("aes-256-cbc", this.getKey(secret), iv);
            let encrypted = cipher.update(data, "utf8", "base64");
            encrypted += cipher.final("base64");
            return `${iv.toString("base64")}:${encrypted}`;
        } catch (error) {
            LoggerService.error(error);
            throw new Error("Failed to encrypt user sessions");
        }
    }

    /**
     * Decrypt data that was encrypted with AES-256-CBC
     *
     * This method decrypts a string that was encrypted using the encrypt method.
     * It expects the input to be in the format "iv:encryptedData" where both parts are base64-encoded.
     *
     * @param {string} encryptedData - The encrypted data in the format "iv:encryptedData"
     * @param {string} secret - The secret key for decryption (must be the same as used for encryption)
     * @returns {string} The decrypted data as a UTF-8 string
     * @throws {Error} If decryption fails
     *
     * @example
     * ```TypeScript
     * const decrypted = encryptionService.decrypt('iv-base64:encrypted-data-base64', 'my-secret-key');
     * // Result: "sensitive data"
     * ```
     */
    decrypt(encryptedData: string, secret: string): string {
        try {
            const [iv, encryptedText] = encryptedData.split(":");
            const decipher = createDecipheriv("aes-256-cbc", this.getKey(secret), Buffer.from(iv, "base64"));
            let decrypted = decipher.update(encryptedText, "base64", "utf8");
            decrypted += decipher.final("utf8");
            return decrypted;
        } catch (error) {
            LoggerService.error(error);
            throw new Error("Failed to decrypt user sessions");
        }
    }
}
