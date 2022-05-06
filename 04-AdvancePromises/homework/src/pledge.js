'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// TU CÓDIGO AQUÍ:

'use strict';

function $Promise(executor) {
    if (typeof executor != "function") throw new TypeError("executor function");
    this._state = "pending";
    this._handlerGroups = [];
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
  }
  
  $Promise.prototype._internalResolve = function (data) {
    if (this._state === "pending") {
      this._state = "fulfilled";
      this._value = data;
      this._callHandlers()
    }
  };
  
  $Promise.prototype._internalReject = function (data) {
    if (this._state === "pending") {
      this._state = "rejected";
      this._value = data;
      this._callHandlers()
    }
  };

  $Promise.prototype.then = function (successCb, errorCb) {
    if (typeof successCb !== "function") successCb = false;
    if (typeof errorCb !== "function") errorCb = false;

    const downstreamPromise = new $Promise(() => {});
    this._handlerGroups.push({ successCb, errorCb, downstreamPromise });
   
    if (this._state !== "pending") this._callHandlers();
   
    return downstreamPromise;
  };

  $Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length > 0){
        let current = this._handlerGroups.shift()
        if(this._state === 'fulfilled'){
          if(!current.successCb){
            current.downstreamPromise._internalResolve(this._value)
          }else{

            try {
              const result = current.successCb(this._value)
              if(result instanceof $Promise){
                result.then(value => current.downstreamPromise._internalResolve(value), err=> current.downstreamPromise._internalReject(err))
              }else{
                current.downstreamPromise._internalResolve(result)
              }
            } catch (error) {
              current.downstreamPromise._internalReject(error)
            }
          }

            //current.successCb && current.successCb(this._value)
        }else if(this._state === 'rejected'){
            // current.errorCb && current.errorCb(this._value)
            if(!current.errorCb){
              current.downstreamPromise._internalReject(this._value)
            }else{
              try{
                const result2 = current.errorCb(this._value)
                if(result2 instanceof $Promise){
                  result2.then(value => current.downstreamPromise._internalResolve(value), err=> current.downstreamPromise._internalReject(err))
                }else{
                  current.downstreamPromise._internalResolve(result2)
                }
              } catch (error){
                current.downstreamPromise._internalReject(error);
              }
            }
        }
    }
  }

  $Promise.prototype.catch = function(errorCb){
   return this.then(null, errorCb)
  }



  module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
