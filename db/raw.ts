import {env} from 'cloudflare:workers';
export function database(){if(!env.DB)throw new Error('Interest storage unavailable');return env.DB;}
