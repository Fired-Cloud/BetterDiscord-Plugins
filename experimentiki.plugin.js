/**
 * @name discordExperiments_v2
 * @description Enables the experiments tab in discord's settings.
 * @author FireCloud
 * @version 2.0
 * @website https://betterdiscord.app/plugin/Discord%20Experiments
 * @source https://github.com/Fired-Cloud/BetterDiscord-Plugins/blob/main/experimentiki.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Fired-Cloud/BetterDiscord-Plugins/main/experimentiki.plugin.js
 */

 const settingsStore = BdApi.findModule(m => typeof m?.default?.isDeveloper !== "undefined");
 const userStore = BdApi.findModule(m => m?.default?.getUsers);
 
 module.exports = class {
     getName(){ return "Discord Experiments"; }
 
     start() {
         const nodes = Object.values(settingsStore.default._dispatcher._actionHandlers._dependencyGraph.nodes);
         try {
             nodes.find(x => x.name == "ExperimentStore").actionHandler["CONNECTION_OPEN"]({user: {flags: 1}, type: "CONNECTION_OPEN"})
         } catch (e) {} // this will always intentionally throw
         const oldGetUser = userStore.default.__proto__.getCurrentUser;
         userStore.default.__proto__.getCurrentUser = () => ({hasFlag: () => true})
         nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]()
         userStore.default.__proto__.getCurrentUser = oldGetUser
     }
 
     stop(){
         Object.values(settingsStore.default._dispatcher._dependencyGraph.nodes).find(x => x.name == "ExperimentStore").actionHandler["CONNECTION_OPEN"]({user: {flags: 0}, type: "CONNECTION_OPEN"})
     }
 };
