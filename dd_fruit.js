

let token = '';

const $ = new API("dd_fruit");
!(async () => {

    await recExtWater1000();
    await $.wait(1000);

    await water();
    await $.wait(1000);

    await fertilizer();
    await $.wait(1000);

    await dogInteract();
    await $.wait(1000);

    await killWorm();
    await $.wait(1000);

    await dailyBox();
    await $.wait(1000);

    await tasklist();
    await $.wait(1000);

    await zhuLi();
    await $.wait(1000);

    recDailyReward();
    await $.wait(1000);

    await water();
    await $.wait(1000);


})().catch(async (e) => {
    console.log('', '❌失败! 原因:' + e + '!', '');
}).finally(() => {
    $.done();
});

//浇水
async function water() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/watering?wsgsig=dd03-Qu9qYTzgDM7Ml%2FDfmZL2V2WCaTyJ%2FlyalT6e%2F1XFaTyKlhJ2XIkAUPodA67KlADcjM2LXZm9ALcHte%2B%2BkwFdVIQLBxR2l%2Fb0nPdDUZ8AB6R3l%2FCAs5Bah2nFA65', '{"platform":1,"token":"' + token + '"}');

            let pack_water = 1, waterCount = 0;
            do {
                waterCount++;
                console.log('\n**********开始执行第' + waterCount + '次浇水**********');

                await $.http.post(option).then(response => {
                    let data = JSON.parse(response.body);
                    if (data.errno == 0) {
                        console.log('\n【浇水】:' + data.errmsg + ',剩余' + data.data.pack_water + '滴水,今天已浇水' + data.data.water_times + '次');
                        if (data.data.pack_water < 10) pack_water = 0;
                    } else {
                        console.log('\n【浇水】:' + data.errmsg);
                        pack_water = 0;
                    }

                });
                await $.wait(1000);
            } while (pack_water == 1);
            resolve();

        } catch (error) {
            console.log('\n【浇水】:' + error);
            resolve();
        }

    })

}

//施肥
async function fertilizer() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/fertilizer?wsgsig=dd03-5kyGrUHwozHE%2BKKUAXuzxAIPw8ODJNmUDtjjPa9ow8OC%2BJCSa03Wxq2zTpHC%2BvKWFDnQy%2FBuTyFB2o0uACWsxFIwYQd4%2By4VdstkPFIYYpHF3Nbhdgznxe6XTpw', '{"count":1,"platform":1,"token":"' + token + '"}');
            $.http.post(option).then(response => {
                let data = JSON.parse(response.body);
                console.log('\n【施肥】:' + response.body);
                resolve();
            })

        } catch (error) {
            console.log('\n【施肥】:' + error);
            resolve();
        }

    })
}

//摸狗
async function dogInteract() {
    return new Promise(async resolve => {
        try {
            //let option = urlTask('https://game.xiaojukeji.com/api/game/plant/dogInteract?wsgsig=dd03-jrYPupTTF6oZ4BnNTskNXKUYgxNy7EJISml5i3lzgxNz4AyByb5IWRwoGMoz4hnKQfhFVvUP0StwMUvgpgOaXySm0HiuNrXHpbLIXvrw0Mmz2hvIpiw9WyYQcYY', '{"friend_id":48666702,"inter_type":2,"platform":1,"token":"' + token + '"}');
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/dogInteract?wsgsig=dd03-jrYPupTTF6oZ4BnNTskNXKUYgxNy7EJISml5i3lzgxNz4AyByb5IWRwoGMoz4hnKQfhFVvUP0StwMUvgpgOaXySm0HiuNrXHpbLIXvrw0Mmz2hvIpiw9WyYQcYY', '{"inter_type":2,"platform":1,"token":"' + token + '"}');
            $.http.post(option).then(response => {
                let data = JSON.parse(response.body);
                console.log('\n【摸狗】:' + response.body);
                resolve();
            })

        } catch (error) {
            console.log('\n【摸狗】:' + error);
            resolve();
        }

    })
}

//赶蚂蚱
async function killWorm() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/killWorm?wsgsig=dd03-2iAt3F2cDhk9E%2F5L0rAD0rYGaadgBlrKGVMfb%2FBBaadfEheDdBUDGBH9ArkfEA5IAFI%2BFa9dA%2FZebe9e0keg0rLHBBBEE%2FM6ErEAGaZEBrB0E%2F63adabchaBArk', '{"platform":1,"token":"' + token + '"}');
            $.http.post(option).then(response => {
                let data = JSON.parse(response.body);
                console.log('\n【赶蚂蚱】:' + response.body);
                resolve();
            })

        } catch (error) {
            console.log('\n【赶蚂蚱】:' + error);
            resolve();
        }

    })
}

//领取1000水滴
async function recExtWater1000() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/recExtWater?wsgsig=dd03-9cN1eDeETfeXBKhhM9uvHXAazmlqENLn%2BEDT6mMfzmlrBJYz6qQYI0E0oGerBvhlIU0kJg5Dog1sgoxPNe4SHXA8pWqjBKqrMAJvIglcpGq%2FBK%2FW1l8P5n6foGd', '{"platform":1,"token":"' + token + '"}');
            $.http.post(option).then(response => {
                let data = JSON.parse(response.body);
                console.log('\n【领取1000水滴】:' + response.body);
                resolve();
            })

        } catch (error) {
            console.log('\n【领取1000水滴】:' + error);
            resolve();
        }

    })
}

//浇水奖励
async function dailyBox() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/dailyBox?wsgsig=dd03-Y8ZLkZb6HJ4ftGsmVLrSPM4H3QvaWD8%2FXHkZwLJ%2B3Qv9t0RYlS6SOxD7K349tmsirO%2FqRT44KRfcltooVwxTO1K3KJpcsjmjh5OYO1fMKzDHtjjXVLLuxT%2B3K3d', '{"platform":1,"box_id":1,"token":"' + token + '"}');
            $.http.post(option).then(response => {
                let data = JSON.parse(response.body);
                console.log('\n【浇水奖励】:' + response.body);
                resolve();
            })

        } catch (error) {
            console.log('\n【浇水奖励】:' + error);
            resolve();
        }

    })
}

//任务列表
async function tasklist() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/mission/get?platform=1&game_id=24&token=' + token + '&wsgsig=dd03-CHzVEnXwsC5zpLdk7Rv62tsP%2FswYQIPh68i9LCzo%2FswZpM6Z%2Bv4F1jmzrb5Zpwdj4zmI4towtDauZP1p54tDLGWzqCITpw6W8oQgLDQxkCSZpL1%2FJRKFLctQqb9', '');
            await $.http.get(option).then(async response => {
                let data = JSON.parse(response.body);
                //console.log('\n【任务列表】:' + response.body);

                for (let i = 0; i < data.data.missions.length; i++) {
                    const item = data.data.missions[i];
                    option = urlTask('https://game.xiaojukeji.com/api/game/mission/award?wsgsig=dd03-%2FosIP8J%2BP2fUXQm9oTQhkvD3vZmtspKgpZpwrQb6vZmsXRz8x6GPl44LQIfsX3meP2RVmKDKQH4rh%2BuISHQhlKgdQSNUWpsaTOuPkoDMzIGuXpQgS6Whrvf8Q51', '{"platform":1,"mission_id":' + item.id + ',"game_id":24,"token":"' + token + '"}');

                    await $.http.post(option).then(response2 => {
                        console.log(response2.body);
                    })

                }

                resolve(data);
            })

        } catch (error) {
            console.log('\n【任务列表】:' + error);
            resolve();
        }

    })
}

//助力
async function zhuLi() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/enter?wsgsig=dd03-BBvPDgBTVDqs46kY5bRH8j1YntAV71Iy7fm5Ks2zntAU45xmLi8I8c9oWcqU4Tkw1miF5DLpUbTXMYYq5Co5JDVYiGrn4xEv5Xy46G1PjGkw46VPHizM6GdnXWS', '{"platform":1,"assist_type":101,"encode_uid":"b3ecf02afed3dcd05a5e11bc24f6b11d","is_old_player":false,"token":"' + token + '"}');
            $.http.post(option).then(response => {
                let data = JSON.parse(response.body);
                console.log('\n【助力】:' + data.data.assist_status);
                resolve();
            })

        } catch (error) {
            console.log('\n【助力】:' + error);
            resolve();
        }

    })
}

//领取助力奖励
async function recDailyReward() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://game.xiaojukeji.com/api/game/plant/recDailyReward?wsgsig=dd03-Pvs4yx88TSQajRp7kOizqZfJzLJfmob1mSpomH0MzLJgjQW9UHGvsZN5owQgj4p3%2FLRnrPf3pxXdVNtGnxWvnZy4pL8EioRDrObvnwJ1pIjDjNWMqMuxmIG6p5O', '{"assist_pid":140749163,"platform":1,"token":"' + token + '"}');
            $.http.post(option).then(response => {
                let data = JSON.parse(response.body);
                console.log('\n【领取助力奖励】:' + response.body);
                resolve();
            })

        } catch (error) {
            console.log('\n【领取助力奖励】:' + error);
            resolve();
        }

    })
}


function urlTask(url, body) {
    let option = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.1.18 FusionKit/1.2.20 OffMode/0',
            'Referer': 'https://fine.diditaxi.com.cn/',
            'Origin': 'https://fine.diditaxi.com.cn',
            'Connection': 'keep-alive',
            'Accept-Language': 'zh-cn',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    };
    return option;
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/
