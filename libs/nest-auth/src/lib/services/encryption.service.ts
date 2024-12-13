import { Injectable } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const IV_LENGTH = 16;

@Injectable()
export class EncryptionService {
    encrypt(data: string, secret: string): string {
        const iv = randomBytes(IV_LENGTH);
        const cipher = createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
        let encrypted = cipher.update(data, "utf8", "base64");
        encrypted += cipher.final("base64");
        return `${iv.toString("base64")}:${encrypted}`;
    }

    decrypt(encryptedData: string, secret: string): string {
        const [iv, encryptedText] = encryptedData.split(":");
        const decipher = createDecipheriv("aes-256-cbc", Buffer.from(secret), Buffer.from(iv, "base64"));
        let decrypted = decipher.update(encryptedText, "base64", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
}
