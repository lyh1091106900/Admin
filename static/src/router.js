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
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/tableManager'))
          cb(null, { component: require('./routes/tableManager/') })
        }, 'tableManager')
      },
      childRoutes: [
        {
          path: 'showApi/info',
          name: 'showApi/info',
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/showApi'))
              cb(null, { component: require('./routes/showApi/') })
            }, 'showApi')
          },
        },
        {
          path: 'tableManager',
          name: 'tableManager',
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tableManager'))
              cb(null, { component: require('./routes/tableManager/') })
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
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tableManager'))
              cb(null, { component: require('./routes/tableManager/') })
            }, 'playerQuery')
          },
          childRoutes: [
            {
              path: 'playerQuery',
              name: 'playerQuery',
              getIndexRoute(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/playerQuery'))
                  cb(null, { component: require('./routes/playerQuery/') })
                }, 'playerQuery')
              },
              childRoutes: [
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
                  path: 'edit/:userid',
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
              path: 'carouselInfoManager',
              name: 'carouselInfoManager',
              getIndexRoute(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/carouselInfoManager'))
                  cb(null, { component: require('./routes/carouselInfoManager/') })
                }, 'carouselInfoManager')
              },
              childRoutes: [
                {
                  path: 'create',
                  name: 'carouselInfoCreate',
                  getComponent(nextState, cb) {
                    require.ensure([], require => {
                      registerModel(app, require('./models/carouselForm'));
                      cb(null, require('./routes/carouselInfoManager/carouselForm'))
                    }, 'carouselInfoManager')
                  }
                },
                {
                  path: 'edit/:meID',
                  name: 'carouselInfoEdit',
                  getComponent(nextState, cb) {
                    require.ensure([], require => {
                      registerModel(app, require('./models/carouselForm'));
                      cb(null, require('./routes/carouselInfoManager/carouselForm'))
                    }, 'carouselInfoManager')
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
              path: 'playerExInfo',
              name: 'playerExInfo',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/playerExInfo'));
                  cb(null, require('./routes/playerExInfo/'))
                }, 'playerExInfo')
              },
            },
            {
              path: 'rechargeOrder',
              name: 'rechargeOrder',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/rechargeOrder'));
                  cb(null, require('./routes/rechargeOrder/'))
                }, 'rechargeOrder')
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
            {
              path: 'gamesDetailQuery',
              name: 'gamesDetailQuery',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/gamesDetailQuery'));
                  cb(null, require('./routes/gamesDetailQuery/'))
                }, 'gamesDetailQuery')
              },
            },
            {
              path: 'shopItem',
              name: 'shopItem',
              getIndexRoute(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/shopItem'));
                  cb(null, { component: require('./routes/shopItem') })
                }, 'shopItem')
              },
              childRoutes: [
                {
                  path: 'create',
                  name: 'shopItemCreate',
                  getComponent(nextState, cb) {
                    require.ensure([], require => {
                      registerModel(app, require('./models/shopItemForm'));
                      cb(null, require('./routes/shopItem/shopItemForm'))
                    }, 'shopItem')
                  }
                },
                {
                  path: 'edit/:productID',
                  name: 'shopItemEdit',
                  getComponent(nextState, cb) {
                    require.ensure([], require => {
                      registerModel(app, require('./models/shopItemForm'));
                      cb(null, require('./routes/shopItem/shopItemForm'))
                    }, 'shopItem')
                  }
                },
              ]
            },
            {
              path: 'activityManager',
              name: 'activityManager',
              getIndexRoute(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/activityManager'));
                  cb(null, { component: require('./routes/activityManager') })
                }, 'activityManager')
              },
              childRoutes: [
                {
                  path: 'create',
                  name: 'activityCreate',
                  getComponent(nextState, cb) {
                    require.ensure([], require => {
                      registerModel(app, require('./models/activityForm'));
                      cb(null, require('./routes/activityManager/activityForm'))
                    }, 'activityManager')
                  }
                },
                {
                  path: 'edit/:acID',
                  name: 'activityEdit',
                  getComponent(nextState, cb) {
                    require.ensure([], require => {
                      registerModel(app, require('./models/activityForm'));
                      cb(null, require('./routes/activityManager/activityForm'))
                    }, 'activityManager')
                  }
                },
              ]
            },
            {
              path: 'exchangeItem',
              name: 'exchangeItem',
              getIndexRoute(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/exchangeItem'));
                  cb(null, { component: require('./routes/exchangeItem') })
                }, 'exchangeItem')
              },
              childRoutes: [
                {
                  path: 'create',
                  name: 'exchangeItemCreate',
                  getComponent(nextState, cb) {
                    require.ensure([], require => {
                      registerModel(app, require('./models/exchangeItemForm'));
                      cb(null, require('./routes/exchangeItem/exchangeItemForm'))
                    }, 'exchangeItem')
                  }
                },
                {
                  path: 'edit/:exchange_itemID',
                  name: 'exchangeItemEdit',
                  getComponent(nextState, cb) {
                    require.ensure([], require => {
                      registerModel(app, require('./models/exchangeItemForm'));
                      cb(null, require('./routes/exchangeItem/exchangeItemForm'))
                    }, 'exchangeItem')
                  }
                },
              ]
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
