import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
import App from './routes/app'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/tableManager'))
          cb(null, { component: require('./routes/tableManager/') })
        }, 'tableManager')
      },
      childRoutes: [
        {
          path: 'showApi/info',
          name: 'showApi/info',
          getIndexRoute (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/showApi'))
              cb(null, { component:require('./routes/showApi/')})
            }, 'showApi')
          },
        },
        {
          path: 'tableManager',
          name: 'tableManager',
          getIndexRoute (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tableManager'))
              cb(null,  { component:require('./routes/tableManager/')} )
            }, 'tableManager')
          },

          childRoutes: [
            {
              path: 'create',
              name: 'tableManagerCreate',

              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/tableForm'));
                  cb(null, require('./routes/tableManager/TableForm'))
                }, 'tableManager')
              }
            },
            {
              path: 'edit/:id',
              name: 'tableManagerEdit',

              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/tableForm'));
                  cb(null, require('./routes/tableManager/TableForm'))
                }, 'tableManager')
              }
            }
          ]
        },
        {   
          path: 'CambodiaChress',
          name: 'CambodiaChress',
          getIndexRoute (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tableManager'))
                  cb(null,{ component:require('./routes/tableManager/')})
            }, 'playerQuery')
          },
          childRoutes: [
            {
              path: 'playerQuery',
              name: 'playerQuery',
              getIndexRoute(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/playerQuery'))
                  cb(null, { component:require('./routes/playerQuery/')})
                }, 'playerQuery')
              },
            childRoutes:[
              {
                path: 'create',
                name: 'playerQueryCreate',
                getComponent(nextState, cb) {
                  require.ensure([], require => {
                    registerModel(app, require('./models/playerForm'));
                    cb(null, require('./routes/playerQuery/playerForm'))
                  }, 'playerQuery')
                }
              },
              {
                path: 'edit/:tid',
                name: 'playerQueryEdit',
                getComponent(nextState, cb) {
                  require.ensure([], require => {
                    registerModel(app, require('./models/playerForm'));
                    cb(null, require('./routes/playerQuery/playerForm'))
                  }, 'playerQuery')
                }
              },
            ]
            },  
            {
              path: 'playerPaysInfo',
              name: 'playerPaysInfo',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/playerPaysInfo'));
                  cb(null, require('./routes/playerPaysInfo/'))
                }, 'playerPaysInfo')
              },
             },
            {
              path: 'expendsManager',
              name: 'expendsManager',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/expendsManager'));
                  cb(null, require('./routes/expendsManager/'))
                }, 'expendsManager')
              },
            },
          ]
        }
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
