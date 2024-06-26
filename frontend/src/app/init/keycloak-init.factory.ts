import {KeycloakService} from 'keycloak-angular';
import {switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {ConfigInitService} from './config-init.service';

export function initializeKeycloak(
  keycloak: KeycloakService,
  configService: ConfigInitService
  ): () => Promise<unknown> {
    return () =>
      configService.getConfig()
        .pipe(
          switchMap<any, any>((config) => {

            return fromPromise(keycloak.init({
              config: {
                url: config.KEYCLOAK_URL,
                realm: config.KEYCLOAK_REALM,
                clientId: config.KEYCLOAK_CLIENT_ID,
              },
              initOptions: {
                checkLoginIframe: false
              }
            }));

          })
        ).toPromise();
}

