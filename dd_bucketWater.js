
// v1.0
// 滴滴橙心果园脚本,支持自动收水桶水滴
// 手动抓包获取token,手机在boxjs里填写
// boxjs订阅地址:https://gitee.com/passerby-b/javascript/raw/master/JD/passerby-b.boxjs.json
// docker环境变量名:DD_TOKEN,多账号用换行或者应为逗号(,)隔开

// [task_local]
// 1 */1 * * * https://raw.githubusercontent.com/passerby-b/didi_fruit/main/dd_bucketWater.js



const $ = new API("dd_fruit");
let tokens = [], token = '', notify = '', nickName = '';
!(async () => {

    // 判断环境变量里面是否有token
    if ($.env.isNode) {
        tokens = require('./dd_cookie');
        if (process.env.DD_TOKEN) {
            if (process.env.DD_TOKEN.indexOf(',') > -1) {
                tokens = process.env.DD_TOKEN.split(',');
            } else if (process.env.DD_TOKEN.indexOf('\n') > -1) {
                tokens = process.env.DD_TOKEN.split('\n');
            } else {
                tokens = [process.env.DD_TOKEN];
            }
        };
        notify = require('./sendNotify');
    }
    else {
        let tokenStr = $.read('#ddtoken');
        if (!!tokenStr) {
            tokenStr = tokenStr.replace(/ /g, '').replace(/\r/g, '').replace(/\n/g, '');
            if (tokenStr.indexOf(',') > -1) { tokens = tokenStr.split(','); }
            else { tokens.push(tokenStr); }
        }
    }

    for (let i = 0; i < tokens.length; i++) {
        nickName = '', token = '', assist_record = 0, waterCount = 0;
        console.log('\r\n★★★★★开始执行第' + (i + 1) + '个账号,共' + tokens.length + '个账号★★★★★');

        token = tokens[i];

//         let userNo = await treeInfo(0);
//         if (userNo != 0) {
//             if ($.env.isNode) await notify.sendNotify('第' + (i + 1) + '个账号TOKEN过期或无效', '请去滴滴出行APP抓取TOKEN!');
//             $.notify('第' + (i + 1) + '个账号TOKEN过期或无效', '', '请去滴滴出行APP抓取TOKEN!');
//             continue;
//         }

        await recBucketWater();

    }


})().catch(async (e) => {
    console.log('', '❌失败! 原因:' + e + '!', '');
}).finally(() => {
    $.done();
});


async function recBucketWater() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/recBucketWater?', '{"platform":1,"token":"' + token + '"}');
            await $.http.post(option).then(response => {
                //console.log(response.body);
                let data = JSON.parse(response.body);
                if (data.errno == 0) {
                    console.log('\n【收水桶水滴】:' + data.data.rec_water);
                }
                else console.log('\n【收水桶水滴】:' + data.errmsg);
            });
            resolve();
        } catch (error) {
            console.log('\n【收水桶水滴】:' + error);
            resolve();
        }
    })
}

//果树信息
async function treeInfo(step) {
    return new Promise(async resolve => {
        try {

            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/enter?wsgsig=dd03-OZXU0M%2BosbseRw9lmQvA4Z7v%2FiCboZTonoQa%2BYgw%2FiCcRx2WVJDE4I7TrCscRL9ShNoH12GkqDp9x25%2Fk%2BpD4SCTqbmJzPBzq3f94ZNRqgicP2LRmupF3Pgvqsq', '{"platform":1,"assist_type":0,"encode_uid":"","is_old_player":true,"token":"' + token + '"}');

            await $.http.post(option).then(async response => {
                //console.log(response.body);
                let data = JSON.parse(response.body);
                if (data.errno == 0) {
                    let fname = '', growth_stage = '';
                    for (let i = 0; i < data.data.trees_cfg.length; i++) {
                        const element = data.data.trees_cfg[i];
                        if (element.tree_id == data.data.tree_info.tree_id) fname = element.name; growth_stage = element.growth_stage[5];
                    }
                    try {
                        nickName = data.data.interacts[0].f_nick;
                    } catch (error) {
                        nickName = '昵称获取失败';
                    }
                    //let msg = fname + ':' + data.data.tree_info.tree_progress + '%,剩余' + data.data.tree_info.pack_water + '滴水,助力:' + assist_record + '/4';
                    let msg = fname + ':' + (data.data.tree_info.tree_water / growth_stage * 100).toFixed(2) + '%,剩余' + data.data.tree_info.pack_water + '滴水,助力:' + assist_record + '/4';
                    console.log('\n滴滴果园【' + nickName + '】:' + msg);
                    if (step == 1) {
                        msgStr += '\n【' + nickName + '】\n' + msg;
                        // if ($.env.isNode) await notify.sendNotify('\n滴滴果园', '【' + nickName + '】' + msg);
                        // $.notify('滴滴果园', nickName, msg);
                    }
                }
                resolve(data.errno);
            })

        } catch (error) {
            console.log('\n【果树信息】:' + error);
            resolve();
        }
    })
}

function urlTask(url, body) {
    let option = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.1.18 FusionKit/1.2.20 OffMode/0',
            'Connection': 'keep-alive',
            'Accept-Language': 'zh-cn',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    };
    return option;
}

function getZoneTime(offset) {
    // 取本地时间
    var localtime = new Date();
    // 取本地毫秒数
    var localmesc = localtime.getTime();
    // 取本地时区与格林尼治所在时区的偏差毫秒数
    var localOffset = localtime.getTimezoneOffset() * 60000;
    // 反推得到格林尼治时间
    var utc = localOffset + localmesc;
    // 得到指定时区时间
    var calctime = utc + (3600000 * offset);
    var nd = new Date(calctime);
    return nd.toDateString() + " " + nd.getHours() + ":" + nd.getMinutes() + ":" + nd.getSeconds();
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/
