/**
 * Represents user authentication data, including email and password.
 * Provides methods for validating email and password formats.
 */
export class BaseUserAuthenticationData {
    /**
     * Constructs a new instance of BaseUserAuthenticationData.
     * @param email - The user's email address (optional).
     * @param password - The user's password (optional).
     */
    constructor(
        protected email?: string,
        protected password?: string,
    ) {
        if (email) {
            this.setEmail(email); // Validate email during initialization
        }
        if (password) {
            this.setPassword(password); // Validate password during initialization
        }
    }

    /**
     * Retrieves the user's email address.
     * @returns The user's email address, or undefined if not set.
     */
    public getEmail(): string | undefined {
        return this.email;
    }

    /**
     * Sets the user's email address after validation.
     * @param email - The email address to set.
     * @throws {InvalidEmailException} If the email is invalid.
     */
    public setEmail(email: string): void {
        if (!this.validateEmail(email)) {
            throw new InvalidEmailException(`Invalid email address: ${email}`);
        }
        this.email = email;
    }

    /**
     * Sets the user's password after validation.
     * @param password - The password to set.
     * @throws {InvalidPasswordException} If the password is invalid.
     */
    public setPassword(password: string): void {
        if (!this.validatePassword(password)) {
            throw new InvalidPasswordException(`Invalid password: Password must meet the required criteria.`);
        }
        this.password = password;
    }

    /**
     * Validates the format of a password.
     * 
     * Password requirements:
     * - At least 12 characters long.
     * - Contains no whitespace characters.
     * - Includes at least one uppercase letter.
     * - Includes at least one lowercase letter.
     * - Includes at least one number.
     * - Includes at least one non-alphanumeric character in the lower 128 ASCII range.
     * 
     * @param password - The password to validate.
     * @returns `true` if the password meets the criteria, otherwise `false`.
     */
    public validatePassword(password: string): boolean {
        const passwordValidationRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{12,}$/;
        return passwordValidationRegex.test(password);
    }

    /**
     * Validates the format of an email address.
     * 
     * Email requirements:
     * - Contains an '@' symbol.
     * - The part after the '@' must be a valid domain name or an IP address.
     * 
     * Domain name validation:
     * - Must have a valid domain name format (e.g., `example.com`).
     * 
     * IP address validation:
     * - Must be enclosed in square brackets (e.g., `user@[192.168.1.1]`).
     * 
     * @param email - The email address to validate.
     * @returns `true` if the email meets the criteria, otherwise `false`.
     */
    public validateEmail(email: string): boolean {
        const emailWithDomainNameValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simplified domain validation
        const emailWithIpAddressValidationRegex = /^[^\s@]+@[^\s@]+\[(\d{1,3}\.){3}\d{1,3}\]$/; // IP address validation
        return emailWithDomainNameValidationRegex.test(email) || emailWithIpAddressValidationRegex.test(email);
    }
}

/**
 * Exception thrown when an invalid email is provided.
 */
export class InvalidEmailException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidEmailException';
    }
}

/**
 * Exception thrown when an invalid password is provided.
 */
export class InvalidPasswordException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidPasswordException';
    }
}
