import { ResourceRef, Signal } from '@angular/core';

import { UserInterface } from '../../interfaces/user-interface';
import { environment } from '../../../environments/environment';
import { UserPayloadCreateInterface, UserPayloadUpdateInterface } from '../../interfaces/user-payload.interface';

export abstract class UserServiceAbstract {
readonly API_ENDPOINT = `${environment.apiUrl}/users`;

abstract load(): ResourceRef<UserInterface[]>;

abstract add(
    userSignal: Signal<UserPayloadCreateInterface | undefined>,
): ResourceRef<UserInterface | undefined>;

abstract update(
    userSignal: Signal<UserPayloadUpdateInterface | undefined>,
): ResourceRef<UserInterface | undefined>;

abstract remove(
    userSignal: Signal<UserInterface | undefined>,
): ResourceRef<UserInterface | undefined>;
}