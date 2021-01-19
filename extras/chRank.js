module.exports.levelRank = async function(client, msg, sql) {
    sql.get(`SELECT * FROM userScores WHERE guildID='${msg.guild.id}' AND userID='${msg.author.id}'`).then(rlch =>{
        sql.get(`SELECT * FROM levelRoles WHERE guildID='${msg.guild.id}' AND level=${rlch.uLevel}`).then(grank =>{
            if(!grank){
                return true;
            }else{
				let role = msg.guild.roles.cache.find(r => r.id === grank.id);
		    if (!role) return true;
                    if(msg.member.roles.cache.has(role)) {
                        return true;
                    } else {
                        msg.member.roles.add(role);
                    }
                } 
        }).catch((err) =>{
            console.log(err);

            client.users.cache.get("428835662310146049").send(`${err}`);
        })
    }).catch((err) =>{
        console.log(err);
        client.users.cache.get("428835662310146049").send(`${err}`);
    })
};

/*
* module.exports.levelRank = function(msg, sql) {
sql.get(`SELECT * FROM userScores WHERE guildID='${msg.guild.id}' AND userID='${msg.author.id}'`).then(rlch =>{
    sql.get(`SELECT * FROM levelRoles WHERE guildID='${msg.guild.id}' AND level=${rlch.uLevel}`).then(grank =>{
      if(!grank){
        return;
      }else{
        let role = message.guild.roles.cache.find(r => r.name === grank.roleName);
        if(msg.member.roles.has(role.id)) {
          return;
        } else {
          msg.member.Role(role);
        }
      }

    }).catch((err) =>{
      console.log(err);
      client.users.cache.get("428835662310146049).send(`${err}`);
    })
  }).catch((err) =>{
    console.log(err);
    client.users.cache.get("428835662310146049").send(`${err}`);
  })
}*/