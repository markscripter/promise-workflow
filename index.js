import Promise from 'bluebird';  // our Promises library

/**
 * This object creates a workflow, using Promises.
 * @module workflowFactory
 * @author Mark Scripter [markscript@gmail.com]
 * @requires bluebird
 * @returns {workflow} - A workflow object
 * @example
 * import workflowFactory from './workflowFactory';
 */
function workflowFactory() {
  /**
   * This object creates a workflow, using Promises.
   * @module workflow
   * @author Mark Scripter [markscript@gmail.com]
   * @example
   * import workflowFactory from './workflowFactory';
   * const workflow = workFlowFactory();
   */
  const workflow = {

    /**
    * The sync() method will run through the tasks syncronously.
    * Use this method when the tasks depend on eachother. They will be
    * iterated through one after another.
    * @param {Array} tasks - An array of functions that return a promise.
    * @return {object} returns an object hash of the task results
    * @example
    * workflow.sync([PromiseFunc, PromiseFunc, PromiseFunc]);
    * // func 1 will run. once completed,
    * // func 2 will run. once completed,
    * // func 3 will fun. once completed,
    * // they will be returned
    */
    sync(tasks = [Promise.resolve()]) {
      const results = [];
      return Promise.resolve(tasks)
        .each((task) => task().then((res) => results.push(res)))
        .then(() => results);
    },

    /**
    * The async() method will run through the tasks asyncronously.
    * Use this method when none of the tasks depend on eachother but all
    * need to be completed before continuing.
    * @param {Array} tasks - An array of functions that return a promise.
    * @example
    * workflow.async([PromiseFunc, PromiseFunc, PromiseFunc]);
    * // func 1 will be triggered
    * // func 2 will be triggered
    * // func 3 will be triggered
    * // when any of the items returns,
    * // it will check and keep count of how many of the tasks were completed.
    * // once all are done, they will be returned.
    */
    async(tasks = [Promise.resolve]) {
      const taskPromises = tasks.map(task => task());
      return Promise.all(taskPromises);
    },

  };

  return workflow;
}

export default workflowFactory;
