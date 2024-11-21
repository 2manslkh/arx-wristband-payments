
import { Magic } from 'magic-sdk';
import { WebAuthnExtension } from '@magic-ext/webauthn';
import { PUBLIC_MAGIC_API_KEY } from '$env/static/public';


export const magic = new Magic(PUBLIC_MAGIC_API_KEY, {
  extensions: [new WebAuthnExtension()],
});