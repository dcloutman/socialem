import { BaseUserAuthenticationData, InvalidEmailException, InvalidPasswordException } from '../../index.js';
import { describe, it, expect } from 'vitest';

describe('BaseUserAuthenticationData', () => {
    it('should set and retrieve a valid email', () => {
        const user = new BaseUserAuthenticationData();
        user.setEmail('user@example.com');
        expect(user.getEmail()).toBe('user@example.com');
    });

    it('should throw an InvalidEmailException for an invalid email', () => {
        const user = new BaseUserAuthenticationData();
        expect(() => user.setEmail('invalid-email')).toThrow(InvalidEmailException);
    });

    it('should set and validate a valid password', () => {
        const user = new BaseUserAuthenticationData();
        const validPassword = 'SecureP@ssw0rd!';
        user.setPassword(validPassword);
        expect(user.validatePassword(validPassword)).toBe(true);
    });

    it('should throw an InvalidPasswordException for an invalid password', () => {
        const user = new BaseUserAuthenticationData();
        const invalidPassword = 'short';
        expect(() => user.setPassword(invalidPassword)).toThrow(InvalidPasswordException);
    });

    it('should validate email format correctly', () => {
        const user = new BaseUserAuthenticationData();
        expect(user.validateEmail('user@example.com')).toBe(true);
        expect(user.validateEmail('user@[192.168.1.1]')).toBe(true);
        expect(user.validateEmail('invalid-email')).toBe(false);
    });

    it('should validate password format correctly', () => {
        const user = new BaseUserAuthenticationData();
        expect(user.validatePassword('SecureP@ssw0rd!')).toBe(true);
        expect(user.validatePassword('short')).toBe(false);
        expect(user.validatePassword('NoSpecialChar123')).toBe(false);
        expect(user.validatePassword('NoNumber!')).toBe(false);
    });
});
