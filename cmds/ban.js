exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const errorembed = new dc.MessageEmbed().setColor(153, 0, 0);
    if (guilds[msg.guild.id].english === true) {
        errorembed.setFooter("If you think, this is an error please contact the support on the support-server");
    } else {
        errorembed.setFooter("Wenn du denkst, dass dies ein Fehler ist, wenden Sie sich bitte an den Support auf dem support-server");
    }
    const bannedembed = new dc.MessageEmbed().setColor(0, 0, 153).setImage("https://i.imgur.com/yknPkF6.gif");
    let reason = args.slice(1).join(' ');
    if (guilds[msg.guild.id].english === true) {
        //if(msg.mentions.users.first){
            if(msg.member.permissions.has("BAN_MEMBERS")){
                if(msg.guild.me.permissions.has("BAN_MEMBERS")){

                    const member = msg.mentions.users.first() || args[0];
                    const bantyp = msg.guild.member(member);
                    if(!bantyp){errorembed.setTitle("I cant't find this person."); errorembed.setDescription("He is maybe left in the desert."); return msg.channel.send(errorembed);}

                    if(reason === "") reason="Not defined | Banned by " + msg.author.tag;

                    bantyp.ban({reason: reason}).then(function(){
                        bannedembed.setAuthor(msg.author.tag, msg.author.avatarURL())
                            .setDescription(`${bantyp.user.tag} was banned by ${msg.author.tag}.`)
                            .addField("Reason", reason);
                        msg.channel.send(bannedembed);
                    }).catch(function(error){
                        errorembed.setTitle("Oh no! An error appeared!");
                        errorembed.setDescription("I think i am under or at the same place with this person.\n\n"+
                            "Little bit technical:\n `"+error+"`");
                        msg.channel.send(errorembed);
                    });
                }else{
                    errorembed.setTitle("I don't have permissions to ban.");
                    errorembed.setDescription("If i don't have permissions to ban i can't ban this user.");
                    return msg.channel.send(errorembed);
                }
            }else{
                errorembed.setTitle("You don't have permissions to ban!");
                errorembed.setDescription("You dont have the permissions on this guild to ban.");
                return msg.channel.send(errorembed);
            }
        //}
    } else {
        //if(msg.mentions.users.first){
            if(msg.member.permissions.has("BAN_MEMBERS")){
                if(msg.guild.me.permissions.has("BAN_MEMBERS")){

                    const member = msg.mentions.users.first() || client.users.cache.get(args[0]);
                    const bantyp = msg.guild.member(member);
                    if(!bantyp){errorembed.setTitle("Ich kann den Typen nicht finden."); errorembed.setDescription("Vielleicht ist er in der Wüste geflüchtet."); return msg.channel.send(errorembed);}

                    if(reason === "") reason="Nicht definiert";

                    bantyp.ban({reason: reason}).then(function(){
                        bannedembed.setAuthor(msg.author.tag, msg.author.avatarURL())
                            .setDescription(`${bantyp.user.tag} wurde gebannt von ${msg.author.tag}.`)
                            .addField("Grund", reason);
                        msg.channel.send(bannedembed);
                    }).catch(function(error){
                        errorembed.setTitle("Oh nein! Ein fehler ist aufgetreten!");
                        errorembed.setDescription("Ich glaube, ich bin unter oder am selben Ort mit dieser person.\n\n"+
                            "Ein wenig technischer:\n `"+error+"`");
                        msg.channel.send(errorembed);
                    });
                }else{
                    errorembed.setTitle("Ich habe keine ban rechte");
                    errorembed.setDescription("Wenn ich keine ban rechte habe, kann ich diesen Benutzer nicht bannen.");
                    return msg.channel.send(errorembed);
                }
            }else{
                errorembed.setTitle("Du hast keine ban rechte");
                errorembed.setDescription("Du hast keine ban rechte auf dem server.");
                return msg.channel.send(errorembed);
            }
        }
    //}
};

exports.info = {
    name: 'ban',
    aliases: []
};