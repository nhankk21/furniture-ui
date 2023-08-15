import {ICurrency, ILocaleSettings} from 'Boundless-api-client';

export interface IBasicSettings {
	'system.locale': ILocaleSettings,
	'system.currency': ICurrency
}