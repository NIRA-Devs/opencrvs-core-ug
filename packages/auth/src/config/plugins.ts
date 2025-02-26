/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors located at https://github.com/opencrvs/opencrvs-core/blob/master/AUTHORS.
 */
import { SENTRY_DSN } from '@auth/constants'
import { ServerRegisterPluginObject } from '@hapi/hapi'
import { logger } from '@opencrvs/commons'
import * as Pino from 'hapi-pino'
import * as Sentry from 'hapi-sentry'

type IHapiPlugin<T = any> = ServerRegisterPluginObject<T>

export default function getPlugins() {
  const plugins: IHapiPlugin[] = []

  if (process.env.NODE_ENV === 'production') {
    plugins.push({
      plugin: Pino,
      options: {
        prettyPrint: false,
        logPayload: false,
        instance: logger
      }
    })
  }

  if (SENTRY_DSN) {
    plugins.push({
      plugin: Sentry,
      options: {
        client: {
          environment: process.env.DOMAIN,
          dsn: SENTRY_DSN
        },
        catchLogErrors: true
      }
    })
  }
  return plugins
}
