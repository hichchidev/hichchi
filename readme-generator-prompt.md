# README Generator Prompt Template for Junie

This is a comprehensive prompt template for generating high-quality readme-top.md files for npm packages in the Hichchi ecosystem. Use this prompt with Junie to create consistent, professional, and comprehensive documentation.

## PROMPT TEMPLATE

```
Create a comprehensive readme-top.md file for the npm package "@hichchi/[PACKAGE_NAME]" with the following specifications:

### PACKAGE INFORMATION
- Package Name: @hichchi/[PACKAGE_NAME]
- Description: [BRIEF_DESCRIPTION]
- Technology: [TECHNOLOGY_STACK] (e.g., NestJS, Angular, React, etc.)
- Main Features: [LIST_MAIN_FEATURES]
- Target Use Cases: [PRIMARY_USE_CASES]

### DESIGN REQUIREMENTS
1. **Universal Compatibility**: Design must work on both light and dark backgrounds (GitHub dark mode, npm white background)
2. **Clean & Professional**: Use simple Markdown with minimal HTML, neutral colors
3. **Comprehensive Coverage**: Include all essential sections for professional documentation
4. **Consistent Branding**: Part of the Hichchi ecosystem with consistent styling

### REFERENCE TEMPLATE
Use `libs/nest-auth/readme-top.md` as the reference template for generating the basic layout and structure. This file serves as the gold standard for:

- **Overall Structure**: Follow the same section order and organization
- **Styling Approach**: Use similar formatting, badges, and visual elements
- **Content Organization**: Mirror the way content is presented and structured
- **Markdown Patterns**: Adopt the same markdown formatting conventions
- **Badge Styling**: Use consistent badge colors, styles, and positioning
- **Section Headers**: Follow the same emoji and header formatting patterns
- **Code Block Formatting**: Use similar syntax highlighting and code presentation
- **Footer Structure**: Maintain consistent footer layout and links

**Important**: Adapt the content to be specific to the target package while maintaining the same professional layout and visual consistency established in the nest-auth readme.

### REQUIRED STRUCTURE

#### 1. Header Section
- Clean title with package name and emoji
- Brief, compelling description
- Standard badges: npm version, downloads, license, technology version
- Ecosystem reference: "Part of the Hichchi ecosystem"
- Jump to documentation link

#### 2. Table of Contents
Include all major sections with anchor links for easy navigation

#### 3. Installation
Simple npm install command with clean formatting

#### 4. Quick Start
- Minimal working example
- 2-3 step setup process
- Basic usage code snippet
- Get users up and running in minutes

#### 5. Prerequisites
- Required dependencies and versions
- Peer dependencies with install commands
- Optional dependencies for enhanced features
- System requirements

#### 6. Overview
- Clear value proposition
- What problems it solves
- Key benefits

#### 7. Features
**IMPORTANT**: Focus on user-facing features rather than internal implementation details. Examine the codebase to distinguish between what users actually interact with versus internal components.

Organize features into logical categories based on user perspective:
- **Ready-to-Use Components** - Pre-configured endpoints, controllers, or components users get out-of-the-box
- **Core Functionality** - Main features users directly configure and use
- **Protection & Security** - Guards, middleware, or security features users can apply
- **Helper Tools** - Decorators, utilities, or tools users can use in their own code
- **Configuration Options** - What users can customize and configure
- **Advanced Features** - Optional or advanced capabilities for power users

**Guidelines for Feature Selection**:
- Include features that users directly interact with or configure
- Exclude internal services, pipes, or utilities that are implementation details
- Focus on "what users get" rather than "how it's implemented internally"
- For authentication libraries: emphasize pre-configured endpoints over internal auth services
- For UI libraries: emphasize components users can use over internal utilities
- For utility libraries: emphasize functions users can call over internal helpers

Use descriptive bullet points with emojis and clear explanations that highlight user benefits

#### 8. Usage Examples
**Note**: Usage examples will be different for each library and will be generated with separate prompts. 
When generating the readme-top.md, just include the "🚀 Usage" section header and placeholder content indicating that detailed examples will be added separately.

- Include basic section structure
- Add placeholder text: "Detailed usage examples will be added here"
- Mention that examples are library-specific and generated separately

#### 9. Configuration Reference (if applicable)
- Complete configuration options
- TypeScript interfaces
- Default values
- Examples for different scenarios

#### 10. Security Best Practices (if applicable)
**Note**: Security best practices will be different for each library and will be generated with separate prompts.
When generating the readme-top.md, just include the "🔒 Security Best Practices" section header and placeholder content indicating that detailed security guidance will be added separately.

**IMPORTANT**: Analyze the codebase to identify library-specific security considerations, authentication mechanisms, data handling practices, and potential security vulnerabilities that users should be aware of.

- Include basic section structure
- Add placeholder text: "Detailed security best practices will be added here"
- Mention that security guidance is library-specific and generated separately

#### 11. Troubleshooting
**Note**: Troubleshooting content will be different for each library and will be generated with separate prompts.
When generating the readme-top.md, just include the "🛠️ Troubleshooting" section header and placeholder content indicating that detailed troubleshooting guides will be added separately.

**IMPORTANT**: Analyze the codebase to identify common integration issues, configuration problems, dependency conflicts, and runtime errors that users might encounter with this specific library.

- Include basic section structure
- Add placeholder text: "Detailed troubleshooting guides will be added here"
- Mention that troubleshooting content is library-specific and generated separately

#### 12. Debug Mode
**Note**: Debug mode configuration will be different for each library and will be generated with separate prompts.
When generating the readme-top.md, just include the "🔧 Debug Mode" section header and placeholder content indicating that detailed debug configuration will be added separately.

**IMPORTANT**: Analyze the codebase to identify library-specific debugging capabilities, logging mechanisms, development tools, and diagnostic features that users can enable for troubleshooting.

- Include basic section structure
- Add placeholder text: "Detailed debug mode configuration will be added here"
- Mention that debug guidance is library-specific and generated separately

#### 13. Performance Issues
**Note**: Performance optimization guidance will be different for each library and will be generated with separate prompts.
When generating the readme-top.md, just include the "⚡ Performance Issues" section header and placeholder content indicating that detailed performance guidance will be added separately.

**IMPORTANT**: Analyze the codebase to identify library-specific performance considerations, optimization opportunities, caching mechanisms, and common performance bottlenecks that users should be aware of.

- Include basic section structure
- Add placeholder text: "Detailed performance optimization guidance will be added here"
- Mention that performance guidance is library-specific and generated separately

#### 14. Development
- Building instructions
- Testing commands
- Development workflow

#### 15. Footer
- Made with ❤️ by HichchiDev
- Ecosystem links (badges)
- Motivational tagline

#### 16. API Documentation Section
- Clear transition to TypeDoc documentation
- Badges indicating auto-generated content
- Proper anchor for jump link

### STYLING GUIDELINES

#### Badges
- Use standard shield.io badges
- Consistent style: flat or for-the-badge
- Neutral colors that work on light/dark backgrounds
- Proper logos where appropriate
- No conflicting icons (emoji + logo)

#### Code Blocks
- Use proper language syntax highlighting
- Keep examples practical and realistic
- Include comments for clarity
- Show both basic and advanced usage

#### Emojis
- Use consistently throughout
- One emoji per section/feature
- Professional and relevant choices
- Enhance readability without being excessive

#### Links
- All external links should open properly
- Internal anchor links for navigation
- Consistent link styling

### CONTENT GUIDELINES

#### Writing Style
- Clear, concise, and professional
- Action-oriented language
- Benefit-focused descriptions
- Avoid technical jargon where possible
- Include practical examples

#### Examples
- Real-world scenarios
- Complete, working code
- Progressive complexity (basic → advanced)
- Cover common use cases
- Include error handling where relevant
- **DO NOT create fake examples** - Only use valid, working examples based on actual library features
- **Avoid invalid properties** - Do not include non-existent configuration options or fake API methods

#### Documentation Quality
- Comprehensive but not overwhelming
- Logical flow and organization
- Easy to scan and navigate
- Actionable information
- Up-to-date and accurate

### CUSTOMIZATION INSTRUCTIONS

Replace the following placeholders with package-specific information:

1. **[PACKAGE_NAME]**: The actual package name (e.g., nest-auth, ngx-utils)
2. **[BRIEF_DESCRIPTION]**: One-line description of what the package does
3. **[TECHNOLOGY_STACK]**: Primary technology (NestJS, Angular, React, etc.)
4. **[LIST_MAIN_FEATURES]**: 5-8 key features the package provides
5. **[PRIMARY_USE_CASES]**: Main scenarios where this package is useful

### SPECIFIC SECTIONS TO ADAPT

#### For NestJS Packages:
- Include module registration examples
- Show guard/decorator usage
- Include service injection patterns
- Add middleware/interceptor examples

#### For Angular Packages:
- Show module imports
- Include component usage
- Add service injection examples
- Show directive/pipe usage

#### For Utility Packages:
- Focus on function usage
- Include TypeScript examples
- Show different import patterns
- Add configuration options

#### For UI Packages:
- Include component examples
- Show styling/theming options
- Add responsive design notes
- Include accessibility considerations

### QUALITY CHECKLIST

Before finalizing, ensure:
- [ ] All links work correctly
- [ ] Code examples are syntactically correct
- [ ] Badges display properly
- [ ] Table of contents matches actual sections
- [ ] No rate limiting or non-existent features mentioned
- [ ] Consistent emoji usage
- [ ] Professional tone throughout
- [ ] Clear value proposition
- [ ] Comprehensive but not overwhelming
- [ ] Works on both light and dark backgrounds

### EXAMPLE USAGE

To use this prompt:
1. Replace all placeholders with actual package information
2. Customize sections based on package type
3. Add package-specific examples and features
4. Review against quality checklist
5. Test on both GitHub and npm for compatibility

This template ensures consistent, high-quality documentation across the entire Hichchi ecosystem while being flexible enough to accommodate different types of packages.
```

## USAGE INSTRUCTIONS

1. Copy the prompt template above
2. Replace all placeholders ([PACKAGE_NAME], [BRIEF_DESCRIPTION], etc.) with your specific package information
3. Customize the sections based on your package type (NestJS, Angular, utility, etc.)
4. Provide the customized prompt to Junie
5. Review the generated readme against the quality checklist
6. Make any necessary adjustments for your specific package

## BENEFITS

- **Consistency**: All Hichchi packages will have similar documentation structure
- **Completeness**: Ensures no important sections are missed
- **Quality**: Built-in best practices and guidelines
- **Efficiency**: Saves time by providing a proven template
- **Maintainability**: Easy to update and improve the template over time

## NOTES

- This template is based on the comprehensive improvements made to @hichchi/nest-auth
- It incorporates lessons learned from creating professional, user-friendly documentation
- The template is designed to be technology-agnostic while providing specific guidance for different package types
- Regular updates to this template will benefit all future readme generations
