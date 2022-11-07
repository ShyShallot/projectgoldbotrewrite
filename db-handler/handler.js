const fsSync = require('fs/promises');
const fs = require("fs");
const fileLib = require('../fileLib');
maDB = modules.export = {
    async initGuildDatabase(guildObject){
        var status = false; // Mark a Boolen status so we can confirm wether or not something was done, probably a more efficient way to do this but whatever
        folderStat = this.searchForGuildFolder(guildObject.id); // check
        if(!folderStat){
            fs.mkdir(guildObject.id);
            folderHeader = {"name":guildObject.name,"id":guildObject.id};
            await fsSync.writeFile(__dirname+fileLib.folderDirection()+guildObject.id+fileLib.folderDirection()+"header.json",JSON.stringify(folderHeader), (err) =>{
                if(err) throw err;
                status = true;
            });
            if(!status){ return Promise.reject(status); }
            return Promise.resolve(status);
        }
        return Promise.reject('Guild is already Initialized');
    },
    async searchForGuildFolder(guildId){
        guildDir = __dirname+fileLib.folderDirection()+guildId;
        folderStat = fs.existsSync(guildDir);
        if(!folderStat){ return Promise.reject(false); }
        return Promise.resolve(true);
    },
    async retrieveGuildFolderContents(guildId){
        guildDir = __dirname+fileLib.folderDirection()+guildId;
        if(!fs.existsSync(guildDir)){return Promise.reject("No Guild Folder");}
        folderContents = await fsSync.readdir(guildDir);
        return Promise.resolve(folderContents);
    },
    async retrieveGuildFile(guildId,fileName){
        guildDir = __dirname+fileLib.folderDirection()+guildId;
        folder = await this.retrieveGuildFolderContents(guildId);
        var file;
        for(i=0;i<folder.length;i++){
            if(folder[i] === `${fileName}.json`){
                file = JSON.parse(await fsSync.readFile(guildDir+fileLib.folderDirection()+`${fileName}.json`))
            }
        }
    }
}