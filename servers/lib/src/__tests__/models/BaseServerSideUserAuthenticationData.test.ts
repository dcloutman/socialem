import { describe, it, expect } from 'vitest';
import { BaseServerSideUserAuthenticationData } from '../../models/BaseServerSideUserAuthenticationData.js';

describe('BaseServerSideUserAuthenticationData', () => {
    it('should inherit methods from BaseUserAuthenticationData', () => {
        const user = new BaseServerSideUserAuthenticationData();
        user.setEmail('user@example.com');
        expect(user.getEmail()).toBe('user@example.com');
    });

    it('should allow instantiation without errors', () => {
        const user = new BaseServerSideUserAuthenticationData();
        expect(user).toBeInstanceOf(BaseServerSideUserAuthenticationData);
    });
});
