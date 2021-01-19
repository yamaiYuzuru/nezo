const checkRank = require('./chRank.js');
const lUpEmbed = require('./../embeds/eLevelUp.js');
module.exports.scoreSystem = async function(client, msg, sql, Discord){
    if (msg.author.id === "586905336850677760") return true;
    sql.get(`SELECT * FROM userScores WHERE guildID = '${msg.guild.id}' AND userID = '${msg.author.id}'`).then(row =>{
        const eUsername = msg.author.username.replace("'", "''");
        if (!row){
            sql.run(`INSERT INTO userScores (guildID, userID, username, globalPoints, nextPL, uLevel, weeklyPoints, globalRank, weeklyRank) VALUES (?,?,?,?,?,?,?,?,?)`, [msg.guild.id, msg.author.id, msg.author.username, 1, 50, 0, 0, 0, 0]);
        } else{
            let curPoints = row.globalPoints + 1;

            if (curPoints > row.nextPL){
                let nPLE = Math.floor(row.nextPL * 1.25);//calculates points for next level
                sql.run(`UPDATE userScores SET globalPoints=${row.globalPoints + 1}, weeklyPoints=${row.weeklyPoints + 1}, uLevel = ${row.uLevel + 1}, nextPL = ${nPLE}, username=\'` + eUsername +`' WHERE userID=${msg.author.id} AND guildID=${msg.guild.id}`);
                lUpEmbed.levelUpEmbed(client, msg, Discord, row.uLevel + 1);
            }//curPoints > row.nextPL
            checkRank.levelRank(client, msg, sql); //FOR LEVEL/RANK IMPLEMENTS
            sql.run(`UPDATE userScores SET username=\'` + eUsername +`', globalPoints = ${row.globalPoints + 1}, weeklyPoints = ${row.weeklyPoints + 1} WHERE userID = ${msg.author.id} AND guildID = ${msg.guild.id}`);//updates points
            sql.all(`SELECT userID from userScores WHERE guildID = '${msg.guild.id}' ORDER BY globalPoints DESC`).then(rColumns =>{
                const setRankUsers = rColumns.map(z => z.userID);
                let i = 0;
                while(setRankUsers[i]){
                    sql.run(`UPDATE userScores SET globalRank = ${i + 1} WHERE userID=${setRankUsers[i]} AND guildID=${msg.guild.id}`);
                    i++
                }//while loop end
            })
        }//else !row
    })//sql
};