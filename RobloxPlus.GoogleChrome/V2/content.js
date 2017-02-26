// content.js [4/4/2016]
/*
	For any questions message WebGL3D https://www.roblox.com/messages/compose?recipientId=48103520
	My messages will always be open for all, if you can't PM me check your settings.
*/
fixCB(({
"text/html":function(subdomain,upath,list,mainLoop){
if(ext.browser.name=="Firefox"){localStorage.setItem("RPLUS_EXTURL",ext.url(""));}
if(document.querySelector("#navigation .rplus-icon")||(["help","corp","developer","wiki","devforum","blog","api","m","bloxcon","setup","content","polls"]).indexOf(subdomain=subdomain[subdomain.length-3])>=0){return;}
var isTradeWindow = !!url.send().match(/\/Trade\/TradeWindow\.aspx/i);


function plusSlider(input){
	return input.each(function(){
		var max = Number($(this).attr("max"))||100;
		var v = math.bound(round($(this).val(),$(this).attr("step")||1),$(this).attr("min")||0,max);
		var perc = Math.floor((v/max)*100);
		$(this).attr("title",max>10?perc+"%":v).css("background","-webkit-linear-gradient(left, "+plusSlider.activeColor+", "+plusSlider.activeColor+" "+perc+"%, "+plusSlider.backgroundColor+" "+perc+"%, "+plusSlider.backgroundColor+")");
	});
}
plusSlider.selector = "input.rplusslider[type='range']";
plusSlider.activeColor = "rgb(31,115,255)";
plusSlider.backgroundColor = "rgb(175,175,175)";


users.userId = Number($("#chat-data-model").data("userid"))||0;


soundService.robloxSound.button = function(id,tag){
	var v2,button,volume,state,connect,sound,stopper;
	if(v2=!!document.querySelector(".container-main>.content")){
		button = $("<"+(tag||"div")+" class=\"rplusaudio icon-audio\">");
	}else{
		button = $("<"+(tag||"div")+" class=\"rplusaudio MediaPlayerIcon Play\">");
	}
	button.append(volume=plusSlider($("<input type=\"range\" step=\"1\" min=\"0\" max=\"100\" class=\"rplusslider\">").change(function(){
		var v = (Number($(this).val())||0)/100;
		if(sound){
			sound.volume(v);
		}
		storage.set("mediaVolume",v);
	}))).click(function(e){
		e.preventDefault();
		if(sound&&e.currentTarget==e.target){
			if(sound.playing()){
				state("Play");
			}
			sound.volume((Number(volume.val())||0)/100)[sound.playing()?"stop":"play"]();
		}
	});
	state = function(c){setTimeout(function(){button.attr("class",v2?"rplusaudio MediaPlayerIcon icon-"+(c=="Error"?"brokenpage":c.toLowerCase()):"rplusaudio MediaPlayerIcon "+(c=="Audio"?"Error":c));},10);};
	var afterSound = function(s){
		sound = s;
		state("Play");
		s.play(function(){
			state("Pause");
			stopper = setInterval(function(){
				if(!$("body").find(button).length){
					s.stop();
				}
			},500);
		}).stop(function(){
			if(stopper){
				clearInterval(stopper);
			}
			state("Play");
		}).error(function(){
			state("Error");
		});
	};
	connect = function(i){
		soundService.robloxSound(i,function(s){
			if(s){
				afterSound(s);
			}else{
				state(Number(i)===0?"Audio":"Error");
			}
		});
	};
	if(type(id)=="string"){
		afterSound(soundService(id,true));
	}else{
		connect(type(id)=="number"?id:id.change(function(){connect(id.val());}).val());
	}
	storage.get("mediaVolume",function(v){
		if(type(v)=="number"){
			plusSlider(volume.val(Math.min(v*100,100)));
			if(sound){
				sound.volume(v);
			}
		}
	});
	return button;
};

url.roblox.subdomain = subdomain=="forum"?"www":subdomain;


forumService.signatureTips = [
	"Up to 256 characters, one line",
	"Start with #code to use Lua syntax",
	"Compress item links with r+://ID",
	"Add #Robux to display your Robux",
	"Add #RAP to display your RAP"
];

forumService.parseSignature = function(sig,callBack){
	if(sig.toLowerCase().indexOf("#rap")>=0){
		users.currentId(function(id){
			users.inventory(id,function(inv){
				if(inv.load.total>=100){
					callBack(forumService.parseSignature.finish(sig.replace(/#rap/gi,addComma(inv.rap))));
				}
			});
		});
	}else{
		callBack(forumService.parseSignature.finish(sig));
	}
};
forumService.parseSignature.finish = function(sig){
	return sig.replace(/#Robux/gi,"R$"+addComma($("#nav-robux-balance").text())).trim();
};

forumService.embed = function(content, maxImages, size){
	if(content.html(content.html().replace(/<\s*br\s*\/?>/g,"\n")).html().toLowerCase().indexOf("#code")>=0){
		var newHtml = "";
		var lines = 0;
		var blankLine = false;
		content.html().split(/\n/).forEach(function(line){
			var newBlock = line.trim().toLowerCase().startsWith("#code");
			if(newBlock){
				if(lines){
					newHtml += "</code></span>";
					lines = 0;
				}
				newHtml += "<span class=\"rplusLua\"><span></span><code class=\"lua hljs\">";
			}
			if(newBlock||(lines&&line.startsWith("\t"))){
				newHtml += (lines++&&!blankLine?"\n":"")+(line=line.substring(newBlock?6:1).trim());
				blankLine = lines==1&&!line;
			}else if(lines){
				newHtml += "</code></span>"+line+"\n";
				lines = 0;
			}else{
				newHtml += line+"\n";
			}
		});
		if(lines){
			newHtml += "</code></span>";
			lines = 0;
		}
		content.html(newHtml).find(".rplusLua").each(function(){
			for(var lines=0;lines<$(this).find("code").html().split(/\n/).length;++lines){
				$(this).find("span").append((lines===0?"":"\n")+(lines+1).toString());
			}
			$(this).css("height",((17*lines)+6)+"px").find("span").css("height",(17*lines)+"px");
			if($(this).find("code").html()){
				hljs.highlightBlock($(this).find("code").css("height",(17*lines)+"px")[0]);
			}else{
				$(this).remove();
			}
		});
	}
	content.html(content.html().replace(/(^|\W)R\$(\d[\d,]+)/gi,function(x,y,z){
		return y+"<span class=\"robux\">"+z+"</span>";
	}).replace(/(^|\W)Ti?x(\d[\d,]+)/gi,function(x,y,z){
		return y+"<span class=\"tickets\">"+z+"</span>";
	}).replace(/h?t?t?p?s?:?\/{0,2}w?w?w?\.?(youtu.be|youtube.com)(\/?[^\s<]*)/gi,function(x,y,z){
		var t = url.param("t",z)?"?t="+url.param("t",z):"";
		if(!t.match(/^\d*m?\d+s?$/)&&!Number(t)){
			t = "";
		}
		var vid = y.toLowerCase()=="youtu.be"?url.path(z).substring(1):url.param("v",z);
		return vid?$("<a target=\"_blank\">").attr("data-video",vid).attr("href","https://youtu.be/"+vid+t).text(" youtu.be/"+vid+t).prepend($("<span>")).outerHtml():x;
	}).replace(/r\+:\/\/(\d+)/gi,function(x,y){
		return "<a href=\""+url.roblox("/item.aspx?id="+y)+"\" target=\"_blank\">https://www.roblox.com/item.aspx?id="+y+"</a>";
	}).replace(/(^|\W)R\+/gi,function(x,y){
		return y+"<a href=\"/Groups/Group.aspx?gid=2518656\"><span></span></a>";
	})).find("a[href*='item']").each(function(){
		var anc = $(this);
		var u = anc.attr("href")||"";
		if(u.match(/-item\?/)||u.match(/\/item\.aspx\?/)){
			catalog.info(Number(url.param("id",u)),function(info){
				if(info.success){
					if(info.assetType=="Audio"){
						anc.text(" "+info.name.trim()).before(soundService.robloxSound.button(info.id));
					}else if((info.assetType=="Image"||info.assetType=="Decal")&&maxImages-->0){
						anc.html("").append($("<img>").css({"width":size+"px","height":size+"px"}).attr("alt",u).attr("title",info.name).attr("src",info.thumbnail));
					}else if(info.assetType=="Image"||info.assetType=="Decal"){
						anc.text(info.name);
					}
				}
			});
		}
	});
	content.find("a[href*='youtu.be'][data-video]").each(function(i){
		if(i<3){
			var anc = $(this);
			forumService.youtube(anc.attr("data-video"),function(t){
				if(t){
					var time = 0;
					var turl = url.param("t",anc.attr("href"));
					if(turl.match(/\d+s/i)){
						time = Number((turl.match(/(\d+)s/i)||[0,0])[1])||0;
						time += (Number((turl.match(/(\d+)m/i)||[0,0])[1])||0)*60;
					}else{
						time = Number(turl)||0;
					}
					var frame = $("<iframe width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen>").attr("src","https://www.youtube-nocookie.com/embed/"+anc.attr("data-video")+"?rel=0&start="+time).attr("style","margin-right: calc(100% - 560px);").hide();
					anc.after(frame);
					content.find(".rplusLua").each(function(){
						var s = $(this);
						$(this).find("iframe").each(function(){
							s.after($(this));
						});
					});
					anc.find("span").attr("title",t).click(function(e){
						e.preventDefault();
						frame[frame.is(":hidden")?"slideDown":"slideUp"]();
					});
				}
			});
		}
	});
};



popbox = {
	id: 0,
	history: [],
	search: "",
	current: "",
	
	box: $("<div id=\"rplusPopbox\">").append(
		$("<span id=\"rplusPopboxHover\">").append($("<img>").attr("src",ext.url("images/icons/icon_32x32.png"))).click(function(){
			popbox.box.addClass("open");
		}).on("dragenter",function(){
			popbox.box.addClass("open");
		})
	).append(
		$("<span class=\"icon-back\">").click(function(){
			popbox.back();
		}).hide()
	).append("<p><a></a></p>").append(
		$("<span class=\"icon-close\">").click(function(){
			popbox.box.removeClass("open");
		})
	).append(
		$("<input class=\"input-field\" placeholder=\"Drag a link here to load a preview\">").keyup(function(e){
			if(e.keyCode==13){
				if($(this).val()){
					popbox.display($(this).val());
				}else{
					$(this).val(popbox.current);
				}
			}
		}).on("drop",function(e){popbox.drop(e);})
	),
	
	drop: function(e){
		e.preventDefault();
		var v = e.originalEvent.dataTransfer.getData("text");
		if(type(v)=="string"){
			popbox.display(v);
		}else{
			$(this).val("");
		}
	},
	back: function(){
		popbox.display(popbox.history.pop(),true);
		popbox.box.find(">.icon-back")[popbox.history.length?"show":"hide"]();
	},
	display: function(arg,back){
		if(type(arg)=="string"){
			if(arg.toLowerCase()==popbox.search.toLowerCase()||arg.toLowerCase()==popbox.current.toLowerCase()){
				popbox.input.val(popbox.current);
				popbox.box.addClass("open");
				return;
			}
		}
		var i = ++popbox.id;
		var header = popbox.box.find(">p>a").removeAttr("href").removeClass("fail").text("...").removeAttr("title");
		var go = function(x,a){
			popbox.div.find(">div").hide();
			var elem = popbox.action[x].div;
			elem = elem&&{
				div: elem,
				icon: {
					anchor: elem.find(">a.icon").removeAttr("href").removeAttr("title"),
					img: elem.find(">a.icon>img").attr("src","https://t0.rbxcdn.com/eee964cc46e3dd3e9081325a5c91e720"),
					label: elem.find(">a.icon>span").removeAttr("class")
				}
			};
			popbox.action[x](a,elem,i);
			if(elem){
				elem.div.show();
			}
		};
		
		if(type(arg)=="string"){
			if(!back&&popbox.current){
				popbox.history.push(popbox.current);
			}
			popbox.current = popbox.search = arg;
			
			var sc = arg.split(":");
			var ac = sc.splice(1).join(":");
			sc = sc[0].toLowerCase();
			if(arg.match(url.roblox.linkify)){
				var path = url.path(arg).toLowerCase();
				if(string.startsWith(path,/\/users?\//i)||string.startsWith(path,/\/User\.aspx/i)){
					go("user",url.param("username",arg)||users.urlId(arg));
				}else if(path.endsWith("-item")||path.startsWith("/item.aspx")){
					go("item",url.param("id",arg));
				}else if(path.match(/^\/catalog\/\d+\//i)||path.match(/^\/library\/\d+\//i)){
					go("item",(path.match(/^\/\w+\/(\d+)/)||["",0])[1]);
				}else{
					popbox.clear();
					return;
				}
			}else if(sc=="user"){
				go("user",ac);
			}else if(sc=="userid"){
				go("user",Number(ac));
			}else if(sc=="item"){
				go("item",ac);
			}else if(sc=="lim"||sc=="limited"){
				go("lim",ac);
			}else if(arg.length>=3){
				catalog.limiteds(function(lims){
					var possible = catalog.limiteds.search(lims,arg,true);
					if(possible.length==1){
						go("item",possible[0].id);
					}else{
						popbox.clear();
					}
				});
			}else{
				popbox.clear();
				return;
			}
		}else if(!arg){
			popbox.history = [];
			popbox.current = popbox.search = "";
			popbox.clear();
		}
		popbox.box.find(">.icon-back")[popbox.history.length?"show":"hide"]();
		popbox.box.addClass("open");
	},
	clear: function(){
		popbox.header.text("");
		popbox.input.val("");
		popbox.div.find(">div").hide();
	},
	
	action: {
		"user": function(arg,elem,i){
			elem.inv = elem.div.find(">div>div:first-child>ul").html("");
			elem.outfit = elem.div.find(">div>div:last-child>ul").html("");
			elem.div.find("#rppbuRAP>span:last-child,#rppbuItems>span:last-child").text("0");
			popbox.action.user.resort();
			
			users[type(arg)=="string"?"getByUsername":"getById"](arg,function(u){
				if(popbox.id!=i){return;}
				if(u.id){
					popbox.header.attr("href",url.roblox("/users/"+u.id+"/profile")).text(u.username);
					popbox.input.val(popbox.current="user:"+u.username);
					elem.icon.anchor.attr("href",popbox.header.attr("href"));
					elem.icon.img.attr("src",users.thumbnail(u.id,4));
					if(u.bc!="NBC"){
						elem.icon.label.attr("class","icon-"+u.bc.toLowerCase()+"-label");
					}
					
					users.inventory(u.id,function(inv){
						if(popbox.id!=i){return;}
						var perc = elem.div.find("#rppbuFlipper>span:nth-child(2)");
						foreach(inv.data,function(n,o){
							var box = elem.inv.find(".list-item>a[href='/item.aspx?id="+o.id+"']");
							var count = box.find(".item-serial-number");
							if(!box.length){
								elem.inv.append($("<li class=\"list-item\">").append(
									box = $("<a class=\"store-card\" target=\"_blank\" href=\"/item.aspx?id="+Number(o.id)+"\">").attr("data-rap",o.rap).attr("title",o.name).append(
										$("<img class=\"store-card-thumb\">").attr("src",o.image),
										count = $("<div class=\"item-serial-number\">").text("x1"),
										$("<div class=\"store-card-caption\">").append(
											$("<div class=\"text-overflow store-card-name\">").text(o.name),
											"<div class=\"store-card-price\" title=\"RAP: "+addComma(o.rap)+"\"><span class=\"icon-robux\"></span><span class=\"text-robux\">"+addComma(o.rap)+"</span></div>"
										)
									)
								));
							}
							count.text("x"+Object.keys(o.userAssetId).length);
							if(o.stock){
								var serials = "";
								foreach(o.userAssetId,function(u,s){serials+=(serials?", ":"")+"#"+s;});
								count.attr("title",serials);
							}
						});
						elem.div.find("#rppbuRAP>span:last-child").text(addComma(inv.rap));
						elem.div.find("#rppbuItems>span:last-child").text(addComma(inv.count.total));
						if(inv.load.total<100){
							if(perc.text()!="Outfit"){
								perc.text("Inventory ("+Math.floor(inv.load.total)+"%)");
							}
						}else{
							if(perc.text()!="Outfit"){perc.text("Inventory");}
							popbox.action.user.resort();
						}
					});
					
					outfit.get(u.id,function(outfit){
						if(popbox.id!=i){return;}
						var display = function(o){
							if(type(o)=="object"&&o.id){
								elem.outfit.append($("<li class=\"list-item\">").attr("data-type",o.type).append(
									$("<a class=\"store-card\">").attr("href","/item.aspx?id="+o.id).attr("title",o.name).append(
										$("<img class=\"store-card-thumb\">").attr("src",catalog.thumbnail(o.id,3)),
										$("<div class=\"store-card-caption\">").append($("<div class=\"text-overflow store-card-name\">").text(o.name))
									)
								));
							}
						};
						foreach(outfit,function(n,o){
							if(n=="hats"){
								for(var x in o){
									display(o[x]);
								}
							}else if(n!="id"&&n!="username"){
								display(o);
							}
						});
					});
				}else{
					popbox.header.text("No user found");
					popbox.input.val("");
				}
			});
		},
		"item": function(arg,elem,i){
			elem.div.find(">table,.btn-toggle,#rppbiPrice>*").hide();
			elem.div.find(">table>tbody").html("");
			elem.div.find("#rppbiDescription").val("");
						
			catalog.info(Number(arg),function(info){
				if(popbox.id!=i){return;}
				if(info.success){
					popbox.action.item.current = info;
					popbox.header.attr("href",url.roblox("/item.aspx?id="+info.id)).text(info.name).attr("title",info.name);
					popbox.input.val(popbox.current="item:"+info.id);
					elem.icon.anchor.attr("href",popbox.header.attr("href"));
					elem.icon.img.attr("src",catalog.thumbnail(info.id,4)).attr("title",info.assetType);
					if(info.limited||info.bc!="NBC"){
						elem.icon.label.attr("class","icon"+(info.limited?"-limited":"")+(info.limitedUnique?"-unique":"")+(info.bc!="NBC"?"-"+info.bc.toLowerCase():"")+"-label");
					}
					
					elem.div.find("#rppbiPrice")[info.assetType=="Decal"||info.assetType=="Audio"||info.assetType=="Model"||info.free||info.robuxPrice||info.editable||info.lowestPrice?"show":"hide"]().find(">.btn-toggle").toggleClass("on",info.free);
					if(info.assetType=="Decal"||info.assetType=="Audio"||info.assetType=="Model"||info.free){
						elem.div.find("#rppbiPrice>*").hide();
						elem.div.find("#rppbiPrice>.btn-toggle").show();
					}else{
						elem.div.find("#rppbiPrice>*").show();
						elem.div.find("#rppbiPrice>.btn-toggle").hide();
						elem.div.find("#rppbiPrice>input").val(addComma(info.lowestPrice||info.robuxPrice)+(info.privateSellers.length&&info.privateSellers[0].seller.id==users.userId?" (You)":""))[info.editable?"removeAttr":"attr"]("readonly","readonly");
					}
					elem.div.find("#rppbiDescription").val(info.description)[info.editable?"removeAttr":"attr"]("readonly","readonly");
					elem.div.find("#rppbiPrice>input").css("height",info.rap?"14px":"28px");
					elem.div.find("#rppbiPrice>span:last-child")[info.rap?"show":"hide"]().text("RAP: "+addComma(info.rap));
					
					foreach(info.privateSellers,function(n,o){
						elem.div.find(">table>tbody").append($("<tr>").append($("<td>").append($("<a>").attr({"title":o.seller.username,"href":url.roblox("/users/"+o.seller.id+"/profile")}).append($("<img>").attr("src",users.thumbnail(o.seller.id,0)),o.seller.username)),$("<td>").append("<span class=\"icon-robux\"></span> "+addComma(o.price))));
					});
					elem.div.find(">table")[info.privateSellers.length?"show":"hide"]();
				}else{
					popbox.header.text("Failed to load item");
					popbox.input.val("");
				}
			});
		},
		"lim": function(arg,elem,i){
			elem.div.find(">ul").html(arg?"":"Enter at least one character");
			popbox.input.val("lim:"+arg);
			if(!arg){
				popbox.header.text("0 limiteds found");
				return;
			}
			catalog.limiteds(function(lims){
				if(popbox.id!=i){return;}
				var displayed = catalog.limiteds.search(lims,arg);
				displayed.forEach(function(o){
					elem.div.find(">ul").append($("<li class=\"list-item\">").append(
						$("<a class=\"store-card\" target=\"_blank\" href=\"/item.aspx?id="+Number(o.id)+"\">").attr("data-rap",o.rap).attr("title",o.name).append(
							$("<img class=\"store-card-thumb\">").attr("src",catalog.thumbnail(o.id,4)),
							$("<div class=\"store-card-caption\">").append(
								$("<div class=\"text-overflow store-card-name\">").text(o.name),
								"<div class=\"store-card-price\" title=\"RAP: "+addComma(o.rap)+"\"><span class=\"icon-robux\"></span><span class=\"text-robux\">"+addComma(o.rap)+"</span></div>"
							)
						)
					));
				});
				popbox.header.text(displayed.length+" limiteds found");
				if(!displayed.length){
					elem.div.find(">ul").text("No limiteds match that name partial.");
				}else if(displayed.length==1){
					popbox.display("item:"+displayed[0].id);
				}
			});
		}
	}
};

if(!isTradeWindow){
popbox.header = popbox.box.find(">p>a");
popbox.input = popbox.box.find(">input");
popbox.box.append(popbox.div = $("<div>").on("dragover",function(e){
	e.preventDefault();
}).on("drop",popbox.drop));


popbox.action.user.div = $("<div id=\"rplusPopboxUser\">").append($("<a class=\"icon\">").append($("<img>"),$("<span>"))).append($("<p id=\"rppbuFlipper\">").append($("<span class=\"icon-left-16x16\">").click(function(){popbox.action.user.flip();}),"<span>Inventory</span>",$("<span class=\"icon-right-16x16\">").click(function(){popbox.action.user.flip();})),"<p id=\"rppbuRAP\"><span class=\"icon-robux\"></span><span>0</span></p>","<p id=\"rppbuItems\"><span class=\"text-label\">Items</span><span class=\"text-lead\">0</span></p>",$("<select>").change(function(){popbox.action.user.resort();}).append($("<option>").val("rap").text("RAP"),$("<option>").val("hoard").text("Hoard"),$("<option>").val("combined").text("Combined"),$("<option>").val("new").text("Newest"),$("<option>").val("old").text("Oldest"),$("<option>").val("alphabetical").text("Alphabetical"))).append($("<div>").append("<div><ul class=\"hlist store-cards\"></ul></div>",$("<div><ul class=\"hlist store-cards\"></ul></div>").hide()));

popbox.action.user.flip = function(x){
	var i = ++popbox.action.user.flip.id;
	var flip = popbox.action.user.div.find(">div");
	var c = flip.find(">div:last-child:hidden").length>0;
	x = x==undefined?!c:!!x;
	if(c!=x){
		tween(pround(((flip.attr("style")||"0deg").match(/Y\(\d+deg\)/)||[""])[0]),x?-180:180,"linear","in",300,function(r){
			if(i!=popbox.action.user.flip.id){return;}
			flip.attr("style","transform: rotateY("+r+"deg);");
			if((r>=-95&&r<=-85)||(r>=85&&r<=95)){
				flip.find(">div:first-child")[x?"show":"hide"]();
				popbox.action.user.div.find("#rppbuRAP,#rppbuItems,select")[x?"show":"hide"]();
				flip.find(">div:last-child")[x?"hide":"show"]();
			}
		},function(){
			if(i!=popbox.action.user.flip.id){return;}
			flip.attr("style","transform: rotateY(0deg);");
			flip.find(">div:first-child")[x?"show":"hide"]();
			popbox.action.user.div.find("#rppbuRAP,#rppbuItems,select")[x?"show":"hide"]();
			flip.find(">div:last-child")[x?"hide":"show"]();
			popbox.action.user.div.find("#rppbuFlipper>span:nth-child(2)").text(x?"Inventory":"Outfit");
		});
	}
};
popbox.action.user.flip.id = 0;

popbox.action.user.resort = function(){
	var i = ++popbox.action.user.resort.id;
	var list = [];
	var ul = popbox.action.user.div.find(">div>div:first-child>ul");
	ul.find(">li").each(function(){
		list.push({
			li: $(this),
			id: Number(url.param("id",$(this).find(">a").attr("href")))||0,
			rap: Number(($(this).find(".store-card-price").attr("title")||"").replace(/\D+/g,""))||0,
			name: $(this).find(">a").attr("title")||"",
			amount: Number(($(this).find(".item-serial-number").text()||"").substring(1))||0
		});
	});
	var s = popbox.action.user.div.find("select").val();
	list.sort(function(a,b){
		if(s=="hoard"){
			return b.amount-a.amount;
		}else if(s=="combined"){
			return (b.amount*b.rap)-(a.amount*a.rap);
		}else if(s=="new"){
			return b.id-a.id;
		}else if(s=="old"){
			return a.id-b.id;
		}else if(s=="alphabetical"){
			return a.name.toLowerCase()<b.name.toLowerCase()?-1:1;
		}else{
			return b.rap-a.rap;
		}
	});
	var pop;pop = function(){
		if(i!=popbox.action.user.resort.id||!list.length){return;}
		ul.prepend(list.pop().li);
		setTimeout(pop,1);
	};
	pop();
};
popbox.action.user.resort.id = 0;


popbox.action.item.div = $("<div id=\"rplusPopboxItem\">").append($("<a class=\"icon\">").append($("<img>"),$("<span>"))).append($("<div id=\"rppbiPrice\" class=\"icon-text-wrapper\">").append($("<span class=\"btn-toggle\"><span class=\"toggle-flip\"></span><span class=\"toggle-on\">Free</span><span class=\"toggle-off\">Free</span></span>").click(function(){
			var info = popbox.action.item.current;
			if(info&&info.editable){
				catalog.update({
					id: info.id,
					free: $(this).toggleClass("on",!$(this).hasClass("on")).hasClass("on")
				},function(){});
			}
		}),$("<span class=\"icon-robux\">"),$("<input type=\"input-field\" readonly=\"readonly\">").enterBlur().change(function(){
			var info = popbox.action.item.current;
			if(info&&info.editable){
				if($(this).val()){
					catalog.update({
						id: info.id,
						robux: pround($(this).val())
					},function(){});
				}else{
					$(this).val(addComma(info.robuxPrice));
				}
			}
	}),$("<span>"))).append($("<textarea id=\"rppbiDescription\" maxlength=\"1000\">").change(function(){
		var info = popbox.action.item.current;
		if(info&&info.editable){
			catalog.update({
				id: info.id,
				description: $(this).val()
			},function(){});
		}
})).append("<table class=\"table table-striped\"><thead><tr><th>Seller</th><th>Price</th></tr></thead><tbody></tbody></table>");


popbox.action.lim.div = $("<div id=\"rplusPopboxLimiteds\">").append("<ul></ul>");


foreach(popbox.action,function(n,o){popbox.div.append(o.div.hide());});
storage.get("rplusPopbox",function(on){
	if(!on){
		popbox.box.find("#rplusPopboxHover").hide();
	}
	$("body").append(popbox.box);
});
}



foreach(list,function(n,o){
	if(foreach(type(o.match)=="string"||type(o.match)=="regexp"?[o.match]:(type(o.match)=="array"?o.match:[]),function(n,m){
		if(m=upath.match(m)){
			o.fill(m);
		}
	})){
		return true;
	}
});


mainLoop = function(){
	if($("#navigation .text-lead>.text-overflow[href*='/profile']").length && friendService.creatorFriends.cache[users.urlId($("#navigation .text-lead>.text-overflow[href*='/profile']").attr("href"))]){
		$(".ad-slot[rplus!='replacedAd']").html("<iframe allowtransparency=\"true\" frameborder=\"0\" height=\""+$(this).parent().attr("data-ad-height")+"\" scrolling=\"no\" src=\"/userads/3\" width=\""+$(this).parent().attr("data-ad-width")+"\" data-js-adtype=\"iframead\">").attr("rplus","replacedAd");
		$(".adp-gpt-container[rplus!='replacedAd'],.ads-container[rplus!='replacedAd'],.roblox-skyscraper[rplus!='replacedAd'],#Skyscraper[rplus!='replacedAd']").attr("rplus","replacedAd").each(function(){var width = $(this).width();if(width){$(this).html("<iframe allowtransparency=\"true\" frameborder=\"0\" height=\""+(({300:270,160:600,728:90})[width]||0)+"\" scrolling=\"no\" src=\"/userads/"+(({300:3,160:2,728:1})[width]||1)+"\" width=\""+width+"\" data-js-adtype=\"iframead\">");}});
	}

	storage.get("navigation",function(n){
		$("ul.nav.rbx-navbar").each(function(){
			var li = $(this).find(">li>a");
			for(var CN=0;CN<Math.min(2,n.buttons.length);CN++){
				var button = n.buttons[CN];
				if(li[CN+2]&&type(button)=="object"){
					$(li[CN+2]).text(button.text).attr("href",button.href);
				}
			}
		});
	});

	var total = 0;
	$("#navigation .notification-blue").each(function(x,el){total+=(x=Number((el=$(this)).attr("title").replace(/,/g,""))||0);mainLoop.comma(x,function(t){el.text(x>0?t:"");});});
	$(".rbx-nav-collapse .notification-red").attr("title",addComma(total)).text(total>0?(total<100?total:(total<1000?"99+":Math.floor(Math.min(9999,total)/1000)+"k+")):"");
	
	/* Load once */
	if($("#navigation").length&&!$("#navigation .rplus-icon").length){
		$("#nav-trade").append("<span class=\"notification-blue\" title=\"0\"></span>");
		$("#navigation .rbx-upgrade-now").before("<li><a href=\"/my/account?tab=rplus\"><span class=\"rplus-icon\"></span><span>Control Panel</span></a></li>");
		$(".notification-blue:empty,.notification-red:empty").removeClass("hide");
		$("#nav-message").attr("href","/my/messages");
		var robux = Number($("#nav-robux-balance").html().split("<br>")[0].replace(/\D+/g,""));
		if(robux){
			mainLoop.comma(robux,function(t){
				$("#nav-robux-amount").text(t);
			});
		}
		storage.get("navigation",function(v){
			if(v.sideOpen&&!$("#navigation.nav-show").length){
				$(".rbx-nav-collapse")[0].click();
			}
		});
		storage.get("siteTheme",function(x){
			localStorage.setItem("rplusTheme",x);
			if(!url.send().match(/^\/games\/341017984\//)){
				$("body").addClass(x);
			}
		});
	}

	storage.get("navcounter",function(x){
		if(x){
			users.current(function(u){
				if(!u.id){setTimeout(mainLoop,500);return;}
				if(u.bc!="NBC"){
					tradeSystem.get({},function(trades){
						setTimeout(mainLoop,500);
						$("#nav-trade .notification-blue").attr("title",trades.total);
					});
				}else{
					setTimeout(mainLoop,500);
				}
				$("#nav-message .notification-blue").attr("title",u.messages.unread);
				$("#nav-friends .notification-blue").attr("title",u.friendRequests);
				var orig = ($("#nav-robux-balance").first().html()||"").split("<br>");
				mainLoop.comma(u.robux,function(t){
					$("#nav-robux-amount").text(t);
					$("#nav-robux-balance").html(addComma(u.robux)+" ROBUX"+(orig.length>1?"<br>$"+(u.robux*.0025).toFixed(2):""));
				});
			});
		}else{
			setTimeout(mainLoop,500);
		}
	});
};
mainLoop.comma = function(n,cb){
	if(!isCB(cb)){return "0";}
	storage.get("navigation",function(x){
		x = Math.max(1000,Number(x&&x.counterCommas)||100000000);
		cb(n<x?addComma(n):Math.floor(n/(n<1000000?1000:1000000))+(n>=1000000?"m+":"k+"));
	});
};
friendService.creatorFriends(function(friends){
	friendService.creatorFriends.cache = friends;
	mainLoop();
});
window.comma = mainLoop.comma;

storage.updated(function(k,v){
	if(k=="siteTheme"){
		localStorage.setItem("rplusTheme",v);
		if(url.send().match(/^\/games\/341017984\//)){
			$("body").attr("class","easter-theme");
		}else if(url.send().match(/\/users\/\d+\/profile/)&&document.querySelector(".profile-avatar-image .icon-obc")){
			$("body").attr("class","obc-theme");
		}else if(!isTradeWindow){
			$("body").attr("class",v);
		}
	}
});


$("body").on("change","*[storage]",function(s,v){
	s = $(this).attr("storage"),v = $(this).val();
	if($(this).attr("type")=="checkbox"){
		storage.set(s,$(this).prop("checked"));
	}else if($(this).prop("tagName")=="SELECT"){
		storage.set(s,v);
	}else{
		console.warn("Unhandled storage attempt",s,v);
	}
}).on("input",plusSlider.selector,function(){
	plusSlider($(this));
}).on("change",plusSlider.selector,function(){
	plusSlider($(this));
}).on("click",".friend-status.icon-game",function(e){
	e.preventDefault();
	var id = users.urlId($(this).parent().parent().find(">.friend-link").attr("href"));
	if(id){gameService.follow(id);}
}).on("dblclick",".rplusLua>span:first-child",function(){
	$(this).parent().find(">code").selectText();
}).on("click",".rplusinventory[userid]",function(){
	popbox.display("www.roblox.com/users/"+$(this).attr("userid")+"/profile");
});

plusSlider($(plusSlider.selector));

$(".MediaPlayerIcon[data-mediathumb-url]").each(function(){$(this).replaceWith(soundService.robloxSound.button($(this).attr("data-mediathumb-url"),$(this).prop("tagName")));});



}})[document.contentType])(window.location.hostname.split("."),url.send(),[{
	match: /^\/Forum\/ShowPost\.aspx/i,
	fill: function(id){
		if(!(id=Number(url.param("PostID")))){return;}
		
		storage.get("forums",function(f){
			f.admins = ["Moderators","Admins","Alts","Asset Control","Developer"];
			groupService.role({group:2518656,user:users.userId},function(mod){
				mod = f.admins.indexOf(mod)>=0;
				(f.blocking?friendService.blocked:function(cb){cb({data:{}});})(function(blockList){
					blockList = blockList.data;
					var firstPost = Number($("a[name]").attr("name"));
					var page = ($("#ctl00_cphRoblox_PostView1_ctl00_Pager .normalTextSmallBold").text()||"Page 1 of 1").replace(/,/g,"").match(/^Page\s*(\d+)\s*of\s*(\d+)/i)||["",1,1];
					var maxPage = Number(page[2])||1;
					page = Number(page[1])||1;
					
					if(page==1&&id!=firstPost){id=firstPost;}
					
					var tracked = $("#ctl00_cphRoblox_PostView1_ctl00_TrackThread").prop("checked");
					$("#ctl00_cphRoblox_PostView1_ctl00_TrackThread").parent().html("").addClass("rplusforumcheckbox").append(
						$("<label>").append($("<input type=\"checkbox\">").prop("checked",tracked).change(function(){
							forumService[tracked=$(this).prop("checked")?"track":"untrack"](id,function(){});
						})).append(" Track Thread")
					).append("<br>").append(
						$("<label>").append($("<input type=\"checkbox\">").prop("checked",f.blacklist.indexOf(id)>=0).change(function(){
							var c = $(this).prop("checked");
							storage.get("forums",function(f){
								if(c&&f.blacklist.indexOf(id)<0){
									f.blacklist.push(id);
									storage.set("forums",f);
								}else if(!c&&f.blacklist.indexOf(id)>=0){
									f.blacklist.splice(f.blacklist.indexOf(id),1);
									storage.set("forums",f);
								}
							});
						})).append(" Forum Notifier Blacklist")
					);
					
					if(Number(url.hash())==f.last&&f.last&&Number(url.hash())){
						f.last = 0;
						storage.set("forums",f);
						if(maxPage!=1&&!$("a[name='"+url.hash()+"']").length){
							window.location.href = "/Forum/ShowPost.aspx?PostID="+id+"&PageIndex="+maxPage+"#"+url.hash();
							return;
						}
					}
					
					$("#ctl00_cphRoblox_PostView1_ctl00_PostList .forum-post").each(function(n){
						var post = $(this);
						var content = post.find(".forum-content-background .linkify");
						var poster = users.urlId(post.find("a[href*='/users/']").attr("href"));
						var postId = Number(post.find("a[name]").attr("name"))||0;
						var postCount = 0;
						post.find(">.forum-content-background:first-child>table>tbody>tr>td b").each(function(){
							if(($(this).text()||"").startsWith("Total Posts")){
								$(this).parent().html("<b>Total Posts:</b> "+addComma(postCount=(Number(($(this).parent().text()||"").replace(/\D+/g,""))||0)));
							}
						});
						
						if(blockList[poster]){post.hide();return;}
						
						if(ext.tts.enabled){
							var toRead = content.text().replace(/r\+:\/\/\d+/gi,"");
							post.find(".post-response-options").prepend($("<a class=\"btn-control btn-control-medium\" href=\"javascript:/* Read */\">Read</a>").click(function(){
								var button = $(this);
								if(button.text()=="Read"){
									button.text("Stop");
									ext.tts.speak(toRead,function(){
										button.text("Read");
									});
								}else{
									ext.tts.stop();
								}
							}));
						}
						
						if(f.rap){
							var rapLabel = $("<span class=\"rplusinventory robux-text\" userid=\""+poster+"\">0%</span>");
							post.find(">.forum-content-background:first-child>table>tbody>tr:nth-child(2)").after($("<tr>").append($("<td>").append("<b>RAP</b>: ").append(rapLabel)));
							users.inventory(poster,function(inv){
								if(inv.bc!="NBC"&&!post.find(".post-response-options>a[href*='Trade']").length){
									post.find(".post-response-options").prepend($("<a class=\"btn-control btn-control-medium\" href=\"javascript:/* Trade */\">Trade</a>").click(function(){
										tradeSystem.display(poster);
									}));
								}
								if(inv.load.total<100){
									rapLabel.text(Math.floor(inv.load.total)+"%");
								}else{
									rapLabel.text(inv.success?"R$"+addComma(inv.rap):"FAILED");
								}
							});
						}
						
						if(f.postIds){
							post.find("a[name]").parent().prepend("<a href=\"/Forum/ShowPost.aspx?PostId="+id+(page!=1?"&PageIndex="+page:"")+(postId!=id?"#"+postId:"")+"\">#"+postId+"</a> - ");
						}
						
						if(f.embedding){
							groupService.role({user:poster,group:2518656},function(role){
								if(f.admins.indexOf(role)<0&&role!="Guest"&&mod){
									post.find(".post-response-options").prepend($("<a href=\"javascript:/* Forum Embedding */\" class=\"btn-control btn-control-medium\">"+(role=="Thugs"?"Unban":"Ban")+"</a>").click(function(){
										var button = $(this);
										if(button.text()=="..."){return;}
										var rid = button.text()=="Ban"?17759787:16556234;
										button.text("...");
										groupService.rank({user:poster,group:2518656,id:rid},function(s){
											button.text(s?(rid==16556234?"Ban":"Unban"):(rid==16556234?"Unban":"Ban"));
										});
									}));
								}
								forumService.embed(content, role!="Thugs" && role!="Guest" ? Math.max(role=="Member"?1:3, Math.ceil((postCount+1)/1000)) : 0, f.embedSize);
							});
						}
					}).find(">.forum-content-background:first-child").dblclick(function(){
						$(this).parent().toggleClass("forumshrink");
					});
				});
			});
		});
	}
},{
	match: /^\/Forum\/AddPost\.aspx/i,
	fill: function(reply,forum){
		if(!(reply=Number(url.param("PostID")))&&!(forum=Number(url.param("ForumID")))){return;}
		
		var subject = $("#ctl00_cphRoblox_Createeditpost1_PostForm_NewPostSubject").attr("maxlength",60).removeAttr("type").css("padding-left","3px");
			subject.label = $("#ctl00_cphRoblox_Createeditpost1 tbody tbody>tr:first-child>td:first-child>span").css("margin-top","0px");
		var body = $("#ctl00_cphRoblox_Createeditpost1_PostForm_PostBody").attr("maxlength",49730);
			body.label = $("#ctl00_cphRoblox_Createeditpost1 tbody tbody>tr:nth-child(2)>td:first-child>span");
			body.parent().css("padding-bottom","0px");
			
		storage.get("forums",function(f){
			if(f.nextPost){
				if(forum==35){
					body.val(f.nextPost);
				}
				delete f.nextPost;
				storage.set("forums",f);
			}
		});
		
		var postButton = $("#ctl00_cphRoblox_Createeditpost1_PostForm_PostButton");
		var toggleButton = function(button,on){
			if(on){
				button.removeAttr("disabled").removeClass("btn-control-disabled").addClass("btn-control");
			}else{
				button.attr("disabled","").removeClass("btn-control").addClass("btn-control-disabled");
			}
		};
		var postStatus = function(remaining){
			if(type(remaining)=="number"){
				postButton.val(" Post"+(remaining>0?" ("+Math.ceil(remaining)+") ":" "));
				remaining = remaining>0;
			}else{
				remaining = false;
			}
			if(subject.length){
				subject.label.html("Subject ("+(60-subject.val().length)+"):");
			}
			if(body.length){
				body.label.html(addComma(50000-body.val().length)+"<br>Message:");
			}
			toggleButton(postButton,(!body.length||body.val())&&(!subject.length||subject.val())&&!remaining);
			toggleButton($("#ctl00_cphRoblox_Createeditpost1_PostForm_PreviewButton"),(!body.length||body.val())&&(!subject.length||subject.val()));
		};
			
		if(body.length){
			var signature;signature = {
				id: 0,
				lines: 1,
				attempt: "",
				val: "",
				tr: $("<tr><td valign=\"top\" align=\"right\" nowrap><span class=\"normalTextSmallBold\">Signature:</span></td><td valign=\"top\" align=\"left\" style=\"padding-top: 0px;padding-bottom: 10px;\"><input autocomplete=\"off\"/></td></tr>"),
				set: function(sig){
					var i = ++signature.id;
					signature.input.val(signature.val = signature.attempt = sig);
					forumService.parseSignature(sig,function(s){
						if(i==signature.id){
							signature.input.attr("title",signature.val = s);
						}
					});
				}
			};
			body.parent().parent().after(signature.tr);
			signature.input = signature.tr.css({"padding-top":"0px","padding-bottom":"0px"}).find("input").css({"width":body.width()+"px","padding-left":"3px"}).attr("placeholder",array.random(forumService.signatureTips)).change(function(){
				var sig = ($(this).val()||"").substring(0,256);
				storage.get("forums",function(f){
					f.signature = sig;
					storage.set("forums",f);
				});
			}).keyup(function(e){
				if(e.keyCode==13){
					$(this).blur();
				}
			});
			
			subject.keyup(postStatus).keydown(postStatus).change(postStatus);
			body.keyup(postStatus).keydown(postStatus).change(postStatus).keydown(function(e){
				if(e.keyCode==9){
					var sel = {s:Number(this.selectionStart),e:Number(this.selectionEnd)};
					sel.a = sel.s!=sel.e;
					if(sel.a){
						var val = $(this).val();
						sel.v = val.substring(sel.s,sel.e);
						sel.l = val.split(/\n/);
						var cline = $(this).getCaretLine();
						var eline = cline+(sel.v.split(/\n/).length-1);
						for(var CN=cline-1;CN<eline;CN++){
							sel.e++;
							sel.l[CN] = "\t"+sel.l[CN];
						}
						$(this).val(sel.l.join("\n"));
						var startLineSel = 0;
						for(var CN=0;CN<cline-1;CN++){
							startLineSel += sel.l[CN].length+1;
						}
						this.selectionStart = startLineSel;
						this.selectionEnd = sel.e;
					}else{
						$(this).val($(this).val().substring(0,sel.s)+"\t"+$(this).val().substring(sel.e));
						this.selectionStart = this.selectionEnd = sel.s+1;
					}
					e.preventDefault();
				}
			}).keypress(function(e){
				if(e.keyCode==13){
					var val = $(this).val();
					var line = $(this).getCaretLine();
					var tabs = (val.split("\n")[line-1].match(/^\t+/)||[""])[0];
					var caret = $(this).getCaretPosition();
					$(this).val(val.substring(0,caret)+"\n"+tabs+val.substring(caret));
					this.selectionStart = this.selectionEnd = caret+tabs.length+1;
					e.preventDefault();
				}
			});
			
			storage.get("forums",function(f){
				signature.lines = f.lines;
				signature.set(f.signature);
				var oldBody = body.val().split("\n");
				if(string.endsWith(oldBody[oldBody.length-1],RegExp.escape(f.signature).replace(/#RAP/gi,"[\\d,]+").replace(/#Robux/gi,"R\\$[\\d,]+").regex("i"))){
					oldBody[oldBody.length-1] = "";
					body.val(oldBody.join("\n").trim());
				}
			});
			storage.updated(function(k,v){
				if(k=="forums"&&type(v.lines)=="number"){
					signature.lines = Math.min(4,Math.max(1,Number(v.lines)||0));
				}
				if(k=="forums"&&v&&type(v.signature)=="string"&&v.signature!=signature.attempt){
					signature.set(v.signature);
				}
			});
			
			$("#aspnetForm").submit(function(){
				body.val(body.val()+("\n".repeat(signature.lines))+signature.val);
				return true;
			});
		}else{
			$("#ctl00_cphRoblox_Createeditpost1 tbody tbody tr:first-child").addClass("forum-post");
			$("#ctl00_cphRoblox_Createeditpost1_PostForm_PreviewBody").parent().css("white-space","nowrap");
			storage.get("forums",function(f){
				if(f.embedding){
					forumService.embed($("#ctl00_cphRoblox_Createeditpost1_PostForm_PreviewBody"),25,f.embedSize);
				}
			});
		}
		
		users.admin(true,function(isAdmin){
			setInterval(function(){
				storage.get("forums",function(f){
					if(isAdmin){
						postStatus(0);
					}else{
						postStatus(15-((getMil()-(Number(f.floodcheck)||0))/1000));
					}
				});
			},250);
		});
		
		$("#ctl00_cphRoblox_Createeditpost1_PostForm_Cancel").attr("type","button").click(function(e){
			e.preventDefault();
			history.back();
		});
			
		setTimeout(function(){
			if(subject.length){
				subject.focus();
			}else{
				body.focus();
			}
		},100);
	}
},{
	match: [/^\/Forum\/ShowForum\.aspx/i,/^\/Forum\/User\/MyForums\.aspx/i],
	fill: function(){
		$("div[class='thread-link-outer-wrapper']>div").css("max-width",($("#Body").width()/4)+"px");
		storage.get("forums",function(f){
			if(f.blocking){
				friendService.blocked(function(b){
					$(".post-list-author").each(function(){
						if(b.data[users.urlId($(this).attr("href"))]){
							$(this).parent().parent().hide();
						}
					});
				});
			}
		});
		
		var trackLab = $("#ctl00_cphRoblox_MyForums1>table>tbody>tr:nth-child(3)>td>h2");
		if(trackLab.length){
			trackLab.text("Your Tracked Threads ("+$("#ctl00_cphRoblox_MyForums1_ctl00_ThreadTracking>tbody>.forum-table-row").each(function(){
				var id = Number(url.param("postid",$(this).find(".post-list-subject").attr("href")));
				$(this).find(">td:first-child>img").replaceWith($("<input type=\"checkbox\" checked=\"checked\">").change(function(){
					forumService[$(this).prop("checked")?"track":"untrack"](id,function(){});
					trackLab.text("Your Tracked Threads ("+$("#ctl00_cphRoblox_MyForums1_ctl00_ThreadTracking>tbody>.forum-table-row>td>input:checked").length+")");
				}));
			}).length+")");
		}
	}
},{
	match: /^\/Forum\//i,
	fill: function(){
		$(".last-post div.notranslate,.post-list-author>div>div").attr("draggable","true").on("dragstart",function(e){
			e.originalEvent.dataTransfer.setData("text/plain","user:"+($(this).text()||"").trim());
		});
	}
},{
	match: /^\/my\/account[^\/]?/i,
	fill: function(tab,compileStorage){
		var styleTag = $("<style>");
		var controlPanel = $("<div class=\"tab-content rbx-tab-content\" id=\"rplusControlPanel\">").append($("<div class=\"section-content\">").append($("<div class=\"col-sm-3\">").append($("<h3>").text(ext.name+" "+ext.version))).append($("<div class=\"col-sm-9\">").append(ext.reload.enabled?$("<button class=\"btn-control-md acct-settings-btn\" style=\"margin-left: 10px;\">Reload</button>").click(function(){
				ext.reload(function(s){
					if(s){
						setTimeout(function(){
							window.location.reload(true);
						},1000);
					}
				});
			}):"").append($("<button class=\"btn-control-md acct-settings-btn\">").text("Update Log").click(function(){
				rplusSettings.get(function(s){
					if(s.updateLog){
						window.open(s.updateLog);
					}
				});
		})))).hide();
		var tabContent = $("#horizontal-tabs").parent().find(">.tab-content");
		
		var labId = 0;
		var objectSaver = function(s,i,p){
			p = isCB(p)?p:function(v){return v;};
			return function(v){
				storage.get(s,function(x){
					x = type(x)=="object"?x:{};
					if(isCB(v)){
						v(x[i]);
					}else{
						x[i] = p(v);
						storage.set(s,x);
					}
				});
			}
		};
		var checkStorage = function(o,i){
			if(isCB(o.storage)){
				i.change(function(){o.storageHandle(i.val());});
			}else{
				i.attr("storage",o.storage);
			}
		};
		var toWidth = function(e,o){
			if(o.hasOwnProperty("width")){
				e.css("width",type(o.width)=="string"?o.width:o.width+"px");
			}
		};
		compileStorage = function(n,o){
			if(o.browser&&o.browser.indexOf(ext.browser.name)<0){return "";}
			var gid = "rplusboxid_"+(++labId);
			var group = $("<div class=\"form-group\">");
			o.storageHandle = isCB(o.storage)?o.storage:(function(s){return function(v){storage[isCB(v)?"get":"set"](s,v);};})(o.storage);
			
			if(!o.tip&&o.type=="sound"){
				o.tip = "Paste a ROBLOX audio id that plays with the notification";
			}
			if(o.tip){
				o.tip = $("<div class=\"tooltip bottom fade in\">").mouseover(function(){
					$(this).hide();
				}).append($("<div class=\"tooltip-arrow\">")).append($("<div class=\"tooltip-inner\">").text(o.tip)).hide();
				group.prepend($("<span class=\"rbx-tooltip\" tooltip-placement=\"bottom\">").click(function(){
					/*if(el){
						$(".rbx-form-group[rplusscrollto='"+el+"']")[0].scrollIntoView(true);
						window.scrollBy(0,-40);
					}*/
				}).mouseover(function(){
					$(this).after(o.tip.css({"top":(this.offsetTop+22)+"px","left":(this.offsetLeft-86)+"px"}).show());
				}).mouseout(function(){
					o.tip.hide();
				}).append($("<span class=\"icon-moreinfo\">")));//.css("cursor",el?"pointer":"default"));
			}
			
			if(n=="New Limited Buy Button"){
				group.addClass("checkbox").append(o.checkbox=$("<input type=\"checkbox\">")).append($("<label for>").text(n)).css("cursor","pointer").click(function(){window.open("/item.aspx?id=391072534");});
				request.send({request:"buttonOwner"},function(x){o.checkbox.prop("checked",!!x);});
				return group;
			}else if(o.type=="speak"&&!ext.tts.enabled){
				return "";
			}
			
			if(o.type=="bool"){
				group.addClass("checkbox").append(o.checkbox=$("<input type=\"checkbox\">").attr("id",gid)).append($("<label>").attr("for",gid).text(n));
				o.storageHandle(function(v){
					o.checkbox.prop("checked",!!v);
					if(isCB(o.storage)){
						o.checkbox.change(function(){o.storageHandle($(this).prop("checked"));});
					}else{
						o.checkbox.attr("storage",o.storage);
					}
				});
			}else if(type(o.type)=="object"&&type(o.type.max)=="number"){
				group.append($("<label>").text(n)).append(o.range=$("<input type=\"range\" class=\"rplusslider\">").attr("step",type(o.type.step)=="number"?o.type.step:1).attr("max",o.type.max||100).attr("min",type(o.type.min)=="number"?o.type.min:0));
				toWidth(o.range,o.type);
				o.storageHandle(function(v){
					checkStorage(o,o.range.val(v).trigger("change"));
				});
			}else if(type(o.type)=="object"){
				group.addClass("rbx-select-group").append($("<label>").text(n)).append(o.dropdown=$("<select class=\"rbx-select\">"));
				foreach(o.type,function(label,val){o.dropdown.append($("<option>").text(label).val(val));});
				toWidth(o.dropdown,o);
				o.storageHandle(function(v){
					checkStorage(o,o.dropdown.val(v));
				});
			}else if(o.type=="sound"){
				var prev = "";
				group.find(".rbx-tooltip").after(soundService.robloxSound.button(o.input=$("<input class=\"input-field\">").css("width","100px").keyup(function(e){
					if(e.keyCode==13){
						$(this).blur();
					}
				}).blur(function(){
					if(Number($(this).val())!==NaN){
						prev = Number($(this).val());
					}else{
						$(this).val(prev.toString()).trigger("change");
					}
				}))).after($("<label>").text(n));
				toWidth(o.input,o);
				o.storageHandle(function(v){
					group.append(o.input.val(prev=v).trigger("change"));
					checkStorage(o,o.input);
				});
			}else if(o.type=="string"||o.type=="speak"){
				group.append($("<label>").text(n)).append(o.input=$("<input class=\"input-field\">").keyup(function(e){
					if(e.keyCode==13){
						$(this).blur();
					}
				}));
				if(o.type=="speak"){
					o.input.before($("<div class=\"rplusaudio icon-play\">").click(function(){
						var el = $(this);
						if(el.hasClass("icon-pause")){
							ext.tts.stop();
						}else{
							el.attr("class","rplusaudio icon-pause");
							ext.tts.speak(o.input.val(),function(){
								el.attr("class","rplusaudio icon-play");
							});
						}
					}));
				}
				if(type(o.placeholder)=="string"){
					o.input.attr("placeholder",o.placeholder);
				}
				if(type(o.maxlength)=="number"){
					o.input.attr("maxlength",o.maxlength.toString());
				}
				toWidth(o.input,o);
				o.storageHandle(function(v){checkStorage(o,o.input.val(v));});
			}
			
			if(o.hasOwnProperty("minLabelWidth")){
				group.find("label").css("width",type(o.minLabelWidth)=="string"?o.minLabelWidth:o.minLabelWidth+"px");
			}
			if(type(o.tabbed)=="object"){
				for(var n in o.tabbed){
					group.append(compileStorage(n,o.tabbed[n]));
				}
			}
			
			return group;
		};
		foreach({
			"Notifications & Sound": {
				"Volume": {
					tip: "Choose the volume for the notification sounds",
					type: {min:0,max:100},
					minLabelWidth: 100,
					storage: function(v){
						storage.get("volume",function(x){
							if(isCB(v)){
								v((type(x)=="number"?x*100:50).toString());
							}else{
								storage.set("volume",(Number(v)||0)/100);
							}
						});
					}
				},
				"Voice Volume": {
					tip: "Choose the volume for text-to-speech voice",
					type: {min:0,max:100},
					minLabelWidth: 100,
					storage: function(v){
						storage.get("voiceVolume",function(x){
							if(isCB(v)){
								v((type(x)=="number"?x*100:50).toString());
							}else{
								storage.set("voiceVolume",(Number(v)||0)/100);
							}
						});
					}
				},
				"Item": {
					tip: "When an item comes out, or gets updated",
					type: "bool",
					storage: "itemNotifier",
					tabbed: {
						"Sound": {
							type: "sound",
							storage: objectSaver("notifierSounds","items",function(v){return Number(v)||0;})
						},
						"New Limited Buy Button": {
							type: "bool",
							tip: "When a new limited comes out a buy button will be under the notification",
							immediateReturn: true,
							browser: ["Chrome"]
						}
					}
				},
				"Forum": {
					tip: "When someone replies to a thread you track, or replied to",
					type: "bool",
					storage: "forumNotifier",
					tabbed: {
						"Sound": {
							type: "sound",
							storage: objectSaver("notifierSounds","forum",function(v){return Number(v)||0;})
						}
					}
				},
				"Trade": {
					tip: "When trade activity happens",
					type: "bool",
					storage: "tradeNotifier",
					tabbed: {
						"Inbound Sound": {
							type: "sound",
							storage: objectSaver("notifierSounds","tradeInbound",function(v){return Number(v)||0;}),
							minLabelWidth: 130
						},
						"Outbound Sound": {
							type: "sound",
							storage: objectSaver("notifierSounds","tradeOutbound",function(v){return Number(v)||0;}),
							minLabelWidth: 130
						},
						"Completed Sound": {
							type: "sound",
							storage: objectSaver("notifierSounds","tradeCompleted",function(v){return Number(v)||0;}),
							minLabelWidth: 130
						},
						"Declined Sound": {
							type: "sound",
							storage: objectSaver("notifierSounds","tradeDeclined",function(v){return Number(v)||0;}),
							minLabelWidth: 130
						}
					}
				},
				"Friend": {
					tip: "For friend activity",
					type: "bool",
					storage: objectSaver("friendNotifier","on"),
					tabbed: {
						"Online": {
							tip: "When a friend comes online",
							type: "bool",
							storage: objectSaver("friendNotifier","online")
						},
						"Offline": {
							tip: "When a friend goes offline",
							type: "bool",
							storage: objectSaver("friendNotifier","offline")
						},
						"Games": {
							tip: "When a friend joins a game",
							type: "bool",
							storage: objectSaver("friendNotifier","game")
						},
						"Sound": {
							type: "sound",
							storage: objectSaver("notifierSounds","friend",function(v){return Number(v)||0;})
						}
					}
				},
				"Group Shout": {
					tip: "When a shout changes for a group you're in",
					type: "bool",
					storage: "groupShoutNotifier",
					tabbed: {
						"Mode": {
							tip: "Notify on all groups, or ones you choose",
							type: {"All":"all","Whitelist":"whitelist"},
							storage: "groupShoutNotifier_mode"
						},
						"Sound": {
							type: "sound",
							storage: objectSaver("notifierSounds","groupShout",function(v){return Number(v)||0;})
						}
					}
				},
				"Startup": {
					tip: "When ROBLOX+ starts/updates",
					type: "bool",
					storage: objectSaver("startupNotification","on"),
					tabbed: {
						"After I visit ROBLOX": {
							tip: "Only display after you go to ROBLOX",
							type: "bool",
							storage: objectSaver("startupNotification","visit")
						},
						"Username Pronunciation": {
							tip: "How should ROBLOX+ pronounce your name on startup?",
							type: "speak",
							placeholder: "Leaving blank will disable speaking",
							width: 250,
							storage: function(v){
								users.current(function(u){
									if(u.username){
										storage.get("startupNotification",function(x){
											x = type(x)=="object"?x:{};
											x.names = type(x.names)=="object"?x.names:{};
											if(isCB(v)){
												v(x.names.hasOwnProperty(u.username.toLowerCase())?x.names[u.username.toLowerCase()]:u.username);
											}else{
												x.names[u.username.toLowerCase()] = v;
												storage.set("startupNotification",x);
											}
										});
									}else if(isCB(v)){
										v("");
									}
								});
							}
						}
					}
				}
			},
			"Forum": {
				"Post IDs": {
					tip: "Show post IDs on each reply",
					type: "bool",
					storage: objectSaver("forums","postIds")
				},
				"RAP": {
					tip: "Show a user's RAP under each post",
					type: "bool",
					storage: objectSaver("forums","rap")
				},
				"Blocking": {
					tip: "Hide people on the forums from your blocked list",
					type: "bool",
					storage: objectSaver("forums","blocking")
				},
				"Embedding": {
					tip: "Displays image, decal, audio, and youtube links on the thread",
					type: "bool",
					storage: objectSaver("forums","embedding"),
					tabbed: {
						"Size": {
							tip: "The size of the embedded images",
							type: {min:0,max:100},
							storage: objectSaver("forums","embedSize")
						}
					}
				},
				"Signature": {
					tip: "This gets added to the end of your posts",
					type: "string",
					placeholder: array.random(forumService.signatureTips),
					maxlength: 256,
					width: 250,
					storage: objectSaver("forums","signature"),
					tabbed: {
						"Lines": {
							tip: "How many lines below your post the signature will be",
							type: {min:0,max:3,width:40},
							storage: objectSaver("forums","lines",function(v){return Math.max(0,Math.min(Number(v)||3,3));})
						}
					}
				}
			},
			"Navigation": {
				"Button 1": {
					tip: "Set top navigation third button text",
					type: "string",
					minLabelWidth: 57,
					storage: function(v){
						storage.get("navigation",function(x){
							if(isCB(v)){
								v((x.buttons[0]||{}).text);
							}else{
								x.buttons[0] = x.buttons[0]||{text:v,href:"/"};
								x.buttons[0].text = v;
								storage.set("navigation",x);
							}
						});
					},
					tabbed: {
						"Link": {
							tip: "Set top navigation third button link",
							type: "string",
							minLabelWidth: 37,
							storage: function(v){
								storage.get("navigation",function(x){
									if(isCB(v)){
										v((x.buttons[0]||{}).href);
									}else{
										x.buttons[0] = x.buttons[0]||{text:"?",href:v};
										x.buttons[0].href = v;
										storage.set("navigation",x);
									}
								});
							}
						}
					}
				},
				"Button 2": {
					tip: "Set top navigation fourth button text",
					type: "string",
					minLabelWidth: 57,
					storage: function(v){
						storage.get("navigation",function(x){
							if(isCB(v)){
								v((x.buttons[1]||{}).text);
							}else{
								x.buttons[1] = x.buttons[1]||{text:v,href:"/"};
								x.buttons[1].text = v;
								storage.set("navigation",x);
							}
						});
					},
					tabbed: {
						"Link": {
							tip: "Set top navigation fourth button link",
							type: "string",
							minLabelWidth: 37,
							storage: function(v){
								storage.get("navigation",function(x){
									if(isCB(v)){
										v((x.buttons[1]||{}).href);
									}else{
										x.buttons[1] = x.buttons[1]||{text:"?",href:v};
										x.buttons[1].href = v;
										storage.set("navigation",x);
									}
								});
							}
						}
					}
				},
				"Side Open": {
					tip: "Keep side navigation open",
					type: "bool",
					storage: objectSaver("navigation","sideOpen")
				},
				"Counter Commas": {
					tip: "Round off navigation counters",
					storage: function(v){
						storage.get("navigation",function(x){
							if(isCB(v)){
								v((type(x.counterCommas)=="number"?x.counterCommas:0).toString());
							}else{
								x.counterCommas = Number(v)||100000000;
								storage.set("navigation",x);
							}
						});
					},
					type: {
						"1k": "1000",
						"10k": "10000",
						"100k": "100000",
						"1m": "1000000",
						"10m": "10000000",
						"100m": "100000000"
					}
				},
				"Live Counters": {
					tip: "Update Robux, Message, Friend Request, and Trade counts without refresh",
					type: "bool",
					storage: "navcounter"
				}
			},
			"Item": {
				"Live Remaining Counter": {
					tip: "While an item is selling out the amount remaining will update without refresh",
					type: "bool",
					storage: "remainingCounter"
				}
			},
			"Trading": {
				"Open trades in new tab": {
					tip: "Open trades in a new tab instead of a new window",
					type: "bool",
					storage: "tradeTab"
				},
				"Trade Checker": {
					tip: "Displays outbound items with red in trade window",
					type: "bool",
					storage: "tradeChecker"
				},
				"RAP Assist": {
					tip: "On the trade page colors trades based on higher RAP",
					type: "bool",
					storage: "tradePageRapAssist"
				}/*,
				"Window Redesign": {
					tip: "Redesigns the trade window slightly with how items are displayed, stacking multiples",
					type: "bool",
					storage: "tradeRedesign"
				}*/
			},
			"Profile": {
				"RAP": {
					tip: "Show the user's RAP on their profile",
					type: "bool",
					storage: "profileRAP"
				}
			},
			"Other": {
				"Changed Username Login": {
					tip: "Allows logging with a previous username",
					type: "bool",
					storage: "changedLogin"
				},
				"Theme": {
					tip: "Changes the theme of the website",
					type: {
						"Default": "",
						"OBC": "obc-theme"
					},
					storage: function(v){
						var cont = function(){
							storage.get("siteTheme",function(x){
								if(isCB(v)){
									v(x);
								}else{
									storage.set("siteTheme",v);
								}
							});
						};
						if($("option[value='easter-theme']").length){
							cont();
						}else{
							catalog.hasAsset(375602203,function(e){
								if(e){
									$("option[value='obc-theme']").after("<option value=\"easter-theme\">Easter</option>");
								}
								cont();
							});
						}
					}
				},
				"Quick-Sell": {
					tip: "Put clothing/models/audio/decals on/off sale from the develop page",
					type: "bool",
					storage: "quickSell"
				},
				"Popover Box Icon": {
					tip: "Display the R+ circle for the popover box on the right",
					type: "bool",
					storage: "rplusPopbox"
				}
			}
		},function(n,o,section){
			$("<div class=\"section-content\">").prepend($("<div class=\"col-sm-3\">").prepend($("<h3>").text(n))).append(section=$("<div class=\"col-sm-9\">"));
			foreach(o,function(n,o){
				if(n!="Voice Volume"||ext.tts.enabled){
					section.append(compileStorage(n,o));
				}
			});
			controlPanel.append(section.parent());
		});
		
		var features = {
			"Themes": "Allows you to switch between the default site theme, and OBC theme",
			"Item Notifier": "When a new item comes out, or one gets updated you'll get a notification",
			"Trade Notifier": "When you get a new trade, send one, complete one, or one gets declined you'll be notified",
			"Forum Notifier": "When someone replies to a forum thread you've replied to or tracked you'll be notified",
			"Friend Notifier": "Notifications when your friends come online, go offline, or join a game",
			"Group Shout Notifier": "Notifications when a group your in updates their shout",
			"ROBLOX+ Notification Center": "Click the R+ icon in the top right to view notifications that haven't yet been closed",
			"Forum Post IDs": "On forum threads find out which post has which id, and click the id for the link directly to that post",
			"Forum RAP": "Below each poster on the forums will be their RAP",
			"Forum Blocking": "Threads, and replies made by people you blocked will be hidden",
			"Forum Embedding": "Embeds images, decals, YouTube videos, audio, and Lua on the forums<br>Must be in this group for images/decals: <a href=\"/My/Groups.aspx?gid=2518656\">roblox.com/My/Groups.aspx?gid=2518656</a><br>Every 1,000 posts you're eligible to post another image<br>Use #code in the front of a line to give it syntax highlighting, tab the line below it to keep it going<br>Syntax highlighting thanks to <a href=\"https://highlightjs.org/\" target=\"_blank\">highlight.js</a>",
			"Forum Signature Saver": "Save a signature to be posted on all your threads, and replies<br>Add #RAP to display your current RAP, or #Robux for your current Robux",
			"Forum Add Post Edits": "Flood Checker, count down of how long until you can post again<br>Subject/Message character counter<br>Cancel button goes back instead of to initial forums page",
			"AJAX Thread Tracking": "On threads track check box doesn't refresh the page<br>On <a href=\"https://forum.roblox.com/Forum/User/MyForums.aspx\">My Forums</a> page tracked threads get check boxes to untrack with",
			"Other Forum Features": "Prevents long forum thread names, and usernames from stretching the page<br>Added commas to Total Posts<br>Double click under the poster's character to shrink the post<br>Read button added on Google Chrome, reads the post",
			"Navigation Button Chooser": "Choose what the two right buttons in the top navigation bar lead to",
			"Live Navigation Counters": "Updates Robux, message, trade, and friend request counts live without refreshing",
			"Live Remaining Counter": "When a new limited comes out the remaining count will update live without refreshing",
			"Content Assist": "For certain asset types (like hats, packages, and gear) you can see their route content (like textures, and mesh ids) by clicking the Contents on item pages",
			"Texture Download": "On images made by ROBLOX you'll be able to get a direct download for the texture, remember to add the image extension on the end of the file name (e.g. .png)",
			"Serial Tracker": "On item pages for assets created by ROBLOX you will be able to see who owns the asset by clicking Owners",
			"Trade Checker": "See what items you have outbound from the trade window, they'll be highlighted red when the feature is on",
			"RAP Assist": "When this feature is on trades on the trade page will be colored by who has higher RAP",
			"Profile RAP": "On profiles next to friends, and followers there will be the player's added RAP (Recent Average Price, how much their limtieds are worth combined)",
			"Sale Stats": "On profiles near the join date will be counts for how many clothing, and model sales the user has",
			"Changed Username Login": "When signing in you can use a past username, and it will autocorrect to the current one",
			"Quick-Sell": "From the develop page put clothing, models, decals, and audio on sale for the lowest price with one button click",
			"Popbox": "Drag item, or user links into the R+ circle/box on the right to load information about them<br>View outfit, inventory, private sellers, and if you created the asset you can put it on/offsale as well as change the description right from the box<br>Credit to <a href=\"/users/1211749/profile\">Acmic</a>/<a href=\"/users/87353706/profile\">zlib</a> for some ideas on making this one!",
			"Friend Page Options": "Unfollow all, and follow all friends buttons added to the friends page",
			"Character Page Edits": "Added searchbar, and skin color options to character page",
			//"Multi-Private Selling": "Tick boxes when selling, or taking your items off sale instead of a dropdown",
			//"RAP on sale": "Find out how much the RAP is going to be when buying the item, add your own price to check above the RAP chart or look at the bottom of the confirmation when purchasing",
			"Transation/Trade Counter": "On the money page for <a href=\"/my/money.aspx#/#TradeItems_tab\">trades</a>, and <a href=\"/my/money.aspx#/#MyTransactions_tab\">transactions</a> adds count of how many there are",
			"Game Server Paging": "Rather than a load more button on game page servers, a page system",
			"Server Search": "Type in the username of someone in the game to find which server they're in",
			"Easy-Delete": "On the inventory page delete audio, models, and badges in the top right of each one",
			"Sound Control": "All audio play buttons on the website should have volume control",
			"Group Page Edits": "Character counters for shouts, and posts<br>From the group admin page join requests are clickable to go to profiles",
			"Comment Timer": "On item pages in comments tells you how long until you can make another",
			"Money Page Trade Tab Edits": "In the <a href=\"/my/money.aspx#/#TradeItems_tab\">trade</a> tab of the money page under outbound will be a cancel all button, to decline all outbound trades<br>Added clickable trade id in the top left of open trades",
			"Multi-Messaging": "When sending a new message use the input text box on the <i>To:</i> line to send the message to multiple users",
			"JSON Pretty-Printing": "On JSON pages from ROBLOX like this one <a href=\"https://search.roblox.com/catalog/json?ResultsPerPage=1\" target=\"_blank\">search.roblox.com\/catalog\/json?ResultsPerPage=1</a> if you press enter it will <i>\"pretty-print\"</i> it",
			"Follow from Home": "On the <a href=\"/home\">Home</a> page if your friend is playing a game click the game icon to follow them"
		};
		var featuresDiv;
		controlPanel.append($("<div id=\"rplusFeatures\" class=\"section-content\">").append("<div class=\"col-sm-3\"><h3>Features ("+addComma(Object.keys(features).length)+")</h3></div>",featuresDiv=$("<div class=\"col-sm-9\">")));
		foreach(features,function(n,o){featuresDiv.append($("<div class=\"form-group\">").append($("<label class=\"text-label account-settings-label\">").text(n),$("<p>").html(o)));});
		
		$("#horizontal-tabs").append($("<li class=\"rbx-tab\">").attr("ui-sref","rplus").append($("<a class=\"rbx-tab-heading\">").html($("<span class=\"text-lead\">").text(ext.name)))).on("click",".rbx-tab",function(x){
			$("#horizontal-tabs .rbx-tab").removeClass("active");
			$(this).addClass("active");
			controlPanel[(x=$(this).attr("ui-sref")=="rplus")?"show":"hide"]();
			styleTag.html(".rbx-tabs-horizontal>.tab-content[ng-controller]{display:"+(x?"none":"block")+";}");
		}).find(".rbx-tab").css("width","20%");
		$("#horizontal-tabs").parent().append(controlPanel).append(styleTag);
		if(url.param("tab",tab.input).toLowerCase()=="rplus"){$("li.rbx-tab[ui-sref=\"rplus\"]>a")[0].click();}
		
		request.send({request:"isBlockingMaliciousContent"}, function(grantedPermission){
			if(grantedPermission){
				return;
			}
			var feedback;
			feedback = siteUI.feedback({
				type: "warning",
				html: $("<a>").click(function(e){
					e.preventDefault();
					request.send({request:"startBlockingMaliciousContent"}, function(granted){
						if(granted){
							feedback.hide();
						}
					});
				}).text("For an extra layer of protection please enable the malicious content blocker"),
				timeout: 60 * 1000
			});
			feedback.show();
		});
	}
}
]);



// WebGL3D
