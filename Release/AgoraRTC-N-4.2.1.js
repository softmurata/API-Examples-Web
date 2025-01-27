/**
 * AgoraWebSDK_N-v4.2.1-0-gf505b57 Copyright AgoraInc.
 */

/*
 Determine if an object is a Buffer

 @author   Feross Aboukhadijeh <https://feross.org>
 @license  MIT
 *****************************************************************************
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
*****************************************************************************/
"use strict";
!(function (Oa, Kb) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = Kb())
    : "function" == typeof define && define.amd
    ? define(Kb)
    : ((Oa =
        "undefined" != typeof globalThis ? globalThis : Oa || self).AgoraRTC =
        Kb());
})(this, function () {
  function Oa(c, a, b) {
    return (
      c(
        (b = {
          path: a,
          exports: {},
          require: function (a, b) {
            throw Error(
              "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
            );
          },
        }),
        b.exports
      ),
      b.exports
    );
  }
  function Kb(c, a, b) {
    return (c = c.match(a)) && c.length >= b && R(c[b], 10);
  }
  function tc(c, a, b) {
    if (c.RTCPeerConnection) {
      c = c.RTCPeerConnection.prototype;
      var d = c.addEventListener;
      c.addEventListener = function (c, e) {
        if (c !== a) return d.apply(this, arguments);
        let f = (a) => {
          (a = b(a)) && e(a);
        };
        return (
          (this._eventMap = this._eventMap || {}),
          (this._eventMap[e] = f),
          d.apply(this, [c, f])
        );
      };
      var e = c.removeEventListener;
      c.removeEventListener = function (b, d) {
        if (b !== a || !this._eventMap || !this._eventMap[d])
          return e.apply(this, arguments);
        let c = this._eventMap[d];
        return delete this._eventMap[d], e.apply(this, [b, c]);
      };
      ba(c, "on" + a, {
        get() {
          return this["_on" + a];
        },
        set(b) {
          this["_on" + a] &&
            (this.removeEventListener(a, this["_on" + a]),
            delete this["_on" + a]);
          b && this.addEventListener(a, (this["_on" + a] = b));
        },
        enumerable: !0,
        configurable: !0,
      });
    }
  }
  function ql(c) {
    return "boolean" != typeof c
      ? Error("Argument type: " + typeof c + ". Please use a boolean.")
      : ((yg = c),
        c ? "adapter.js logging disabled" : "adapter.js logging enabled");
  }
  function rl(c) {
    return "boolean" != typeof c
      ? Error("Argument type: " + typeof c + ". Please use a boolean.")
      : ((zg = !c),
        "adapter.js deprecation warnings " + (c ? "disabled" : "enabled"));
  }
  function pb() {
    "object" != typeof window ||
      yg ||
      ("undefined" != typeof console &&
        "function" == typeof console.log &&
        console.log.apply(console, arguments));
  }
  function Bd(c, a) {
    zg && console.warn(c + " is deprecated, please use " + a + " instead.");
  }
  function Lb(c) {
    let { navigator: a } = c,
      b = { browser: null, version: null };
    if (void 0 === c || !c.navigator) return (b.browser = "Not a browser."), b;
    if (a.mozGetUserMedia)
      (b.browser = "firefox"),
        (b.version = Kb(a.userAgent, /Firefox\/(\d+)\./, 1));
    else if (
      a.webkitGetUserMedia ||
      (!1 === c.isSecureContext &&
        c.webkitRTCPeerConnection &&
        !c.RTCIceGatherer)
    )
      (b.browser = "chrome"),
        (b.version = Kb(a.userAgent, /Chrom(e|ium)\/(\d+)\./, 2));
    else if (a.mediaDevices && a.userAgent.match(/Edge\/(\d+).(\d+)$/))
      (b.browser = "edge"),
        (b.version = Kb(a.userAgent, /Edge\/(\d+).(\d+)$/, 2));
    else {
      if (!c.RTCPeerConnection || !a.userAgent.match(/AppleWebKit\/(\d+)\./))
        return (b.browser = "Not a supported browser."), b;
      b.browser = "safari";
      b.version = Kb(a.userAgent, /AppleWebKit\/(\d+)\./, 1);
      b.supportsUnifiedPlan =
        c.RTCRtpTransceiver &&
        "currentDirection" in c.RTCRtpTransceiver.prototype;
    }
    return b;
  }
  function Ag(c) {
    var a;
    return "[object Object]" === Object.prototype.toString.call(c)
      ? Ae((a = S(c))).call(
          a,
          function (a, d) {
            var b = "[object Object]" === Object.prototype.toString.call(c[d]);
            let f = b ? Ag(c[d]) : c[d];
            b = b && !S(f).length;
            return void 0 === f || b ? a : ab(a, { [d]: f });
          },
          {}
        )
      : c;
  }
  function Be(c, a, b) {
    var d;
    a &&
      !b.has(a.id) &&
      (b.set(a.id, a),
      r((d = S(a))).call(d, (d) => {
        if (Bg(d).call(d, "Id")) Be(c, c.get(a[d]), b);
        else if (Bg(d).call(d, "Ids")) {
          var e;
          r((e = a[d])).call(e, (a) => {
            Be(c, c.get(a), b);
          });
        }
      }));
  }
  function Cg(c, a, b) {
    let d = b ? "outbound-rtp" : "inbound-rtp",
      e = new Z();
    if (null === a) return e;
    let f = [];
    return (
      r(c).call(c, (b) => {
        "track" === b.type && b.trackIdentifier === a.id && f.push(b);
      }),
      r(f).call(f, (a) => {
        r(c).call(c, (b) => {
          b.type === d && b.trackId === a.id && Be(c, b, e);
        });
      }),
      e
    );
  }
  function Dg(c) {
    let a = c && c.navigator;
    if (a.mediaDevices) {
      var b = Lb(c),
        d = function (a) {
          var b;
          if ("object" != typeof a || a.mandatory || a.optional) return a;
          const d = {};
          var c;
          (r((b = S(a))).call(b, (b) => {
            if ("require" !== b && "advanced" !== b && "mediaSource" !== b) {
              var c = "object" == typeof a[b] ? a[b] : { ideal: a[b] };
              void 0 !== c.exact &&
                "number" == typeof c.exact &&
                (c.min = c.max = c.exact);
              var e = function (a, b) {
                return a
                  ? a + b.charAt(0).toUpperCase() + zb(b).call(b, 1)
                  : "deviceId" === b
                  ? "sourceId"
                  : b;
              };
              if (void 0 !== c.ideal) {
                d.optional = d.optional || [];
                let a = {};
                "number" == typeof c.ideal
                  ? ((a[e("min", b)] = c.ideal),
                    d.optional.push(a),
                    (a = {}),
                    (a[e("max", b)] = c.ideal),
                    d.optional.push(a))
                  : ((a[e("", b)] = c.ideal), d.optional.push(a));
              }
              var f;
              void 0 !== c.exact && "number" != typeof c.exact
                ? ((d.mandatory = d.mandatory || {}),
                  (d.mandatory[e("", b)] = c.exact))
                : r((f = ["min", "max"])).call(f, (a) => {
                    void 0 !== c[a] &&
                      ((d.mandatory = d.mandatory || {}),
                      (d.mandatory[e(a, b)] = c[a]));
                  });
            }
          }),
          a.advanced) &&
            (d.optional = n((c = d.optional || [])).call(c, a.advanced));
          return d;
        },
        e = function (c, e) {
          if (61 <= b.version) return e(c);
          if ((c = JSON.parse(z(c))) && "object" == typeof c.audio) {
            var f = function (a, b, c) {
              b in a && !(c in a) && ((a[c] = a[b]), delete a[b]);
            };
            f(
              (c = JSON.parse(z(c))).audio,
              "autoGainControl",
              "googAutoGainControl"
            );
            f(c.audio, "noiseSuppression", "googNoiseSuppression");
            c.audio = d(c.audio);
          }
          if (c && "object" == typeof c.video) {
            let g = c.video.facingMode;
            g = g && ("object" == typeof g ? g : { ideal: g });
            f = 66 > b.version;
            if (
              !(
                !g ||
                ("user" !== g.exact &&
                  "environment" !== g.exact &&
                  "user" !== g.ideal &&
                  "environment" !== g.ideal) ||
                (a.mediaDevices.getSupportedConstraints &&
                  a.mediaDevices.getSupportedConstraints().facingMode &&
                  !f)
              )
            ) {
              let b;
              if (
                (delete c.video.facingMode,
                "environment" === g.exact || "environment" === g.ideal
                  ? (b = ["back", "rear"])
                  : ("user" !== g.exact && "user" !== g.ideal) ||
                    (b = ["front"]),
                b)
              )
                return a.mediaDevices.enumerateDevices().then((a) => {
                  a = O(a).call(a, (a) => "videoinput" === a.kind);
                  let f = U(a).call(a, (a) =>
                    Fg(b).call(b, (b) => {
                      var c;
                      return Aa((c = a.label.toLowerCase())).call(c, b);
                    })
                  );
                  return (
                    !f &&
                      a.length &&
                      Aa(b).call(b, "back") &&
                      (f = a[a.length - 1]),
                    f &&
                      (c.video.deviceId = g.exact
                        ? { exact: f.deviceId }
                        : { ideal: f.deviceId }),
                    (c.video = d(c.video)),
                    Gg("chrome: " + z(c)),
                    e(c)
                  );
                });
            }
            c.video = d(c.video);
          }
          return Gg("chrome: " + z(c)), e(c);
        },
        f = function (a) {
          return 64 <= b.version
            ? a
            : {
                name:
                  {
                    PermissionDeniedError: "NotAllowedError",
                    PermissionDismissedError: "NotAllowedError",
                    InvalidStateError: "NotAllowedError",
                    DevicesNotFoundError: "NotFoundError",
                    ConstraintNotSatisfiedError: "OverconstrainedError",
                    TrackStartError: "NotReadableError",
                    MediaDeviceFailedDueToShutdown: "NotAllowedError",
                    MediaDeviceKillSwitchOn: "NotAllowedError",
                    TabCaptureError: "AbortError",
                    ScreenCaptureError: "AbortError",
                    DeviceCaptureError: "AbortError",
                  }[a.name] || a.name,
                message: a.message,
                constraint: a.constraint || a.constraintName,
                toString() {
                  return this.name + (this.message && ": ") + this.message;
                },
              };
        };
      c = function (b, c, d) {
        e(b, (b) => {
          a.webkitGetUserMedia(b, c, (a) => {
            d && d(f(a));
          });
        });
      };
      if (((a.getUserMedia = Ba(c).call(c, a)), a.mediaDevices.getUserMedia)) {
        var g;
        let b = Ba((g = a.mediaDevices.getUserMedia)).call(g, a.mediaDevices);
        a.mediaDevices.getUserMedia = function (a) {
          return e(a, (a) =>
            b(a).then(
              (b) => {
                var c;
                if (
                  (a.audio && !b.getAudioTracks().length) ||
                  (a.video && !b.getVideoTracks().length)
                )
                  throw (
                    (r((c = b.getTracks())).call(c, (a) => {
                      a.stop();
                    }),
                    new DOMException("", "NotFoundError"))
                  );
                return b;
              },
              (a) => u.reject(f(a))
            )
          );
        };
      }
    }
  }
  function Hg(c) {
    c.MediaStream = c.MediaStream || c.webkitMediaStream;
  }
  function Ig(c) {
    if (
      "object" != typeof c ||
      !c.RTCPeerConnection ||
      "ontrack" in c.RTCPeerConnection.prototype
    )
      tc(
        c,
        "track",
        (a) => (
          a.transceiver ||
            ba(a, "transceiver", { value: { receiver: a.receiver } }),
          a
        )
      );
    else {
      ba(c.RTCPeerConnection.prototype, "ontrack", {
        get() {
          return this._ontrack;
        },
        set(a) {
          this._ontrack && this.removeEventListener("track", this._ontrack);
          this.addEventListener("track", (this._ontrack = a));
        },
        enumerable: !0,
        configurable: !0,
      });
      let a = c.RTCPeerConnection.prototype.setRemoteDescription;
      c.RTCPeerConnection.prototype.setRemoteDescription = function () {
        return (
          this._ontrackpoly ||
            ((this._ontrackpoly = (a) => {
              var b;
              a.stream.addEventListener("addtrack", (b) => {
                let d;
                var e;
                c.RTCPeerConnection.prototype.getReceivers
                  ? (d = U((e = this.getReceivers())).call(
                      e,
                      (a) => a.track && a.track.id === b.track.id
                    ))
                  : (d = { track: b.track });
                e = new Event("track");
                e.track = b.track;
                e.receiver = d;
                e.transceiver = { receiver: d };
                e.streams = [a.stream];
                this.dispatchEvent(e);
              });
              r((b = a.stream.getTracks())).call(b, (b) => {
                let d;
                var e;
                c.RTCPeerConnection.prototype.getReceivers
                  ? (d = U((e = this.getReceivers())).call(
                      e,
                      (a) => a.track && a.track.id === b.id
                    ))
                  : (d = { track: b });
                e = new Event("track");
                e.track = b;
                e.receiver = d;
                e.transceiver = { receiver: d };
                e.streams = [a.stream];
                this.dispatchEvent(e);
              });
            }),
            this.addEventListener("addstream", this._ontrackpoly)),
          a.apply(this, arguments)
        );
      };
    }
  }
  function Jg(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      !("getSenders" in c.RTCPeerConnection.prototype) &&
      "createDTMFSender" in c.RTCPeerConnection.prototype
    ) {
      let a = function (a, b) {
        return {
          track: b,
          get dtmf() {
            return (
              void 0 === this._dtmf &&
                ("audio" === b.kind
                  ? (this._dtmf = a.createDTMFSender(b))
                  : (this._dtmf = null)),
              this._dtmf
            );
          },
          _pc: a,
        };
      };
      if (!c.RTCPeerConnection.prototype.getSenders) {
        c.RTCPeerConnection.prototype.getSenders = function () {
          var a;
          return (
            (this._senders = this._senders || []),
            zb((a = this._senders)).call(a)
          );
        };
        let b = c.RTCPeerConnection.prototype.addTrack;
        c.RTCPeerConnection.prototype.addTrack = function (c, d) {
          let e = b.apply(this, arguments);
          return e || ((e = a(this, c)), this._senders.push(e)), e;
        };
        let d = c.RTCPeerConnection.prototype.removeTrack;
        c.RTCPeerConnection.prototype.removeTrack = function (a) {
          var b;
          d.apply(this, arguments);
          let c = E((b = this._senders)).call(b, a);
          var e;
          -1 !== c && Ja((e = this._senders)).call(e, c, 1);
        };
      }
      let b = c.RTCPeerConnection.prototype.addStream;
      c.RTCPeerConnection.prototype.addStream = function (c) {
        var d;
        this._senders = this._senders || [];
        b.apply(this, [c]);
        r((d = c.getTracks())).call(d, (b) => {
          this._senders.push(a(this, b));
        });
      };
      let d = c.RTCPeerConnection.prototype.removeStream;
      c.RTCPeerConnection.prototype.removeStream = function (a) {
        var b;
        this._senders = this._senders || [];
        d.apply(this, [a]);
        r((b = a.getTracks())).call(b, (a) => {
          var b;
          let c = U((b = this._senders)).call(b, (b) => b.track === a);
          var d, e;
          c &&
            Ja((d = this._senders)).call(
              d,
              E((e = this._senders)).call(e, c),
              1
            );
        });
      };
    } else if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      "getSenders" in c.RTCPeerConnection.prototype &&
      "createDTMFSender" in c.RTCPeerConnection.prototype &&
      c.RTCRtpSender &&
      !("dtmf" in c.RTCRtpSender.prototype)
    ) {
      let a = c.RTCPeerConnection.prototype.getSenders;
      c.RTCPeerConnection.prototype.getSenders = function () {
        let b = a.apply(this, []);
        return r(b).call(b, (a) => (a._pc = this)), b;
      };
      ba(c.RTCRtpSender.prototype, "dtmf", {
        get() {
          return (
            void 0 === this._dtmf &&
              ("audio" === this.track.kind
                ? (this._dtmf = this._pc.createDTMFSender(this.track))
                : (this._dtmf = null)),
            this._dtmf
          );
        },
      });
    }
  }
  function Kg(c) {
    if (c.RTCPeerConnection) {
      var a = c.RTCPeerConnection.prototype.getStats;
      c.RTCPeerConnection.prototype.getStats = function () {
        let [b, c, e] = arguments;
        if (0 < arguments.length && "function" == typeof b)
          return a.apply(this, arguments);
        if (
          0 === a.length &&
          (0 === arguments.length || "function" != typeof b)
        )
          return a.apply(this, []);
        let f = function (a) {
            const b = {};
            a = a.result();
            return (
              r(a).call(a, (a) => {
                var c;
                const d = {
                  id: a.id,
                  timestamp: a.timestamp,
                  type:
                    {
                      localcandidate: "local-candidate",
                      remotecandidate: "remote-candidate",
                    }[a.type] || a.type,
                };
                r((c = a.names())).call(c, (b) => {
                  d[b] = a.stat(b);
                });
                b[d.id] = d;
              }),
              b
            );
          },
          g = function (a) {
            var b;
            return new Z(A((b = S(a))).call(b, (b) => [b, a[b]]));
          };
        return 2 <= arguments.length
          ? a.apply(this, [
              function (a) {
                c(g(f(a)));
              },
              b,
            ])
          : new u((b, c) => {
              a.apply(this, [
                function (a) {
                  b(g(f(a)));
                },
                c,
              ]);
            }).then(c, e);
      };
    }
  }
  function Lg(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      c.RTCRtpSender &&
      c.RTCRtpReceiver
    ) {
      if (!("getStats" in c.RTCRtpSender.prototype)) {
        let a = c.RTCPeerConnection.prototype.getSenders;
        a &&
          (c.RTCPeerConnection.prototype.getSenders = function () {
            let b = a.apply(this, []);
            return r(b).call(b, (a) => (a._pc = this)), b;
          });
        let d = c.RTCPeerConnection.prototype.addTrack;
        d &&
          (c.RTCPeerConnection.prototype.addTrack = function () {
            let a = d.apply(this, arguments);
            return (a._pc = this), a;
          });
        c.RTCRtpSender.prototype.getStats = function () {
          let a = this;
          return this._pc.getStats().then((b) => Cg(b, a.track, !0));
        };
      }
      if (!("getStats" in c.RTCRtpReceiver.prototype)) {
        let a = c.RTCPeerConnection.prototype.getReceivers;
        a &&
          (c.RTCPeerConnection.prototype.getReceivers = function () {
            let b = a.apply(this, []);
            return r(b).call(b, (a) => (a._pc = this)), b;
          });
        tc(c, "track", (a) => ((a.receiver._pc = a.srcElement), a));
        c.RTCRtpReceiver.prototype.getStats = function () {
          let a = this;
          return this._pc.getStats().then((b) => Cg(b, a.track, !1));
        };
      }
      if (
        "getStats" in c.RTCRtpSender.prototype &&
        "getStats" in c.RTCRtpReceiver.prototype
      ) {
        var a = c.RTCPeerConnection.prototype.getStats;
        c.RTCPeerConnection.prototype.getStats = function () {
          if (
            0 < arguments.length &&
            arguments[0] instanceof c.MediaStreamTrack
          ) {
            var b, d;
            let a = arguments[0],
              c,
              g,
              k;
            return (
              r((b = this.getSenders())).call(b, (b) => {
                b.track === a && (c ? (k = !0) : (c = b));
              }),
              r((d = this.getReceivers())).call(
                d,
                (b) => (
                  b.track === a && (g ? (k = !0) : (g = b)), b.track === a
                )
              ),
              k || (c && g)
                ? u.reject(
                    new DOMException(
                      "There are more than one sender or receiver for the track.",
                      "InvalidAccessError"
                    )
                  )
                : c
                ? c.getStats()
                : g
                ? g.getStats()
                : u.reject(
                    new DOMException(
                      "There is no sender or receiver for the track.",
                      "InvalidAccessError"
                    )
                  )
            );
          }
          return a.apply(this, arguments);
        };
      }
    }
  }
  function Mg(c) {
    c.RTCPeerConnection.prototype.getLocalStreams = function () {
      var a;
      return (
        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
        A((a = S(this._shimmedLocalStreams))).call(
          a,
          (a) => this._shimmedLocalStreams[a][0]
        )
      );
    };
    let a = c.RTCPeerConnection.prototype.addTrack;
    c.RTCPeerConnection.prototype.addTrack = function (b, c) {
      var d;
      if (!c) return a.apply(this, arguments);
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      let e = a.apply(this, arguments);
      return (
        this._shimmedLocalStreams[c.id]
          ? -1 === E((d = this._shimmedLocalStreams[c.id])).call(d, e) &&
            this._shimmedLocalStreams[c.id].push(e)
          : (this._shimmedLocalStreams[c.id] = [c, e]),
        e
      );
    };
    let b = c.RTCPeerConnection.prototype.addStream;
    c.RTCPeerConnection.prototype.addStream = function (a) {
      var c, d, e;
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      r((c = a.getTracks())).call(c, (a) => {
        var b;
        if (U((b = this.getSenders())).call(b, (b) => b.track === a))
          throw new DOMException("Track already exists.", "InvalidAccessError");
      });
      let f = this.getSenders();
      b.apply(this, arguments);
      c = O((d = this.getSenders())).call(d, (a) => -1 === E(f).call(f, a));
      this._shimmedLocalStreams[a.id] = n((e = [a])).call(e, c);
    };
    let d = c.RTCPeerConnection.prototype.removeStream;
    c.RTCPeerConnection.prototype.removeStream = function (a) {
      return (
        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
        delete this._shimmedLocalStreams[a.id],
        d.apply(this, arguments)
      );
    };
    let e = c.RTCPeerConnection.prototype.removeTrack;
    c.RTCPeerConnection.prototype.removeTrack = function (a) {
      var b;
      ((this._shimmedLocalStreams = this._shimmedLocalStreams || {}), a) &&
        r((b = S(this._shimmedLocalStreams))).call(b, (b) => {
          var c;
          let d = E((c = this._shimmedLocalStreams[b])).call(c, a);
          var e;
          -1 !== d && Ja((e = this._shimmedLocalStreams[b])).call(e, d, 1);
          1 === this._shimmedLocalStreams[b].length &&
            delete this._shimmedLocalStreams[b];
        });
      return e.apply(this, arguments);
    };
  }
  function Ng(c) {
    function a(a, b) {
      var c;
      let d = b.sdp;
      return (
        r((c = S(a._reverseStreams || []))).call(c, (b) => {
          b = a._reverseStreams[b];
          d = d.replace(new RegExp(a._streams[b.id].id, "g"), b.id);
        }),
        new RTCSessionDescription({ type: b.type, sdp: d })
      );
    }
    function b(a, b) {
      var c;
      let d = b.sdp;
      return (
        r((c = S(a._reverseStreams || []))).call(c, (b) => {
          b = a._reverseStreams[b];
          d = d.replace(new RegExp(b.id, "g"), a._streams[b.id].id);
        }),
        new RTCSessionDescription({ type: b.type, sdp: d })
      );
    }
    var d;
    if (c.RTCPeerConnection) {
      var e = Lb(c);
      if (c.RTCPeerConnection.prototype.addTrack && 65 <= e.version)
        return Mg(c);
      var f = c.RTCPeerConnection.prototype.getLocalStreams;
      c.RTCPeerConnection.prototype.getLocalStreams = function () {
        let a = f.apply(this);
        return (
          (this._reverseStreams = this._reverseStreams || {}),
          A(a).call(a, (a) => this._reverseStreams[a.id])
        );
      };
      var g = c.RTCPeerConnection.prototype.addStream;
      c.RTCPeerConnection.prototype.addStream = function (a) {
        var b;
        ((this._streams = this._streams || {}),
        (this._reverseStreams = this._reverseStreams || {}),
        r((b = a.getTracks())).call(b, (a) => {
          var b;
          if (U((b = this.getSenders())).call(b, (b) => b.track === a))
            throw new DOMException(
              "Track already exists.",
              "InvalidAccessError"
            );
        }),
        this._reverseStreams[a.id]) ||
          ((b = new c.MediaStream(a.getTracks())),
          (this._streams[a.id] = b),
          (this._reverseStreams[b.id] = a),
          (a = b));
        g.apply(this, [a]);
      };
      var k = c.RTCPeerConnection.prototype.removeStream;
      c.RTCPeerConnection.prototype.removeStream = function (a) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        k.apply(this, [this._streams[a.id] || a]);
        delete this._reverseStreams[
          this._streams[a.id] ? this._streams[a.id].id : a.id
        ];
        delete this._streams[a.id];
      };
      c.RTCPeerConnection.prototype.addTrack = function (a, b) {
        var d, e, f;
        if ("closed" === this.signalingState)
          throw new DOMException(
            "The RTCPeerConnection's signalingState is 'closed'.",
            "InvalidStateError"
          );
        let g = zb([]).call(arguments, 1);
        if (
          1 !== g.length ||
          !U((d = g[0].getTracks())).call(d, (b) => b === a)
        )
          throw new DOMException(
            "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
            "NotSupportedError"
          );
        if (U((e = this.getSenders())).call(e, (b) => b.track === a))
          throw new DOMException("Track already exists.", "InvalidAccessError");
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        (d = this._streams[b.id])
          ? (d.addTrack(a),
            u.resolve().then(() => {
              this.dispatchEvent(new Event("negotiationneeded"));
            }))
          : ((d = new c.MediaStream([a])),
            (this._streams[b.id] = d),
            (this._reverseStreams[d.id] = b),
            this.addStream(d));
        return U((f = this.getSenders())).call(f, (b) => b.track === a);
      };
      r((d = ["createOffer", "createAnswer"])).call(d, function (b) {
        let d = c.RTCPeerConnection.prototype[b];
        c.RTCPeerConnection.prototype[b] = {
          [b]() {
            const b = arguments;
            return arguments.length && "function" == typeof arguments[0]
              ? d.apply(this, [
                  (c) => {
                    c = a(this, c);
                    b[0].apply(null, [c]);
                  },
                  (a) => {
                    b[1] && b[1].apply(null, a);
                  },
                  arguments[2],
                ])
              : d.apply(this, arguments).then((b) => a(this, b));
          },
        }[b];
      });
      var q = c.RTCPeerConnection.prototype.setLocalDescription;
      c.RTCPeerConnection.prototype.setLocalDescription = function () {
        return arguments.length && arguments[0].type
          ? ((arguments[0] = b(this, arguments[0])), q.apply(this, arguments))
          : q.apply(this, arguments);
      };
      var B = da(c.RTCPeerConnection.prototype, "localDescription");
      ba(c.RTCPeerConnection.prototype, "localDescription", {
        get() {
          let b = B.get.apply(this);
          return "" === b.type ? b : a(this, b);
        },
      });
      c.RTCPeerConnection.prototype.removeTrack = function (a) {
        var b;
        if ("closed" === this.signalingState)
          throw new DOMException(
            "The RTCPeerConnection's signalingState is 'closed'.",
            "InvalidStateError"
          );
        if (!a._pc)
          throw new DOMException(
            "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
            "TypeError"
          );
        if (a._pc !== this)
          throw new DOMException(
            "Sender was not created by this connection.",
            "InvalidAccessError"
          );
        let c;
        this._streams = this._streams || {};
        r((b = S(this._streams))).call(b, (b) => {
          var d;
          U((d = this._streams[b].getTracks())).call(d, (b) => a.track === b) &&
            (c = this._streams[b]);
        });
        c &&
          (1 === c.getTracks().length
            ? this.removeStream(this._reverseStreams[c.id])
            : c.removeTrack(a.track),
          this.dispatchEvent(new Event("negotiationneeded")));
      };
    }
  }
  function Ce(c) {
    let a = Lb(c);
    if (
      (!c.RTCPeerConnection &&
        c.webkitRTCPeerConnection &&
        (c.RTCPeerConnection = c.webkitRTCPeerConnection),
      c.RTCPeerConnection)
    ) {
      var b;
      53 > a.version &&
        r(
          (b = [
            "setLocalDescription",
            "setRemoteDescription",
            "addIceCandidate",
          ])
        ).call(b, function (a) {
          let b = c.RTCPeerConnection.prototype[a];
          c.RTCPeerConnection.prototype[a] = {
            [a]() {
              return (
                (arguments[0] = new (
                  "addIceCandidate" === a
                    ? c.RTCIceCandidate
                    : c.RTCSessionDescription
                )(arguments[0])),
                b.apply(this, arguments)
              );
            },
          }[a];
        });
      var d = c.RTCPeerConnection.prototype.addIceCandidate;
      c.RTCPeerConnection.prototype.addIceCandidate = function () {
        return arguments[0]
          ? 78 > a.version && arguments[0] && "" === arguments[0].candidate
            ? u.resolve()
            : d.apply(this, arguments)
          : (arguments[1] && arguments[1].apply(null), u.resolve());
      };
    }
  }
  function Og(c) {
    tc(c, "negotiationneeded", (a) => {
      if ("stable" === a.target.signalingState) return a;
    });
  }
  function sl(c, a) {
    let b = !1;
    return (
      (c = JSON.parse(z(c))),
      O(c).call(c, (a) => {
        if (a && (a.urls || a.url)) {
          var c = a.urls || a.url;
          a.url && !a.urls && Bd("RTCIceServer.url", "RTCIceServer.urls");
          let d = "string" == typeof c;
          return (
            d && (c = [c]),
            (c = O(c).call(c, (a) =>
              0 === E(a).call(a, "stun:")
                ? !1
                : (a =
                    Cd(a).call(a, "turn") &&
                    !Cd(a).call(a, "turn:[") &&
                    Aa(a).call(a, "transport=udp")) && !b
                ? ((b = !0), !0)
                : a && !b
            )),
            delete a.url,
            (a.urls = d ? c[0] : c),
            !!c.length
          );
        }
      })
    );
  }
  function Pg(c, a, b, d, e) {
    a = F.writeRtpDescription(c.kind, a);
    if (
      ((a += F.writeIceParameters(c.iceGatherer.getLocalParameters())),
      (a += F.writeDtlsParameters(
        c.dtlsTransport.getLocalParameters(),
        "offer" === b ? "actpass" : e || "active"
      )),
      (a += "a=mid:" + c.mid + "\r\n"),
      c.rtpSender && c.rtpReceiver
        ? (a += "a=sendrecv\r\n")
        : c.rtpSender
        ? (a += "a=sendonly\r\n")
        : c.rtpReceiver
        ? (a += "a=recvonly\r\n")
        : (a += "a=inactive\r\n"),
      c.rtpSender)
    )
      (b = c.rtpSender._initialTrackId || c.rtpSender.track.id),
        (c.rtpSender._initialTrackId = b),
        (d = "msid:" + (d ? d.id : "-") + " " + b + "\r\n"),
        (a =
          a +
          ("a=" + d) +
          ("a=ssrc:" + c.sendEncodingParameters[0].ssrc + " " + d)),
        c.sendEncodingParameters[0].rtx &&
          ((a += "a=ssrc:" + c.sendEncodingParameters[0].rtx.ssrc + " " + d),
          (a +=
            "a=ssrc-group:FID " +
            c.sendEncodingParameters[0].ssrc +
            " " +
            c.sendEncodingParameters[0].rtx.ssrc +
            "\r\n"));
    return (
      (a +=
        "a=ssrc:" +
        c.sendEncodingParameters[0].ssrc +
        " cname:" +
        F.localCName +
        "\r\n"),
      c.rtpSender &&
        c.sendEncodingParameters[0].rtx &&
        (a +=
          "a=ssrc:" +
          c.sendEncodingParameters[0].rtx.ssrc +
          " cname:" +
          F.localCName +
          "\r\n"),
      a
    );
  }
  function tl(c, a) {
    var b = !1;
    return (c = JSON.parse(JSON.stringify(c))).filter(function (c) {
      if (c && (c.urls || c.url)) {
        var d = c.urls || c.url;
        c.url &&
          !c.urls &&
          console.warn("RTCIceServer.url is deprecated! Use urls instead.");
        var f = "string" == typeof d;
        return (
          f && (d = [d]),
          (d = d.filter(function (c) {
            return 0 !== c.indexOf("turn:") ||
              -1 === c.indexOf("transport=udp") ||
              -1 !== c.indexOf("turn:[") ||
              b
              ? 0 === c.indexOf("stun:") &&
                  14393 <= a &&
                  -1 === c.indexOf("?transport=udp")
              : ((b = !0), !0);
          })),
          delete c.url,
          (c.urls = f ? d[0] : d),
          !!d.length
        );
      }
    });
  }
  function Dd(c, a) {
    var b = { codecs: [], headerExtensions: [], fecMechanisms: [] },
      d = function (a, b) {
        a = parseInt(a, 10);
        for (var c = 0; c < b.length; c++)
          if (b[c].payloadType === a || b[c].preferredPayloadType === a)
            return b[c];
      },
      e = function (a, b, c, e) {
        a = d(a.parameters.apt, c);
        b = d(b.parameters.apt, e);
        return a && b && a.name.toLowerCase() === b.name.toLowerCase();
      };
    return (
      c.codecs.forEach(function (d) {
        for (var f = 0; f < a.codecs.length; f++) {
          var k = a.codecs[f];
          if (
            d.name.toLowerCase() === k.name.toLowerCase() &&
            d.clockRate === k.clockRate &&
            ("rtx" !== d.name.toLowerCase() ||
              !d.parameters ||
              !k.parameters.apt ||
              e(d, k, c.codecs, a.codecs))
          ) {
            (k = JSON.parse(JSON.stringify(k))).numChannels = Math.min(
              d.numChannels,
              k.numChannels
            );
            b.codecs.push(k);
            k.rtcpFeedback = k.rtcpFeedback.filter(function (a) {
              for (var b = 0; b < d.rtcpFeedback.length; b++)
                if (
                  d.rtcpFeedback[b].type === a.type &&
                  d.rtcpFeedback[b].parameter === a.parameter
                )
                  return !0;
              return !1;
            });
            break;
          }
        }
      }),
      c.headerExtensions.forEach(function (c) {
        for (var d = 0; d < a.headerExtensions.length; d++) {
          var e = a.headerExtensions[d];
          if (c.uri === e.uri) {
            b.headerExtensions.push(e);
            break;
          }
        }
      }),
      b
    );
  }
  function Qg(c, a, b) {
    return (
      -1 !==
      {
        offer: {
          setLocalDescription: ["stable", "have-local-offer"],
          setRemoteDescription: ["stable", "have-remote-offer"],
        },
        answer: {
          setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
          setRemoteDescription: ["have-local-offer", "have-remote-pranswer"],
        },
      }[a][c].indexOf(b)
    );
  }
  function De(c, a) {
    var b = c.getRemoteCandidates().find(function (b) {
      return (
        a.foundation === b.foundation &&
        a.ip === b.ip &&
        a.port === b.port &&
        a.priority === b.priority &&
        a.protocol === b.protocol &&
        a.type === b.type
      );
    });
    return b || c.addRemoteCandidate(a), !b;
  }
  function Ka(c, a) {
    a = Error(a);
    return (
      (a.name = c),
      (a.code = {
        NotSupportedError: 9,
        InvalidStateError: 11,
        InvalidAccessError: 15,
        TypeError: void 0,
        OperationError: void 0,
      }[c]),
      a
    );
  }
  function Rg(c) {
    var a;
    c = c && c.navigator;
    let b = Ba((a = c.mediaDevices.getUserMedia)).call(a, c.mediaDevices);
    c.mediaDevices.getUserMedia = function (a) {
      return b(a).catch((a) =>
        u.reject(
          (function (a) {
            return {
              name:
                { PermissionDeniedError: "NotAllowedError" }[a.name] || a.name,
              message: a.message,
              constraint: a.constraint,
              toString() {
                return this.name;
              },
            };
          })(a)
        )
      );
    };
  }
  function Sg(c) {
    var a;
    "getDisplayMedia" in c.navigator &&
      c.navigator.mediaDevices &&
      ((c.navigator.mediaDevices &&
        "getDisplayMedia" in c.navigator.mediaDevices) ||
        (c.navigator.mediaDevices.getDisplayMedia = Ba(
          (a = c.navigator.getDisplayMedia)
        ).call(a, c.navigator)));
  }
  function Ee(c) {
    let a = Lb(c);
    if (
      c.RTCIceGatherer &&
      (c.RTCIceCandidate ||
        (c.RTCIceCandidate = function (a) {
          return a;
        }),
      c.RTCSessionDescription ||
        (c.RTCSessionDescription = function (a) {
          return a;
        }),
      15025 > a.version)
    ) {
      let a = da(c.MediaStreamTrack.prototype, "enabled");
      ba(c.MediaStreamTrack.prototype, "enabled", {
        set(b) {
          a.set.call(this, b);
          let c = new Event("enabled");
          c.enabled = b;
          this.dispatchEvent(c);
        },
      });
    }
    !c.RTCRtpSender ||
      "dtmf" in c.RTCRtpSender.prototype ||
      ba(c.RTCRtpSender.prototype, "dtmf", {
        get() {
          return (
            void 0 === this._dtmf &&
              ("audio" === this.track.kind
                ? (this._dtmf = new c.RTCDtmfSender(this))
                : "video" === this.track.kind && (this._dtmf = null)),
            this._dtmf
          );
        },
      });
    c.RTCDtmfSender && !c.RTCDTMFSender && (c.RTCDTMFSender = c.RTCDtmfSender);
    let b = ul(c, a.version);
    c.RTCPeerConnection = function (c) {
      return (
        c &&
          c.iceServers &&
          ((c.iceServers = sl(c.iceServers, a.version)),
          pb("ICE servers after filtering:", c.iceServers)),
        new b(c)
      );
    };
    c.RTCPeerConnection.prototype = b.prototype;
  }
  function Tg(c) {
    !c.RTCRtpSender ||
      "replaceTrack" in c.RTCRtpSender.prototype ||
      (c.RTCRtpSender.prototype.replaceTrack =
        c.RTCRtpSender.prototype.setTrack);
  }
  function Ug(c) {
    let a = Lb(c),
      b = c && c.navigator;
    c = c && c.MediaStreamTrack;
    if (
      ((b.getUserMedia = function (a, c, d) {
        Bd("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
        b.mediaDevices.getUserMedia(a).then(c, d);
      }),
      !(
        55 < a.version &&
        "autoGainControl" in b.mediaDevices.getSupportedConstraints()
      ))
    ) {
      var d;
      let a = function (a, b, c) {
          b in a && !(c in a) && ((a[c] = a[b]), delete a[b]);
        },
        f = Ba((d = b.mediaDevices.getUserMedia)).call(d, b.mediaDevices);
      if (
        ((b.mediaDevices.getUserMedia = function (b) {
          return (
            "object" == typeof b &&
              "object" == typeof b.audio &&
              ((b = JSON.parse(z(b))),
              a(b.audio, "autoGainControl", "mozAutoGainControl"),
              a(b.audio, "noiseSuppression", "mozNoiseSuppression")),
            f(b)
          );
        }),
        c && c.prototype.getSettings)
      ) {
        let b = c.prototype.getSettings;
        c.prototype.getSettings = function () {
          let c = b.apply(this, arguments);
          return (
            a(c, "mozAutoGainControl", "autoGainControl"),
            a(c, "mozNoiseSuppression", "noiseSuppression"),
            c
          );
        };
      }
      if (c && c.prototype.applyConstraints) {
        let b = c.prototype.applyConstraints;
        c.prototype.applyConstraints = function (c) {
          return (
            "audio" === this.kind &&
              "object" == typeof c &&
              ((c = JSON.parse(z(c))),
              a(c, "autoGainControl", "mozAutoGainControl"),
              a(c, "noiseSuppression", "mozNoiseSuppression")),
            b.apply(this, [c])
          );
        };
      }
    }
  }
  function Vg(c) {
    "object" == typeof c &&
      c.RTCTrackEvent &&
      "receiver" in c.RTCTrackEvent.prototype &&
      !("transceiver" in c.RTCTrackEvent.prototype) &&
      ba(c.RTCTrackEvent.prototype, "transceiver", {
        get() {
          return { receiver: this.receiver };
        },
      });
  }
  function Fe(c) {
    let a = Lb(c);
    if (
      "object" == typeof c &&
      (c.RTCPeerConnection || c.mozRTCPeerConnection)
    ) {
      var b;
      (!c.RTCPeerConnection &&
        c.mozRTCPeerConnection &&
        (c.RTCPeerConnection = c.mozRTCPeerConnection),
      53 > a.version) &&
        r(
          (b = [
            "setLocalDescription",
            "setRemoteDescription",
            "addIceCandidate",
          ])
        ).call(b, function (a) {
          let b = c.RTCPeerConnection.prototype[a];
          c.RTCPeerConnection.prototype[a] = {
            [a]() {
              return (
                (arguments[0] = new (
                  "addIceCandidate" === a
                    ? c.RTCIceCandidate
                    : c.RTCSessionDescription
                )(arguments[0])),
                b.apply(this, arguments)
              );
            },
          }[a];
        });
      var d = c.RTCPeerConnection.prototype.addIceCandidate;
      c.RTCPeerConnection.prototype.addIceCandidate = function () {
        return arguments[0]
          ? 68 > a.version && arguments[0] && "" === arguments[0].candidate
            ? u.resolve()
            : d.apply(this, arguments)
          : (arguments[1] && arguments[1].apply(null), u.resolve());
      };
      var e = {
          inboundrtp: "inbound-rtp",
          outboundrtp: "outbound-rtp",
          candidatepair: "candidate-pair",
          localcandidate: "local-candidate",
          remotecandidate: "remote-candidate",
        },
        f = c.RTCPeerConnection.prototype.getStats;
      c.RTCPeerConnection.prototype.getStats = function () {
        let [b, c, d] = arguments;
        return f
          .apply(this, [b || null])
          .then((b) => {
            if (53 > a.version && !c)
              try {
                r(b).call(b, (a) => {
                  a.type = e[a.type] || a.type;
                });
              } catch (L) {
                if ("TypeError" !== L.name) throw L;
                r(b).call(b, (a, c) => {
                  b.set(c, ab({}, a, { type: e[a.type] || a.type }));
                });
              }
            return b;
          })
          .then(c, d);
      };
    }
  }
  function Wg(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      c.RTCRtpSender &&
      !(c.RTCRtpSender && "getStats" in c.RTCRtpSender.prototype)
    ) {
      var a = c.RTCPeerConnection.prototype.getSenders;
      a &&
        (c.RTCPeerConnection.prototype.getSenders = function () {
          let b = a.apply(this, []);
          return r(b).call(b, (a) => (a._pc = this)), b;
        });
      var b = c.RTCPeerConnection.prototype.addTrack;
      b &&
        (c.RTCPeerConnection.prototype.addTrack = function () {
          let a = b.apply(this, arguments);
          return (a._pc = this), a;
        });
      c.RTCRtpSender.prototype.getStats = function () {
        return this.track ? this._pc.getStats(this.track) : u.resolve(new Z());
      };
    }
  }
  function Xg(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      c.RTCRtpSender &&
      !(c.RTCRtpSender && "getStats" in c.RTCRtpReceiver.prototype)
    ) {
      var a = c.RTCPeerConnection.prototype.getReceivers;
      a &&
        (c.RTCPeerConnection.prototype.getReceivers = function () {
          let b = a.apply(this, []);
          return r(b).call(b, (a) => (a._pc = this)), b;
        });
      tc(c, "track", (a) => ((a.receiver._pc = a.srcElement), a));
      c.RTCRtpReceiver.prototype.getStats = function () {
        return this._pc.getStats(this.track);
      };
    }
  }
  function Yg(c) {
    !c.RTCPeerConnection ||
      "removeStream" in c.RTCPeerConnection.prototype ||
      (c.RTCPeerConnection.prototype.removeStream = function (a) {
        var b;
        Bd("removeStream", "removeTrack");
        r((b = this.getSenders())).call(b, (b) => {
          var c;
          b.track &&
            Aa((c = a.getTracks())).call(c, b.track) &&
            this.removeTrack(b);
        });
      });
  }
  function Zg(c) {
    c.DataChannel && !c.RTCDataChannel && (c.RTCDataChannel = c.DataChannel);
  }
  function $g(c) {
    if ("object" == typeof c && c.RTCPeerConnection) {
      if (
        ("getLocalStreams" in c.RTCPeerConnection.prototype ||
          (c.RTCPeerConnection.prototype.getLocalStreams = function () {
            return (
              this._localStreams || (this._localStreams = []),
              this._localStreams
            );
          }),
        !("addStream" in c.RTCPeerConnection.prototype))
      ) {
        let a = c.RTCPeerConnection.prototype.addTrack;
        c.RTCPeerConnection.prototype.addStream = function (b) {
          var c, e, f;
          this._localStreams || (this._localStreams = []);
          Aa((c = this._localStreams)).call(c, b) || this._localStreams.push(b);
          r((e = b.getAudioTracks())).call(e, (c) => a.call(this, c, b));
          r((f = b.getVideoTracks())).call(f, (c) => a.call(this, c, b));
        };
        c.RTCPeerConnection.prototype.addTrack = function (b, c) {
          var d;
          c &&
            (this._localStreams
              ? Aa((d = this._localStreams)).call(d, c) ||
                this._localStreams.push(c)
              : (this._localStreams = [c]));
          return a.call(this, b, c);
        };
      }
      "removeStream" in c.RTCPeerConnection.prototype ||
        (c.RTCPeerConnection.prototype.removeStream = function (a) {
          var b, c, e;
          this._localStreams || (this._localStreams = []);
          let f = E((b = this._localStreams)).call(b, a);
          if (-1 !== f) {
            Ja((c = this._localStreams)).call(c, f, 1);
            var g = a.getTracks();
            r((e = this.getSenders())).call(e, (a) => {
              Aa(g).call(g, a.track) && this.removeTrack(a);
            });
          }
        });
    }
  }
  function ah(c) {
    if (
      "object" == typeof c &&
      c.RTCPeerConnection &&
      ("getRemoteStreams" in c.RTCPeerConnection.prototype ||
        (c.RTCPeerConnection.prototype.getRemoteStreams = function () {
          return this._remoteStreams ? this._remoteStreams : [];
        }),
      !("onaddstream" in c.RTCPeerConnection.prototype))
    ) {
      ba(c.RTCPeerConnection.prototype, "onaddstream", {
        get() {
          return this._onaddstream;
        },
        set(a) {
          this._onaddstream &&
            (this.removeEventListener("addstream", this._onaddstream),
            this.removeEventListener("track", this._onaddstreampoly));
          this.addEventListener("addstream", (this._onaddstream = a));
          this.addEventListener(
            "track",
            (this._onaddstreampoly = (a) => {
              var b;
              r((b = a.streams)).call(b, (a) => {
                var b;
                (this._remoteStreams || (this._remoteStreams = []),
                Aa((b = this._remoteStreams)).call(b, a)) ||
                  (this._remoteStreams.push(a),
                  (b = new Event("addstream")),
                  (b.stream = a),
                  this.dispatchEvent(b));
              });
            })
          );
        },
      });
      let a = c.RTCPeerConnection.prototype.setRemoteDescription;
      c.RTCPeerConnection.prototype.setRemoteDescription = function () {
        let b = this;
        return (
          this._onaddstreampoly ||
            this.addEventListener(
              "track",
              (this._onaddstreampoly = function (a) {
                var c;
                r((c = a.streams)).call(c, (a) => {
                  var c;
                  (b._remoteStreams || (b._remoteStreams = []),
                  0 <= E((c = b._remoteStreams)).call(c, a)) ||
                    (b._remoteStreams.push(a),
                    (c = new Event("addstream")),
                    (c.stream = a),
                    b.dispatchEvent(c));
                });
              })
            ),
          a.apply(b, arguments)
        );
      };
    }
  }
  function bh(c) {
    if ("object" == typeof c && c.RTCPeerConnection) {
      c = c.RTCPeerConnection.prototype;
      var a = c.createOffer,
        b = c.createAnswer,
        d = c.setLocalDescription,
        e = c.setRemoteDescription,
        f = c.addIceCandidate;
      c.createOffer = function (b, c) {
        let d = a.apply(this, [
          2 <= arguments.length ? arguments[2] : arguments[0],
        ]);
        return c ? (d.then(b, c), u.resolve()) : d;
      };
      c.createAnswer = function (a, c) {
        let d = b.apply(this, [
          2 <= arguments.length ? arguments[2] : arguments[0],
        ]);
        return c ? (d.then(a, c), u.resolve()) : d;
      };
      var g = function (a, b, c) {
        a = d.apply(this, [a]);
        return c ? (a.then(b, c), u.resolve()) : a;
      };
      c.setLocalDescription = g;
      g = function (a, b, c) {
        a = e.apply(this, [a]);
        return c ? (a.then(b, c), u.resolve()) : a;
      };
      c.setRemoteDescription = g;
      g = function (a, b, c) {
        a = f.apply(this, [a]);
        return c ? (a.then(b, c), u.resolve()) : a;
      };
      c.addIceCandidate = g;
    }
  }
  function ch(c) {
    let a = c && c.navigator;
    if (a.mediaDevices && a.mediaDevices.getUserMedia) {
      var b;
      c = a.mediaDevices;
      let d = Ba((b = c.getUserMedia)).call(b, c);
      a.mediaDevices.getUserMedia = (a) => d(dh(a));
    }
    var d;
    !a.getUserMedia &&
      a.mediaDevices &&
      a.mediaDevices.getUserMedia &&
      (a.getUserMedia = Ba(
        (d = function (b, c, d) {
          a.mediaDevices.getUserMedia(b).then(c, d);
        })
      ).call(d, a));
  }
  function dh(c) {
    return c && void 0 !== c.video ? ab({}, c, { video: Ag(c.video) }) : c;
  }
  function eh(c) {
    let a = c.RTCPeerConnection;
    c.RTCPeerConnection = function (b, c) {
      if (b && b.iceServers) {
        let a = [];
        for (let c = 0; c < b.iceServers.length; c++) {
          let d = b.iceServers[c];
          !d.hasOwnProperty("urls") && d.hasOwnProperty("url")
            ? (Bd("RTCIceServer.url", "RTCIceServer.urls"),
              (d = JSON.parse(z(d))),
              (d.urls = d.url),
              delete d.url,
              a.push(d))
            : a.push(b.iceServers[c]);
        }
        b.iceServers = a;
      }
      return new a(b, c);
    };
    c.RTCPeerConnection.prototype = a.prototype;
    "generateCertificate" in c.RTCPeerConnection &&
      ba(c.RTCPeerConnection, "generateCertificate", {
        get: () => a.generateCertificate,
      });
  }
  function fh(c) {
    "object" == typeof c &&
      c.RTCPeerConnection &&
      "receiver" in c.RTCTrackEvent.prototype &&
      !c.RTCTransceiver &&
      ba(c.RTCTrackEvent.prototype, "transceiver", {
        get() {
          return { receiver: this.receiver };
        },
      });
  }
  function gh(c) {
    let a = c.RTCPeerConnection.prototype.createOffer;
    c.RTCPeerConnection.prototype.createOffer = function (b) {
      if (b) {
        var c, e;
        void 0 !== b.offerToReceiveAudio &&
          (b.offerToReceiveAudio = !!b.offerToReceiveAudio);
        let a = U((c = this.getTransceivers())).call(
          c,
          (a) => "audio" === a.receiver.track.kind
        );
        !1 === b.offerToReceiveAudio && a
          ? "sendrecv" === a.direction
            ? a.setDirection
              ? a.setDirection("sendonly")
              : (a.direction = "sendonly")
            : "recvonly" === a.direction &&
              (a.setDirection
                ? a.setDirection("inactive")
                : (a.direction = "inactive"))
          : !0 !== b.offerToReceiveAudio || a || this.addTransceiver("audio");
        void 0 !== b.offerToReceiveVideo &&
          (b.offerToReceiveVideo = !!b.offerToReceiveVideo);
        c = U((e = this.getTransceivers())).call(
          e,
          (a) => "video" === a.receiver.track.kind
        );
        !1 === b.offerToReceiveVideo && c
          ? "sendrecv" === c.direction
            ? c.setDirection
              ? c.setDirection("sendonly")
              : (c.direction = "sendonly")
            : "recvonly" === c.direction &&
              (c.setDirection
                ? c.setDirection("inactive")
                : (c.direction = "inactive"))
          : !0 !== b.offerToReceiveVideo || c || this.addTransceiver("video");
      }
      return a.apply(this, arguments);
    };
  }
  function Ed(c) {
    if (
      c.RTCIceCandidate &&
      !(c.RTCIceCandidate && "foundation" in c.RTCIceCandidate.prototype)
    ) {
      var a = c.RTCIceCandidate;
      c.RTCIceCandidate = function (b) {
        var c;
        if (
          ("object" == typeof b &&
            b.candidate &&
            0 === E((c = b.candidate)).call(c, "a=") &&
            ((b = JSON.parse(z(b))).candidate = b.candidate.substr(2)),
          b.candidate && b.candidate.length)
        ) {
          c = new a(b);
          b = F.parseCandidate(b.candidate);
          let d = ab(c, b);
          return (
            (d.toJSON = function () {
              return {
                candidate: d.candidate,
                sdpMid: d.sdpMid,
                sdpMLineIndex: d.sdpMLineIndex,
                usernameFragment: d.usernameFragment,
              };
            }),
            d
          );
        }
        return new a(b);
      };
      c.RTCIceCandidate.prototype = a.prototype;
      tc(
        c,
        "icecandidate",
        (a) => (
          a.candidate &&
            ba(a, "candidate", {
              value: new c.RTCIceCandidate(a.candidate),
              writable: "false",
            }),
          a
        )
      );
    }
  }
  function Tc(c) {
    if (c.RTCPeerConnection) {
      var a = Lb(c);
      "sctp" in c.RTCPeerConnection.prototype ||
        ba(c.RTCPeerConnection.prototype, "sctp", {
          get() {
            return void 0 === this._sctp ? null : this._sctp;
          },
        });
      var b = function (a) {
          if (!a || !a.sdp) return !1;
          a = F.splitSections(a.sdp);
          return (
            a.shift(),
            Fg(a).call(a, (a) => {
              var b;
              return (
                (a = F.parseMLine(a)) &&
                "application" === a.kind &&
                -1 !== E((b = a.protocol)).call(b, "SCTP")
              );
            })
          );
        },
        d = function (a) {
          a = a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
          if (null === a || 2 > a.length) return -1;
          a = R(a[1], 10);
          return a != a ? -1 : a;
        },
        e = function (b) {
          let c = 65536;
          return (
            "firefox" === a.browser &&
              (c =
                57 > a.version
                  ? -1 === b
                    ? 16384
                    : 2147483637
                  : 60 > a.version
                  ? 57 === a.version
                    ? 65535
                    : 65536
                  : 2147483637),
            c
          );
        },
        f = function (b, c) {
          let d = 65536;
          "firefox" === a.browser && 57 === a.version && (d = 65535);
          b = F.matchPrefix(b.sdp, "a=max-message-size:");
          return (
            0 < b.length
              ? (d = R(b[0].substr(19), 10))
              : "firefox" === a.browser && -1 !== c && (d = 2147483637),
            d
          );
        },
        g = c.RTCPeerConnection.prototype.setRemoteDescription;
      c.RTCPeerConnection.prototype.setRemoteDescription = function () {
        if (((this._sctp = null), "chrome" === a.browser && 76 <= a.version)) {
          var { sdpSemantics: c } = this.getConfiguration();
          "plan-b" === c &&
            ba(this, "sctp", {
              get() {
                return void 0 === this._sctp ? null : this._sctp;
              },
              enumerable: !0,
              configurable: !0,
            });
        }
        if (b(arguments[0])) {
          var q = d(arguments[0]);
          c = e(q);
          q = f(arguments[0], q);
          let a;
          a =
            0 === c && 0 === q
              ? Number.POSITIVE_INFINITY
              : 0 === c || 0 === q
              ? Math.max(c, q)
              : Math.min(c, q);
          c = {};
          ba(c, "maxMessageSize", { get: () => a });
          this._sctp = c;
        }
        return g.apply(this, arguments);
      };
    }
  }
  function Uc(c) {
    function a(a, b) {
      let c = a.send;
      a.send = function () {
        var d = arguments[0];
        d = d.length || d.size || d.byteLength;
        if ("open" === a.readyState && b.sctp && d > b.sctp.maxMessageSize)
          throw new TypeError(
            "Message too large (can send a maximum of " +
              b.sctp.maxMessageSize +
              " bytes)"
          );
        return c.apply(a, arguments);
      };
    }
    if (
      c.RTCPeerConnection &&
      "createDataChannel" in c.RTCPeerConnection.prototype
    ) {
      var b = c.RTCPeerConnection.prototype.createDataChannel;
      c.RTCPeerConnection.prototype.createDataChannel = function () {
        let c = b.apply(this, arguments);
        return a(c, this), c;
      };
      tc(c, "datachannel", (b) => (a(b.channel, b.target), b));
    }
  }
  function Ge(c) {
    var a;
    if (
      c.RTCPeerConnection &&
      !("connectionState" in c.RTCPeerConnection.prototype)
    ) {
      var b = c.RTCPeerConnection.prototype;
      ba(b, "connectionState", {
        get() {
          return (
            { completed: "connected", checking: "connecting" }[
              this.iceConnectionState
            ] || this.iceConnectionState
          );
        },
        enumerable: !0,
        configurable: !0,
      });
      ba(b, "onconnectionstatechange", {
        get() {
          return this._onconnectionstatechange || null;
        },
        set(a) {
          this._onconnectionstatechange &&
            (this.removeEventListener(
              "connectionstatechange",
              this._onconnectionstatechange
            ),
            delete this._onconnectionstatechange);
          a &&
            this.addEventListener(
              "connectionstatechange",
              (this._onconnectionstatechange = a)
            );
        },
        enumerable: !0,
        configurable: !0,
      });
      r((a = ["setLocalDescription", "setRemoteDescription"])).call(a, (a) => {
        let c = b[a];
        b[a] = function () {
          return (
            this._connectionstatechangepoly ||
              ((this._connectionstatechangepoly = (a) => {
                let b = a.target;
                if (b._lastConnectionState !== b.connectionState) {
                  b._lastConnectionState = b.connectionState;
                  let c = new Event("connectionstatechange", a);
                  b.dispatchEvent(c);
                }
                return a;
              }),
              this.addEventListener(
                "iceconnectionstatechange",
                this._connectionstatechangepoly
              )),
            c.apply(this, arguments)
          );
        };
      });
    }
  }
  function He(c) {
    if (c.RTCPeerConnection) {
      var a = Lb(c);
      if (!("chrome" === a.browser && 71 <= a.version)) {
        var b = c.RTCPeerConnection.prototype.setRemoteDescription;
        c.RTCPeerConnection.prototype.setRemoteDescription = function (a) {
          var c, d;
          a &&
            a.sdp &&
            -1 !== E((c = a.sdp)).call(c, "\na=extmap-allow-mixed") &&
            (a.sdp = O((d = a.sdp.split("\n")))
              .call(d, (a) => "a=extmap-allow-mixed" !== uc(a).call(a))
              .join("\n"));
          return b.apply(this, arguments);
        };
      }
    }
  }
  function vc(c) {
    return "string" == typeof c ? ab({}, vl[c]) : c;
  }
  function Ie(c) {
    return "string" == typeof c ? ab({}, wl[c]) : c;
  }
  function Fd(c) {
    return "string" == typeof c ? ab({}, xl[c]) : c;
  }
  function Xb(c, a) {
    var b;
    Aa((b = S(w))).call(b, c) && (w[c] = a);
  }
  function wc(c, a, b) {
    return { sampleRate: c, stereo: a, bitrate: b };
  }
  function H(c, a, b, d, e) {
    return { width: c, height: a, frameRate: b, bitrateMin: d, bitrateMax: e };
  }
  function Mb(c, a, b, d, e) {
    return {
      width: { max: c },
      height: { max: a },
      frameRate: b,
      bitrateMin: d,
      bitrateMax: e,
    };
  }
  function hh(c) {
    return "[object Array]" === xc.call(c);
  }
  function ih(c) {
    return null !== c && "object" == typeof c;
  }
  function jh(c) {
    return "[object Function]" === xc.call(c);
  }
  function Gd(c, a) {
    if (null != c)
      if (("object" != typeof c && (c = [c]), hh(c)))
        for (var b = 0, d = c.length; b < d; b++) a.call(null, c[b], b, c);
      else
        for (b in c)
          Object.prototype.hasOwnProperty.call(c, b) &&
            a.call(null, c[b], b, c);
  }
  function kh() {
    function c(b, c) {
      "object" == typeof a[c] && "object" == typeof b
        ? (a[c] = kh(a[c], b))
        : (a[c] = b);
    }
    for (var a = {}, b = 0, d = arguments.length; b < d; b++)
      Gd(arguments[b], c);
    return a;
  }
  function Je() {
    function c(b, c) {
      "object" == typeof a[c] && "object" == typeof b
        ? (a[c] = Je(a[c], b))
        : (a[c] = "object" == typeof b ? Je({}, b) : b);
    }
    for (var a = {}, b = 0, d = arguments.length; b < d; b++)
      Gd(arguments[b], c);
    return a;
  }
  function lh(c) {
    return encodeURIComponent(c)
      .replace(/%40/gi, "@")
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }
  function Hd() {
    this.handlers = [];
  }
  function mh(c, a) {
    !I.isUndefined(c) &&
      I.isUndefined(c["Content-Type"]) &&
      (c["Content-Type"] = a);
  }
  function Vc(c) {
    this.defaults = c;
    this.interceptors = { request: new nh(), response: new nh() };
  }
  function Ke(c) {
    this.message = c;
  }
  function Id(c) {
    if ("function" != typeof c)
      throw new TypeError("executor must be a function.");
    var a;
    this.promise = new Promise(function (b) {
      a = b;
    });
    var b = this;
    c(function (c) {
      b.reason || ((b.reason = new oh(c)), a(b.reason));
    });
  }
  function ph(c) {
    c = new Jd(c);
    var a = qh(Jd.prototype.request, c);
    return I.extend(a, Jd.prototype, c), I.extend(a, c), a;
  }
  function rh() {
    let c = new Date();
    return c.toTimeString().split(" ")[0] + ":" + c.getMilliseconds();
  }
  function sh(c, a) {
    if ("boolean" != typeof c)
      throw new m(
        l.INVALID_PARAMS,
        "Invalid ".concat(a, ": The value is of the boolean type.")
      );
  }
  function bb(c, a, b) {
    var d;
    if (!Aa(b).call(b, c))
      throw new m(
        l.INVALID_PARAMS,
        n((d = "".concat(a, " can only be set as "))).call(d, z(b))
      );
  }
  function W(c, a, b = 1, d = 1e4, e = !0) {
    if (c < b || c > d || (e && ("number" != typeof c || 0 != c % 1))) {
      var f, g;
      throw new m(
        l.INVALID_PARAMS,
        n(
          (f = n((g = "invalid ".concat(a, ": the value range is ["))).call(
            g,
            b,
            ", "
          ))
        ).call(f, d, "]. integer only")
      );
    }
  }
  function La(c, a, b = 1, d = 255, e = !0) {
    if (null == c)
      throw new m(
        l.INVALID_PARAMS,
        "".concat(a || "param", " cannot be empty")
      );
    var f, g, k;
    if (!th(c, b, d, e))
      throw new m(
        l.INVALID_PARAMS,
        n(
          (f = n(
            (g = n(
              (k = "Invalid ".concat(
                a || "string param",
                ": Length of the string: ["
              ))
            ).call(k, b, ","))
          ).call(g, d, "]."))
        ).call(f, e ? " ASCII characters only." : "")
      );
  }
  function uh(c, a) {
    if (!ec(c))
      throw new m(l.INVALID_PARAMS, "".concat(a, " should be an array"));
  }
  function Le(c) {
    if (
      "string" != typeof c ||
      !/^[a-zA-Z0-9 !#\$%&\(\)\+\-:;<=\.>\?@\[\]\^_\{\}\|~,]{1,64}$/.test(c)
    )
      throw (
        (h.error("Invalid Channel Name ".concat(c)),
        new m(
          l.INVALID_PARAMS,
          "The length must be within 64 bytes. The supported characters: a-z,A-Z,0-9,space,!, #, $, %, &, (, ), +, -, :, ;, <, =, ., >, ?, @, [, ], ^, _,  {, }, |, ~, ,"
        ))
      );
  }
  function Me(c) {
    var a;
    if (!(("number" == typeof c && 0 <= c && 4294967295 >= c) || th(c, 1, 255)))
      throw (
        (h.error(n((a = "Invalid UID ".concat(c, " "))).call(a, typeof c)),
        new m(
          l.INVALID_PARAMS,
          "[String uid] Length of the string: [1,255]. ASCII characters only. [Number uid] The value range is [0,10000]"
        ))
      );
  }
  function th(c, a = 1, b = 255, d = !0) {
    if ((a = "string" == typeof c && c.length <= b && c.length >= a)) {
      if (!(d = !d))
        a: if ("string" != typeof c) d = !1;
        else {
          for (d = 0; d < c.length; d += 1)
            if (((a = c.charCodeAt(d)), 0 > a || 255 < a)) {
              d = !1;
              break a;
            }
          d = !0;
        }
      a = d;
    }
    return a;
  }
  function Kd() {
    this._listeners = {};
  }
  function vh(c) {
    return (
      "undefined" != typeof Float32Array
        ? (function () {
            function a(a, b, c) {
              f[0] = a;
              b[c] = g[0];
              b[c + 1] = g[1];
              b[c + 2] = g[2];
              b[c + 3] = g[3];
            }
            function b(a, b, c) {
              f[0] = a;
              b[c] = g[3];
              b[c + 1] = g[2];
              b[c + 2] = g[1];
              b[c + 3] = g[0];
            }
            function d(a, b) {
              return (
                (g[0] = a[b]),
                (g[1] = a[b + 1]),
                (g[2] = a[b + 2]),
                (g[3] = a[b + 3]),
                f[0]
              );
            }
            function e(a, b) {
              return (
                (g[3] = a[b]),
                (g[2] = a[b + 1]),
                (g[1] = a[b + 2]),
                (g[0] = a[b + 3]),
                f[0]
              );
            }
            var f = new Float32Array([-0]),
              g = new Uint8Array(f.buffer),
              k = 128 === g[3];
            c.writeFloatLE = k ? a : b;
            c.writeFloatBE = k ? b : a;
            c.readFloatLE = k ? d : e;
            c.readFloatBE = k ? e : d;
          })()
        : (function () {
            function a(a, b, c, g) {
              var d = 0 > b ? 1 : 0;
              if ((d && (b = -b), 0 === b)) a(0 < 1 / b ? 0 : 2147483648, c, g);
              else if (isNaN(b)) a(2143289344, c, g);
              else if (3.4028234663852886e38 < b)
                a(((d << 31) | 2139095040) >>> 0, c, g);
              else if (1.1754943508222875e-38 > b)
                a(
                  ((d << 31) | Math.round(b / 1.401298464324817e-45)) >>> 0,
                  c,
                  g
                );
              else {
                var e = Math.floor(Math.log(b) / Math.LN2);
                a(
                  ((d << 31) |
                    ((e + 127) << 23) |
                    (8388607 & Math.round(b * Math.pow(2, -e) * 8388608))) >>>
                    0,
                  c,
                  g
                );
              }
            }
            function b(a, b, c) {
              c = a(b, c);
              a = 2 * (c >> 31) + 1;
              b = (c >>> 23) & 255;
              c &= 8388607;
              return 255 === b
                ? c
                  ? NaN
                  : (1 / 0) * a
                : 0 === b
                ? 1.401298464324817e-45 * a * c
                : a * Math.pow(2, b - 150) * (c + 8388608);
            }
            c.writeFloatLE = a.bind(null, wh);
            c.writeFloatBE = a.bind(null, xh);
            c.readFloatLE = b.bind(null, yh);
            c.readFloatBE = b.bind(null, zh);
          })(),
      "undefined" != typeof Float64Array
        ? (function () {
            function a(a, b, c) {
              f[0] = a;
              b[c] = g[0];
              b[c + 1] = g[1];
              b[c + 2] = g[2];
              b[c + 3] = g[3];
              b[c + 4] = g[4];
              b[c + 5] = g[5];
              b[c + 6] = g[6];
              b[c + 7] = g[7];
            }
            function b(a, b, c) {
              f[0] = a;
              b[c] = g[7];
              b[c + 1] = g[6];
              b[c + 2] = g[5];
              b[c + 3] = g[4];
              b[c + 4] = g[3];
              b[c + 5] = g[2];
              b[c + 6] = g[1];
              b[c + 7] = g[0];
            }
            function d(a, b) {
              return (
                (g[0] = a[b]),
                (g[1] = a[b + 1]),
                (g[2] = a[b + 2]),
                (g[3] = a[b + 3]),
                (g[4] = a[b + 4]),
                (g[5] = a[b + 5]),
                (g[6] = a[b + 6]),
                (g[7] = a[b + 7]),
                f[0]
              );
            }
            function e(a, b) {
              return (
                (g[7] = a[b]),
                (g[6] = a[b + 1]),
                (g[5] = a[b + 2]),
                (g[4] = a[b + 3]),
                (g[3] = a[b + 4]),
                (g[2] = a[b + 5]),
                (g[1] = a[b + 6]),
                (g[0] = a[b + 7]),
                f[0]
              );
            }
            var f = new Float64Array([-0]),
              g = new Uint8Array(f.buffer),
              k = 128 === g[7];
            c.writeDoubleLE = k ? a : b;
            c.writeDoubleBE = k ? b : a;
            c.readDoubleLE = k ? d : e;
            c.readDoubleBE = k ? e : d;
          })()
        : (function () {
            function a(a, b, c, g, k, q) {
              var d = 0 > g ? 1 : 0;
              if ((d && (g = -g), 0 === g))
                a(0, k, q + b), a(0 < 1 / g ? 0 : 2147483648, k, q + c);
              else if (isNaN(g)) a(0, k, q + b), a(2146959360, k, q + c);
              else if (1.7976931348623157e308 < g)
                a(0, k, q + b), a(((d << 31) | 2146435072) >>> 0, k, q + c);
              else if (2.2250738585072014e-308 > g)
                a((g /= 4.9e-324) >>> 0, k, q + b),
                  a(((d << 31) | (g / 4294967296)) >>> 0, k, q + c);
              else {
                var e = Math.floor(Math.log(g) / Math.LN2);
                1024 === e && (e = 1023);
                a((4503599627370496 * (g *= Math.pow(2, -e))) >>> 0, k, q + b);
                a(
                  ((d << 31) |
                    ((e + 1023) << 20) |
                    ((1048576 * g) & 1048575)) >>>
                    0,
                  k,
                  q + c
                );
              }
            }
            function b(a, b, c, g, k) {
              b = a(g, k + b);
              g = a(g, k + c);
              a = 2 * (g >> 31) + 1;
              c = (g >>> 20) & 2047;
              b = 4294967296 * (1048575 & g) + b;
              return 2047 === c
                ? b
                  ? NaN
                  : (1 / 0) * a
                : 0 === c
                ? 4.9e-324 * a * b
                : a * Math.pow(2, c - 1075) * (b + 4503599627370496);
            }
            c.writeDoubleLE = a.bind(null, wh, 0, 4);
            c.writeDoubleBE = a.bind(null, xh, 4, 0);
            c.readDoubleLE = b.bind(null, yh, 0, 4);
            c.readDoubleBE = b.bind(null, zh, 4, 0);
          })(),
      c
    );
  }
  function wh(c, a, b) {
    a[b] = 255 & c;
    a[b + 1] = (c >>> 8) & 255;
    a[b + 2] = (c >>> 16) & 255;
    a[b + 3] = c >>> 24;
  }
  function xh(c, a, b) {
    a[b] = c >>> 24;
    a[b + 1] = (c >>> 16) & 255;
    a[b + 2] = (c >>> 8) & 255;
    a[b + 3] = 255 & c;
  }
  function yh(c, a) {
    return (c[a] | (c[a + 1] << 8) | (c[a + 2] << 16) | (c[a + 3] << 24)) >>> 0;
  }
  function zh(c, a) {
    return ((c[a] << 24) | (c[a + 1] << 16) | (c[a + 2] << 8) | c[a + 3]) >>> 0;
  }
  function Ca(c, a) {
    this.lo = c >>> 0;
    this.hi = a >>> 0;
  }
  function Wc(c, a, b) {
    this.fn = c;
    this.len = a;
    this.next = void 0;
    this.val = b;
  }
  function Ne() {}
  function yl(c) {
    this.head = c.head;
    this.tail = c.tail;
    this.len = c.len;
    this.next = c.states;
  }
  function aa() {
    this.len = 0;
    this.tail = this.head = new Wc(Ne, 0, 0);
    this.states = null;
  }
  function Oe(c, a, b) {
    a[b] = 255 & c;
  }
  function Pe(c, a) {
    this.len = c;
    this.next = void 0;
    this.val = a;
  }
  function Qe(c, a, b) {
    for (; c.hi; )
      (a[b++] = (127 & c.lo) | 128),
        (c.lo = ((c.lo >>> 7) | (c.hi << 25)) >>> 0),
        (c.hi >>>= 7);
    for (; 127 < c.lo; ) (a[b++] = (127 & c.lo) | 128), (c.lo >>>= 7);
    a[b++] = c.lo;
  }
  function Re(c, a, b) {
    a[b] = 255 & c;
    a[b + 1] = (c >>> 8) & 255;
    a[b + 2] = (c >>> 16) & 255;
    a[b + 3] = c >>> 24;
  }
  function Ab() {
    Se.call(this);
  }
  function zl(c, a, b) {
    40 > c.length
      ? Q.utf8.write(c, a, b)
      : a.utf8Write
      ? a.utf8Write(c, b)
      : a.write(c, b);
  }
  function qb(c, a) {
    return RangeError(
      "index out of range: " + c.pos + " + " + (a || 1) + " > " + c.len
    );
  }
  function ua(c) {
    this.buf = c;
    this.pos = 0;
    this.len = c.length;
  }
  function Te() {
    var c = new Ah(0, 0),
      a = 0;
    if (!(4 < this.len - this.pos)) {
      for (; 3 > a; ++a) {
        if (this.pos >= this.len) throw qb(this);
        if (
          ((c.lo = (c.lo | ((127 & this.buf[this.pos]) << (7 * a))) >>> 0),
          128 > this.buf[this.pos++])
        )
          return c;
      }
      return (
        (c.lo = (c.lo | ((127 & this.buf[this.pos++]) << (7 * a))) >>> 0), c
      );
    }
    for (; 4 > a; ++a)
      if (
        ((c.lo = (c.lo | ((127 & this.buf[this.pos]) << (7 * a))) >>> 0),
        128 > this.buf[this.pos++])
      )
        return c;
    if (
      ((c.lo = (c.lo | ((127 & this.buf[this.pos]) << 28)) >>> 0),
      (c.hi = (c.hi | ((127 & this.buf[this.pos]) >> 4)) >>> 0),
      128 > this.buf[this.pos++])
    )
      return c;
    if (((a = 0), 4 < this.len - this.pos))
      for (; 5 > a; ++a) {
        if (
          ((c.hi = (c.hi | ((127 & this.buf[this.pos]) << (7 * a + 3))) >>> 0),
          128 > this.buf[this.pos++])
        )
          return c;
      }
    else
      for (; 5 > a; ++a) {
        if (this.pos >= this.len) throw qb(this);
        if (
          ((c.hi = (c.hi | ((127 & this.buf[this.pos]) << (7 * a + 3))) >>> 0),
          128 > this.buf[this.pos++])
        )
          return c;
      }
    throw Error("invalid varint encoding");
  }
  function Ld(c, a) {
    return (
      (c[a - 4] | (c[a - 3] << 8) | (c[a - 2] << 16) | (c[a - 1] << 24)) >>> 0
    );
  }
  function Bh() {
    if (this.pos + 8 > this.len) throw qb(this, 8);
    return new Ah(Ld(this.buf, (this.pos += 4)), Ld(this.buf, (this.pos += 4)));
  }
  function fc(c) {
    Ue.call(this, c);
  }
  function Xc(c, a, b) {
    if ("function" != typeof c) throw TypeError("rpcImpl must be a function");
    Q.EventEmitter.call(this);
    this.rpcImpl = c;
    this.requestDelimited = !!a;
    this.responseDelimited = !!b;
  }
  function Al(c) {
    return (
      La(c.reportId, "params.reportId", 0, 100, !1),
      La(c.category, "params.category", 0, 100, !1),
      La(c.event, "params.event", 0, 100, !1),
      La(c.label, "params.label", 0, 100, !1),
      W(c.value, "params.value", -9007199254740991, 9007199254740991, !1),
      !0
    );
  }
  function Ch(c) {
    return (
      W(c.timeout, "config.timeout", 0, 1e5),
      W(c.timeoutFactor, "config.timeoutFactor", 0, 100, !1),
      W(c.maxRetryCount, "config.maxRetryConfig", 0, 1 / 0),
      W(c.maxRetryTimeout, "config.maxRetryTimeout", 0, 1 / 0),
      !0
    );
  }
  function Dh(c) {
    return (
      La(c.turnServerURL, "turnServerURL"),
      La(c.username, "username"),
      La(c.password, "password"),
      W(c.udpport, "udpport", 1, 99999, !0),
      c.forceturn && sh(c.forceturn, "forceturn"),
      c.tcpport && W(c.tcpport, "tcpport", 1, 99999, !0),
      !0
    );
  }
  function Ve(c, a) {
    La(c.url, "".concat(a, ".url"), 1, 1e3, !1);
    null == c.x || W(c.x, "".concat(a, ".x"), 0, 1e4);
    null == c.y || W(c.y, "".concat(a, ".y"), 0, 1e4);
    null == c.width || W(c.width, "".concat(a, ".width"), 0, 1e4);
    null == c.height || W(c.height, "".concat(a, ".height"), 0, 1e4);
    null == c.zOrder || W(c.zOrder, "".concat(a, ".zOrder"), 0, 255);
    null == c.alpha || W(c.alpha, "".concat(a, ".alpha"), 0, 1, !1);
  }
  function Bl(c) {
    var a, b;
    (null == c.width || W(c.width, "config.width", 0, 1e4),
    null == c.height || W(c.height, "config.height", 0, 1e4),
    null == c.videoBitrate || W(c.videoBitrate, "config.videoBitrate", 1, 1e6),
    null == c.videoFrameRate || W(c.videoFrameRate, "config.videoFrameRate"),
    null == c.lowLatency || sh(c.lowLatency, "config.lowLatency"),
    null == c.audioSampleRate ||
      bb(c.audioSampleRate, "config.audioSampleRate", [32e3, 44100, 48e3]),
    null == c.audioBitrate || W(c.audioBitrate, "config.audioBitrate", 1, 128),
    null == c.audioChannels ||
      bb(c.audioChannels, "config.audioChannels", [1, 2, 3, 4, 5]),
    null == c.videoGop || W(c.videoGop, "config.videoGop"),
    null == c.videoCodecProfile ||
      bb(c.videoCodecProfile, "config.videoCodecProfile", [66, 77, 100]),
    null == c.userCount || W(c.userCount, "config.userCount", 0, 17),
    null == c.backgroundColor ||
      W(c.backgroundColor, "config.backgroundColor", 0, 16777215),
    null == c.userConfigExtraInfo ||
      La(c.userConfigExtraInfo, "config.userConfigExtraInfo", 0, 4096, !1),
    c.transcodingUsers && null != c.transcodingUsers) &&
      (uh(c.transcodingUsers, "config.transcodingUsers"),
      r((a = c.transcodingUsers)).call(a, (a, b) => {
        Me(a.uid);
        null == a.x || W(a.x, "transcodingUser[".concat(b, "].x"), 0, 1e4);
        null == a.y || W(a.y, "transcodingUser[".concat(b, "].y"), 0, 1e4);
        null == a.width ||
          W(a.width, "transcodingUser[".concat(b, "].width"), 0, 1e4);
        null == a.height ||
          W(a.height, "transcodingUser[".concat(b, "].height"), 0, 1e4);
        null == a.zOrder ||
          W(a.zOrder - 1, "transcodingUser[".concat(b, "].zOrder"), 0, 100);
        null == a.alpha ||
          W(a.alpha, "transcodingUser[".concat(b, "].alpha"), 0, 1, !1);
      }));
    (null == c.watermark || Ve(c.watermark, "watermark"),
    null == c.backgroundImage || Ve(c.backgroundImage, "backgroundImage"),
    c.images && null != c.images) &&
      (uh(c.images, "config.images"),
      r((b = c.images)).call(b, (a, b) => {
        Ve(a, "images[".concat(b, "]"));
      }));
    return !0;
  }
  function Eh(c) {
    if (!c.channelName)
      throw new m(l.INVALID_PARAMS, "invalid channelName in info");
    if (!c.uid || "number" != typeof c.uid)
      throw new m(
        l.INVALID_PARAMS,
        "invalid uid in info, uid must be a number"
      );
    return (
      c.token && La(c.token, "info.token", 1, 2047),
      Me(c.uid),
      Le(c.channelName),
      !0
    );
  }
  function Fh(c) {
    return bb(c, "mediaSource", ["screen", "window", "application"]), !0;
  }
  function qa(c) {
    var a, b, d, e;
    c = c || navigator.userAgent;
    let f =
      c.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
      [];
    if ("Chrome" === f[1]) {
      var g = c.match(/(OPR(?=\/))\/?(\d+)/i);
      null !== g && (f = g);
    }
    "Safari" === f[1] &&
      ((g = c.match(/version\/(\d+)/i)), null !== g && (f[2] = g[1]));
    -1 !== E((a = c.toLowerCase())).call(a, "qqbrowser") &&
      ((a = c.match(/(qqbrowser(?=\/))\/?(\d+)/i)), null !== a && (f = a));
    -1 !== E((b = c.toLowerCase())).call(b, "micromessenger") &&
      ((b = c.match(/(micromessenger(?=\/))\/?(\d+)/i)), null !== b && (f = b));
    -1 !== E((d = c.toLowerCase())).call(d, "edge") &&
      ((d = c.match(/(edge(?=\/))\/?(\d+)/i)), null !== d && (f = d));
    -1 !== E((e = c.toLowerCase())).call(e, "trident") &&
      ((e = /\brv[ :]+(\d+)/g.exec(c) || []),
      null !== e && (f = ["", "IE", e[1]]));
    e = null;
    d = [
      { s: X.WIN_10, r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: X.WIN_81, r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: X.WIN_8, r: /(Windows 8|Windows NT 6.2)/ },
      { s: X.WIN_7, r: /(Windows 7|Windows NT 6.1)/ },
      { s: X.WIN_VISTA, r: /Windows NT 6.0/ },
      { s: X.WIN_SERVER_2003, r: /Windows NT 5.2/ },
      { s: X.WIN_XP, r: /(Windows NT 5.1|Windows XP)/ },
      { s: X.WIN_2000, r: /(Windows NT 5.0|Windows 2000)/ },
      { s: X.ANDROID, r: /Android/ },
      { s: X.OPEN_BSD, r: /OpenBSD/ },
      { s: X.SUN_OS, r: /SunOS/ },
      { s: X.LINUX, r: /(Linux|X11)/ },
      { s: X.IOS, r: /(iPhone|iPad|iPod)/ },
      { s: X.MAC_OS_X, r: /Mac OS X/ },
      { s: X.MAC_OS, r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: X.QNX, r: /QNX/ },
      { s: X.UNIX, r: /UNIX/ },
      { s: X.BEOS, r: /BeOS/ },
      { s: X.OS_2, r: /OS\/2/ },
      {
        s: X.SEARCH_BOT,
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];
    for (let a in d)
      if (((b = d[a]), b.r.test(c))) {
        e = b.s;
        break;
      }
    return { name: f[1], version: f[2], os: e };
  }
  function Yc() {
    return qa().name === ea.CHROME;
  }
  function Gh() {
    return (
      window.navigator.appVersion &&
      null !== window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./) &&
      35 >= window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1]
    );
  }
  function We() {
    let c = qa();
    return c.name === ea.EDGE || c.name === ea.SAFARI
      ? !1
      : !!navigator.userAgent.toLocaleLowerCase().match(/chrome\/[\d]./i);
  }
  function Hh(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Bb(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Hh(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = Hh(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function Cl(c) {
    if (!c.address || !c.tcp)
      throw new m(l.UNEXPECTED_RESPONSE, "Invalid address format ".concat(c));
    return c.address.match(/^[\.:\d]+$/)
      ? "".concat(c.address.replace(/[^\d]/g, "-"), ".edge.agora.io")
      : (h.info(
          "Cannot recognized as IP address ".concat(
            c.address,
            ". Used As Host instead"
          )
        ),
        n((a = "".concat(c.address, ":"))).call(a, c.tcp));
    var a;
  }
  function Dl(c, a) {
    var b;
    let d = yc ? [".agora.io", ".agoraio.cn"] : [".agora.io"],
      e = d[1] && -1 !== E(a).call(a, d[1]) ? 1 : 0;
    c.addresses = c.addresses || [];
    return {
      gatewayAddrs: A((b = c.addresses)).call(b, (a) => {
        var b, c, f;
        return a.ip.match(/^[\.:\d]+$/)
          ? n(
              (b = n(
                (c = "".concat(a.ip.replace(/[^\d]/g, "-"), ".edge"))
              ).call(c, d[e++ % d.length], ":"))
            ).call(b, a.port)
          : (h.info(
              "Cannot recognized as IP address ".concat(
                a.ip,
                ". Used As Host instead"
              )
            ),
            n((f = "".concat(a.ip, ":"))).call(f, a.port));
      }),
      uid: c.uid,
      cid: c.cid,
      vid: c.detail && c.detail[8],
      uni_lbs_ip: c.detail && c.detail[1],
      res: c,
    };
  }
  function El(c, a) {
    var b;
    return {
      addressList: A((b = c.servers)).call(b, (b, c) => {
        var d, e, k, q, B;
        return yc
          ? n(
              (d = n(
                (e = n(
                  (k = "wss://".concat(b.address.replace(/\./g, "-"), ".edge."))
                ).call(k, 0 == c % 2 ? "agora.io" : "agoraio.cn", ":"))
              ).call(e, b.wss, "?serviceName="))
            ).call(d, encodeURIComponent(a))
          : n(
              (q = n(
                (B = "wss://".concat(
                  b.address.replace(/\./g, "-"),
                  ".edge.agora.io:"
                ))
              ).call(B, b.wss, "?serviceName="))
            ).call(q, encodeURIComponent(a));
      }),
      workerToken: c.workerToken,
      vid: c.vid,
    };
  }
  function Cb(c) {
    return "number" == typeof c ? c : c.exact || c.ideal || c.max || c.min || 0;
  }
  function Fl(c) {
    var a;
    c = c._encoderConfig;
    if (!c) return {};
    let b = {
      resolution:
        c.width && c.height
          ? n((a = "".concat(Cb(c.width), "x"))).call(a, Cb(c.height))
          : void 0,
      maxVideoBW: c.bitrateMax,
      minVideoBW: c.bitrateMin,
    };
    return (
      "number" == typeof c.frameRate
        ? ((b.maxFrameRate = c.frameRate), (b.minFrameRate = c.frameRate))
        : c.frameRate &&
          ((b.maxFrameRate =
            c.frameRate.max ||
            c.frameRate.ideal ||
            c.frameRate.exact ||
            c.frameRate.min),
          (b.minFrameRate =
            c.frameRate.min ||
            c.frameRate.ideal ||
            c.frameRate.exact ||
            c.frameRate.max)),
      b
    );
  }
  function Gl(c) {
    let a = {
      id: "bweforvideo",
      timestamp: new Date(c.timestamp).toISOString(),
      type: "VideoBwe",
    };
    return (
      c.bitrate.retransmit && (a.A_rb = c.bitrate.retransmit.toString()),
      c.bitrate.targetEncoded && (a.A_teb = c.bitrate.targetEncoded.toString()),
      (a.A_aeb = c.bitrate.actualEncoded.toString()),
      (a.A_tb = c.bitrate.transmit.toString()),
      void 0 !== c.sendBandwidth && (a.A_asb = c.sendBandwidth.toString()),
      a
    );
  }
  function Ih(c, a) {
    let b = c.videoSend[0];
    if (!b) return null;
    a = a && a.videoSend[0] ? a.videoSend[0].inputFrame : void 0;
    c = {
      id: pa(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "video",
      type: "ssrc",
      ssrc: b.ssrc.toString(),
    };
    return (
      b.inputFrame &&
        ((a && b.inputFrame.height === a.height) ||
          (c.A_fhi = b.inputFrame.height
            ? b.inputFrame.height.toString()
            : "0"),
        (a && b.inputFrame.width === a.width) ||
          (c.A_fwi = b.inputFrame.width ? b.inputFrame.width.toString() : "0"),
        (a && b.inputFrame.frameRate === a.frameRate) ||
          (c.A_fri = b.inputFrame.frameRate
            ? b.inputFrame.frameRate.toString()
            : "0")),
      c
    );
  }
  function Hl(c, a) {
    let b = c.videoSend[0];
    if (!b) return null;
    c = {
      id: pa(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "video",
      type: "ssrc",
      ssrc: b.ssrc.toString(),
    };
    switch (
      ((c.A_vstd =
        (a._originMediaStreamTrack && !a._originMediaStreamTrack.enabled) ||
        !a._mediaStreamTrack.enabled
          ? "1"
          : "0"),
      b.sentFrame &&
        ((c.A_fhs = b.sentFrame.height.toString()),
        (c.A_frs = b.sentFrame.frameRate.toString()),
        (c.A_fws = b.sentFrame.width.toString())),
      b.adaptionChangeReason)
    ) {
      case "none":
        c.A_ac = "0";
        break;
      case "cpu":
        c.A_ac = "1";
        break;
      case "bandwidth":
        c.A_ac = "2";
        break;
      case "other":
        c.A_ac = "3";
    }
    return (
      (c.A_nr = b.nacksCount.toString()),
      b.avgEncodeMs && (c.A_aem = b.avgEncodeMs.toFixed(0).toString()),
      c
    );
  }
  function Il(c, a) {
    let b = c.audioSend[0];
    if (!b) return null;
    c = {
      id: pa(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "audio",
      type: "ssrc",
      ssrc: b.ssrc.toString(),
    };
    return (
      (c.A_astd =
        a._originMediaStreamTrack.enabled && a._mediaStreamTrack.enabled
          ? "0"
          : "1"),
      b.inputLevel
        ? (c.A_ail = Math.round(100 * b.inputLevel).toString())
        : (c.A_ail = Math.round(100 * a._source.getAudioAvgLevel()).toString()),
      (c.A_apil = Math.round(100 * a._source.getAudioAvgLevel()).toString()),
      c
    );
  }
  function Jl(c, a) {
    let b = c.videoRecv[0];
    if (!b) return null;
    c = {
      id: pa(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "video",
      type: "ssrc",
      ssrc: b.ssrc.toString(),
    };
    var d;
    ((c.bytesReceived = b.bytes.toString()),
    (c.packetsLost = b.packetsLost.toString()),
    (c.packetsReceived = b.packets.toString()),
    b.framesRateFirefox && (c.A_frr = b.framesRateFirefox.toString()),
    b.receivedFrame && (c.A_frr = b.receivedFrame.frameRate.toString()),
    (c.A_frd = b.decodeFrameRate.toString()),
    b.outputFrame && (c.A_fro = b.outputFrame.frameRate.toString()),
    void 0 !== b.jitterBufferMs && (c.A_jbm = b.jitterBufferMs.toString()),
    void 0 !== b.currentDelayMs && (c.A_cdm = b.currentDelayMs.toString()),
    (c.A_fs = b.firsCount.toString()),
    (c.A_ns = b.nacksCount.toString()),
    (c.A_ps = b.plisCount.toString()),
    a &&
      (c.A_vrtd =
        a._originMediaStreamTrack.enabled && a._mediaStreamTrack.enabled
          ? "0"
          : "1"),
    a._player && 0 < a._player.freezeTimeCounterList.length) &&
      (c.A_vrft = Ja((d = a._player.freezeTimeCounterList))
        .call(d, 0, 1)[0]
        .toString());
    return c;
  }
  function Kl(c, a) {
    let b = c.audioRecv[0];
    if (!b) return null;
    c = {
      id: pa(10, ""),
      timestamp: new Date(c.timestamp).toISOString(),
      mediaType: "audio",
      type: "ssrc",
      ssrc: b.ssrc.toString(),
    };
    return (
      (c.bytesReceived = b.bytes.toString()),
      (c.packetsLost = b.packetsLost.toString()),
      (c.packetsReceived = b.packets.toString()),
      b.outputLevel
        ? (c.A_aol = Math.round(100 * b.outputLevel).toString())
        : (c.A_aol = Math.round(100 * a._source.getAudioAvgLevel()).toString()),
      (c.A_apol = Math.round(100 * a._source.getAudioAvgLevel()).toString()),
      a &&
        (c.A_artd =
          a._originMediaStreamTrack.enabled && a._mediaStreamTrack.enabled
            ? "0"
            : "1"),
      (c.A_jr = b.jitterMs.toString()),
      (c.A_jbm = b.jitterBufferMs.toString()),
      (c.A_cdm = b.jitterBufferMs.toString()),
      c
    );
  }
  function Ll(c) {
    return (c = c.videoSend[0])
      ? {
          mediaType: "video",
          isVideoMute: !1,
          frameRateInput: c.inputFrame && c.inputFrame.frameRate.toString(),
          frameRateSent: c.sentFrame && c.sentFrame.frameRate.toString(),
          googRtt: c.rttMs.toString(),
        }
      : null;
  }
  function Ml(c, a, b, d, e) {
    a = a.videoRecv[0];
    if (!a) return null;
    c = Zc.isRemoteVideoFreeze(e, a, d ? d.videoRecv[0] : void 0) && c;
    b = {
      mediaType: "video",
      isVideoMute: !1,
      peerId: b,
      frameRateReceived:
        a.receivedFrame && a.receivedFrame.frameRate.toString(),
      frameRateDecoded: a.decodedFrame && a.decodedFrame.frameRate.toString(),
      isFreeze: c,
      bytesReceived: a.bytes.toString(),
      packetsReceived: a.packets.toString(),
      packetsLost: a.packetsLost.toString(),
    };
    return (
      a.framesRateFirefox &&
        ((b.frameRateDecoded = a.framesRateFirefox.toString()),
        (b.frameRateReceived = a.framesRateFirefox.toString())),
      b
    );
  }
  function Nl(c, a, b) {
    c = c.audioRecv[0];
    if (!c) return null;
    b = Zc.isRemoteAudioFreeze(b);
    return {
      mediaType: "audio",
      isAudioMute: !1,
      peerId: a,
      googJitterReceived: c.jitterBufferMs.toString(),
      isFreeze: b,
      bytesReceived: c.bytes.toString(),
      packetsReceived: c.packets.toString(),
      packetsLost: c.packetsLost.toString(),
      frameReceived: c.receivedFrames.toString(),
      frameDropped: c.droppedFrames.toString(),
    };
  }
  function Jh(c) {
    return 0 <= c && 0.17 > c
      ? 1
      : 0.17 <= c && 0.36 > c
      ? 2
      : 0.36 <= c && 0.59 > c
      ? 3
      : 0.59 <= c && 1 >= c
      ? 4
      : 1 < c
      ? 5
      : 0;
  }
  function Kh(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Xe(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Kh(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = Kh(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function Md(c) {
    return window.TextEncoder ? new TextEncoder().encode(c).length : c.length;
  }
  function Ol(c, a, b) {
    let d = c[a];
    if (!d || "string" != typeof d) return [c];
    c[a] = "";
    let e = Md(z(c)),
      f = 0,
      g = [],
      k = 0;
    for (let q = 0; q < d.length; q++)
      (k += 127 >= d.charCodeAt(q) ? 1 : 3),
        k <= b - e ||
          ((g[g.length] = Xe({}, c, { [a]: d.substring(f, q) })),
          (f = q),
          (k = 127 >= d.charCodeAt(q) ? 1 : 3));
    return (
      f !== d.length - 1 && (g[g.length] = Xe({}, c, { [a]: d.substring(f) })),
      g
    );
  }
  function Pl() {
    return new u((c) => {
      document.body ? c() : window.addEventListener("load", () => c());
    });
  }
  function Db(c) {
    return new u((a) => {
      window.setTimeout(a, c);
    });
  }
  function Ql(c) {
    let a = new m(l.TIMEOUT, "timeout");
    return new u((b, d) => {
      window.setTimeout(() => d(a), c);
    });
  }
  function pa(c = 7, a) {
    var b, d;
    let e = Math.random().toString(16).substr(2, c).toLowerCase();
    return e.length === c
      ? n((b = "".concat(a))).call(b, e)
      : n((d = "".concat(a))).call(d, e) + pa(c - e.length, "");
  }
  function $c(c) {
    return new u((a, b) => {
      let d = document.createElement("video");
      d.setAttribute("autoplay", "");
      d.setAttribute("muted", "");
      d.muted = !0;
      d.autoplay = !0;
      d.setAttribute("playsinline", "");
      d.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; width: 1px; height: 1px"
      );
      document.body.appendChild(d);
      d.addEventListener("playing", () => {
        (!d.videoWidth && qa().name === ea.FIREFOX) ||
          (document.body.removeChild(d), a([d.videoWidth, d.videoHeight]));
      });
      d.srcObject = new MediaStream([c]);
    });
  }
  function zc(c) {
    return u
      .all(
        A(c).call(c, (a) =>
          a.then(
            (a) => {
              throw a;
            },
            (a) => a
          )
        )
      )
      .then(
        (a) => {
          throw a;
        },
        (a) => a
      );
  }
  function Ma(c, a, ...b) {
    return 0 === c.getListeners(a).length
      ? u.reject(new m(l.UNEXPECTED_ERROR, "can not emit promise"))
      : new u((d, e) => {
          c.emit(a, ...b, d, e);
        });
  }
  function Ta(c, a, ...b) {
    return 0 === c.getListeners(a).length ? u.resolve() : Ma(c, a, ...b);
  }
  function gc(c, a, ...b) {
    return 0 === c.getListeners(a).length ? null : ad(c, a, ...b);
  }
  function ad(c, a, ...b) {
    let d = null,
      e = null;
    if (
      (c.emit(
        a,
        ...b,
        (a) => {
          d = a;
        },
        (a) => {
          e = a;
        }
      ),
      null !== e)
    )
      throw e;
    if (null === d) throw new m(l.UNEXPECTED_ERROR, "handler is not sync");
    return d;
  }
  function bd(c, a) {
    a = E(c).call(c, a);
    -1 !== a && Ja(c).call(c, a, 1);
  }
  function Lh(c) {
    let a = [];
    return (
      r(c).call(c, (b) => {
        -1 === E(a).call(a, b) && a.push(b);
      }),
      a
    );
  }
  function cb(c) {
    u.resolve().then(c);
  }
  function Rl(c, a) {
    if (c.length !== a.length) return !1;
    for (let b = 0; b < c.length; b += 1) {
      let d = c[b];
      if (
        O(c).call(c, (a) => a === d).length !==
        O(a).call(a, (a) => a === d).length
      )
        return !1;
    }
    return !0;
  }
  function cd(c, a) {
    Mh[a] || ((Mh[a] = !0), c());
  }
  function Nh(c) {
    c = window.atob(c);
    let a = new Uint8Array(new ArrayBuffer(c.length));
    for (let b = 0; b < c.length; b += 1) a[b] = c.charCodeAt(b);
    return a;
  }
  function Ye(c) {
    let a = "";
    for (let b = 0; b < c.length; b += 1) a += String.fromCharCode(c[b]);
    return window.btoa(a);
  }
  function Sl(c, a) {
    var b, d, e, f, g;
    if ("motion" === c)
      return (
        h.debug(
          n(
            (f = n(
              (g = "adjust bitrate for motion, (".concat(a.bitrateMax, ", "))
            ).call(g, a.bitrateMin, "}) -> ("))
          ).call(f, a.bitrateMax, ", undefined)")
        ),
        { max: a.bitrateMax }
      );
    if (!a.width || !a.height) return { max: a.bitrateMax, min: a.bitrateMin };
    c = Cb(a.width) * Cb(a.height);
    f = Math.max(0.25, 0.1 + 0.03 * Cb(a.frameRate || 20));
    if (19200 > c) return {};
    if (76800 > c) g = dd[0];
    else if (307200 > c) g = dd[1];
    else if (921600 > c) g = dd[2];
    else if (2073600 > c) g = dd[3];
    else {
      if (!(8294400 > c)) return { min: a.bitrateMin, max: a.bitrateMax };
      g = dd[4];
    }
    c = [
      Math.round((g[0][0] + g[0][1] * c) * f),
      Math.round((g[1][0] + g[1][1] * c) * f),
      Math.round((g[2][0] + g[2][1] * c) * f),
    ];
    c = {
      min: Math.max(c[2], a.bitrateMin || 0),
      max: Math.max(c[2], a.bitrateMax || c[0]),
    };
    return (
      h.debug(
        n(
          (b = n(
            (d = n(
              (e = "adjust bitrate for detail, (".concat(a.bitrateMax, ", "))
            ).call(e, a.bitrateMin, "}) -> ("))
          ).call(d, c.max, ", "))
        ).call(b, c.min, ")")
      ),
      c
    );
  }
  async function Oh(c, a) {
    let b = (a, b) =>
      a
        ? "number" != typeof a
          ? a.max || a.exact || a.ideal || a.min || b
          : a
        : b;
    c = {
      audio: !1,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: c,
          maxHeight: b(a.height, 1080),
          maxWidth: b(a.width, 1920),
        },
      },
    };
    return (
      a.frameRate && "number" != typeof a.frameRate
        ? ((c.video.mandatory.maxFrameRate = a.frameRate.max),
          (c.video.mandatory.minFrameRate = a.frameRate.min))
        : "number" == typeof a.frameRate &&
          (c.video.mandatory.maxFrameRate = a.frameRate),
      await navigator.mediaDevices.getUserMedia(c)
    );
  }
  async function Tl(c) {
    var a = await Ph(c.mediaSource);
    a = await Ul(a);
    return await Oh(a, c);
  }
  async function Ph(c) {
    let a = ["window", "screen"];
    ("application" !== c && "window" !== c) || (a = ["window"]);
    "screen" === c && (a = ["screen"]);
    let b = Qh();
    if (!b) throw new m(l.ELECTRON_IS_NULL);
    c = null;
    try {
      c = b.desktopCapturer.getSources({ types: a });
    } catch (d) {
      c = null;
    }
    (c && c.then) ||
      (c = new u((c, e) => {
        b.desktopCapturer.getSources({ types: a }, (a, b) => {
          a ? e(a) : c(b);
        });
      }));
    try {
      return await c;
    } catch (d) {
      throw new m(l.ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR, d.toString());
    }
  }
  function Ul(c) {
    return new u((a, b) => {
      let d = document.createElement("div");
      d.innerText = "share screen";
      d.setAttribute(
        "style",
        "text-align: center; height: 25px; line-height: 25px; border-radius: 4px 4px 0 0; background: #D4D2D4; border-bottom:  solid 1px #B9B8B9;"
      );
      let e = document.createElement("div");
      e.setAttribute(
        "style",
        "width: 100%; height: 500px; padding: 15px 25px ; box-sizing: border-box;"
      );
      let f = document.createElement("div");
      f.innerText =
        "Agora Web Screensharing wants to share the contents of your screen with webdemo.agorabeckon.com. Choose what you'd like to share.";
      f.setAttribute("style", "height: 12%;");
      let g = document.createElement("div");
      g.setAttribute(
        "style",
        "width: 100%; height: 80%; background: #FFF; border:  solid 1px #CBCBCB; display: flex; flex-wrap: wrap; justify-content: space-around; overflow-y: scroll; padding: 0 15px; box-sizing: border-box;"
      );
      let k = document.createElement("div");
      k.setAttribute("style", "text-align: right; padding: 16px 0;");
      let q = document.createElement("button");
      q.innerHTML = "cancel";
      q.setAttribute("style", "width: 85px;");
      q.onclick = () => {
        document.body.removeChild(B);
        let a = Error("NotAllowedError");
        a.name = "NotAllowedError";
        b(a);
      };
      k.appendChild(q);
      e.appendChild(f);
      e.appendChild(g);
      e.appendChild(k);
      let B = document.createElement("div");
      B.setAttribute(
        "style",
        "position: fixed; z-index: 99999999; top: 50%; left: 50%; width: 620px; height: 525px; background: #ECECEC; border-radius: 4px; -webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%);"
      );
      B.appendChild(d);
      B.appendChild(e);
      document.body.appendChild(B);
      A(c).call(c, (b) => {
        if (b.id) {
          let c = document.createElement("div");
          c.setAttribute(
            "style",
            "width: 30%; height: 160px; padding: 20px 0; text-align: center;box-sizing: content-box;"
          );
          c.innerHTML =
            '<div style="height: 120px; display: table-cell; vertical-align: middle;"><img style="width: 100%; background: #333333; box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);" src=' +
            b.thumbnail.toDataURL() +
            ' /></div><span style="\theight: 40px; line-height: 40px; display: inline-block; width: 70%; word-break: keep-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' +
            b.name +
            "</span>";
          c.onclick = () => {
            document.body.removeChild(B);
            a(b.id);
          };
          g.appendChild(c);
        }
      });
    });
  }
  function Qh() {
    if (Nd) return Nd;
    try {
      return (Nd = window.require("electron")), Nd;
    } catch (c) {
      return null;
    }
  }
  async function Eb(c, a) {
    let b = 0,
      d = null;
    for (; 2 > b; )
      try {
        d = await Vl(c, a, 0 < b);
        break;
      } catch (g) {
        var e, f;
        if (g instanceof m)
          throw (
            (h.error(n((f = "[".concat(a, "] "))).call(f, g.toString())), g)
          );
        let c = Od(g.name || g.code || g, g.message);
        if (c.code === l.MEDIA_OPTION_INVALID)
          h.debug("[".concat(a, "] detect media option invalid, retry")),
            (b += 1),
            await Db(500);
        else
          throw (
            (h.error(n((e = "[".concat(a, "] "))).call(e, c.toString())), c)
          );
      }
    if (!d)
      throw new m(l.UNEXPECTED_ERROR, "can not find stream after getUserMedia");
    return d;
  }
  async function Vl(c, a, b) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
      throw new m(l.NOT_SUPPORTED, "can not find getUserMedia");
    b &&
      (c.video && (delete c.video.width, delete c.video.height),
      c.screen && (delete c.screen.width, delete c.screen.height));
    var d = fa;
    b = new MediaStream();
    if (
      (c.audioSource && b.addTrack(c.audioSource),
      c.videoSource && b.addTrack(c.videoSource),
      !c.audio && !c.video && !c.screen)
    )
      return h.debug("Using Video Source/ Audio Source"), b;
    if (c.screen)
      if (Qh())
        c.screen.sourceId
          ? Ac(b, await Oh(c.screen.sourceId, c.screen))
          : Ac(b, await Tl(c.screen));
      else if (Yc() && c.screen.extensionId && c.screen.mandatory) {
        if (!d.getStreamFromExtension)
          throw new m(
            l.NOT_SUPPORTED,
            "This browser does not support screen sharing"
          );
        h.debug(
          "[".concat(
            a,
            '] Screen access on chrome stable, looking for extension"'
          )
        );
        var e = await Wl(c.screen.extensionId, a);
        c.screen.mandatory.chromeMediaSourceId = e;
        Ac(
          b,
          await navigator.mediaDevices.getUserMedia({
            video: { mandatory: c.screen.mandatory },
          })
        );
      } else if (d.getDisplayMedia)
        c.screen.mediaSource && Fh(c.screen.mediaSource),
          (e = {
            width: c.screen.width,
            height: c.screen.height,
            frameRate: c.screen.frameRate,
            displaySurface:
              "screen" === c.screen.mediaSource
                ? "monitor"
                : c.screen.mediaSource,
          }),
          h.debug(
            "[".concat(a, "] getDisplayMedia:"),
            z({ video: e, audio: !!c.screenAudio })
          ),
          Ac(
            b,
            await navigator.mediaDevices.getDisplayMedia({
              video: e,
              audio: !!c.screenAudio,
            })
          );
      else {
        if (qa().name !== ea.FIREFOX)
          throw (
            (h.error(
              "[".concat(a, "] This browser does not support screenSharing")
            ),
            new m(
              l.NOT_SUPPORTED,
              "This browser does not support screen sharing"
            ))
          );
        c.screen.mediaSource && Fh(c.screen.mediaSource);
        d = {
          video: {
            mediaSource: c.screen.mediaSource,
            width: c.screen.width,
            height: c.screen.height,
            frameRate: c.screen.frameRate,
          },
        };
        h.debug(n((e = "[".concat(a, "] getUserMedia: "))).call(e, z(d)));
        Ac(b, await navigator.mediaDevices.getUserMedia(d));
      }
    if (!c.video && !c.audio) return b;
    c = { video: c.video, audio: c.audio };
    h.debug("[".concat(a, "] GetUserMedia"), z(c));
    a = qa();
    let f;
    e = null;
    (a.name !== ea.SAFARI && a.os !== X.IOS) || (e = await Ze.lock());
    try {
      f = await navigator.mediaDevices.getUserMedia(c);
    } catch (g) {
      throw (e && e(), g);
    }
    return c.audio && (Rh = !0), c.video && (Sh = !0), Ac(b, f), e && e(), b;
  }
  function Od(c, a) {
    switch (c) {
      case "Starting video failed":
      case "OverconstrainedError":
      case "TrackStartError":
        var b;
        return new m(
          l.MEDIA_OPTION_INVALID,
          n((b = "".concat(c, ": "))).call(b, a)
        );
      case "NotFoundError":
      case "DevicesNotFoundError":
        var d;
        return new m(
          l.DEVICE_NOT_FOUND,
          n((d = "".concat(c, ": "))).call(d, a)
        );
      case "NotSupportedError":
        var e;
        return new m(l.NOT_SUPPORTED, n((e = "".concat(c, ": "))).call(e, a));
      case "InvalidStateError":
      case "NotAllowedError":
      case "PERMISSION_DENIED":
      case "PermissionDeniedError":
        var f;
        return new m(
          l.PERMISSION_DENIED,
          n((f = "".concat(c, ": "))).call(f, a)
        );
      case "ConstraintNotSatisfiedError":
        var g;
        return new m(
          l.CONSTRAINT_NOT_SATISFIED,
          n((g = "".concat(c, ": "))).call(g, a)
        );
      default:
        var k;
        return (
          h.error("getUserMedia unexpected error", c),
          new m(l.UNEXPECTED_ERROR, n((k = "".concat(c, ": "))).call(k, a))
        );
    }
  }
  function Ac(c, a) {
    let b = c.getVideoTracks()[0],
      d = c.getAudioTracks()[0],
      e = a.getVideoTracks()[0];
    (a = a.getAudioTracks()[0]) && (d && c.removeTrack(d), c.addTrack(a));
    e && (b && c.removeTrack(b), c.addTrack(e));
  }
  function Wl(c, a) {
    return new u((b, d) => {
      try {
        chrome.runtime.sendMessage(c, { getStream: !0 }, (c) => {
          if (!c || !c.streamId)
            return (
              h.error(
                "[".concat(
                  a,
                  "] No response from Chrome Plugin. Plugin not installed properly"
                ),
                c
              ),
              void d(
                new m(
                  l.CHROME_PLUGIN_NO_RESPONSE,
                  "No response from Chrome Plugin. Plugin not installed properly"
                )
              )
            );
          b(c.streamId);
        });
      } catch (f) {
        var e;
        h.error(
          n(
            (e = "[".concat(
              a,
              "] AgoraRTC screensharing plugin is not accessible("
            ))
          ).call(e, c, ")"),
          f.toString()
        );
        d(new m(l.CHROME_PLUGIN_NOT_INSTALL));
      }
    });
  }
  function Th(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Xl(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Th(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = Th(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function Nb(c, a, b) {
    return new u((d, e) => {
      a.timeout = a.timeout || w.HTTP_CONNECT_TIMEOUT;
      a.responseType = a.responseType || "json";
      a.data && !b
        ? ((a.data = z(a.data)), (Uh += Md(a.data)))
        : b && (Uh += a.data.size);
      a.headers = a.headers || {};
      a.headers["Content-Type"] =
        a.headers["Content-Type"] || "application/json";
      a.method = "POST";
      a.url = c;
      Fb.request(a)
        .then((a) => {
          "string" == typeof a.data
            ? ($e += Md(a.data))
            : a.data instanceof ArrayBuffer || a.data instanceof Uint8Array
            ? ($e += a.data.byteLength)
            : ($e += Md(z(a.data)));
          d(a.data);
        })
        .catch((a) => {
          Fb.isCancel(a)
            ? e(new m(l.OPERATION_ABORTED, "cancel token canceled"))
            : "ECONNABORTED" === a.code
            ? e(new m(l.NETWORK_TIMEOUT, a.message))
            : a.response
            ? e(new m(l.NETWORK_RESPONSE_ERROR, a.response.status))
            : e(new m(l.NETWORK_ERROR, a.message));
        });
    });
  }
  async function Yl(c, a) {
    let b = new Blob([a.data], { type: "buffer" }),
      d;
    try {
      d = await Nb(
        c,
        Xl({}, a, {
          data: b,
          headers: { "Content-Type": "application/octet-stream" },
        }),
        !0
      );
    } catch (e) {
      throw e;
    }
    return d;
  }
  function Vh(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function wa(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Vh(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = Vh(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function Pd(c) {
    var a = Zl[Math.floor(c / 1e4)];
    if (!a) return { desc: "unkonw error", retry: !1 };
    a = a[c % 1e4];
    if (!a) {
      if (Math.floor(c / 1e4) === Bc.ACCESS_POINT) {
        c %= 1e4;
        if ("1" === c.toString()[0]) return { desc: c.toString(), retry: !1 };
        if ("2" === c.toString()[0]) return { desc: c.toString(), retry: !0 };
      }
      return { desc: "unkonw error", retry: !1 };
    }
    return a;
  }
  function Wh(c) {
    return $l[c] || { desc: "UNKNOW_ERROR_".concat(c), action: "failed" };
  }
  function am(c, a) {
    return Math.min(
      a.maxRetryTimeout,
      a.timeout * Math.pow(a.timeoutFactor, c)
    );
  }
  function Yb(c, a, b, d) {
    let e = ab({}, Pa, d),
      f = e.timeout,
      g = async () => {
        await Db(f);
        f *= e.timeoutFactor;
        f = Math.min(e.maxRetryTimeout, f);
      },
      k = !1;
    d = new u(async (d, f) => {
      a = a || (() => !1);
      b = b || (() => !0);
      for (let q = 0; q < e.maxRetryCount; q += 1) {
        if (k) return f(new m(l.OPERATION_ABORTED));
        try {
          const b = await c();
          if (!a(b, q) || q + 1 === e.maxRetryCount) return d(b);
          await g();
        } catch (Ia) {
          if (!b(Ia, q) || q + 1 === e.maxRetryCount) return f(Ia);
          await g();
        }
      }
    });
    return (d.cancel = () => (k = !0)), d;
  }
  function bm() {
    Xh
      ? (h.info("create audio context"),
        (Cc = new Xh()),
        (Cc.onstatechange = () => {
          ed.emit("state-change");
        }),
        cm(Cc))
      : h.error("your browser is not support web audio");
  }
  function fd() {
    if (!Cc && (bm(), !Cc))
      throw new m(l.NOT_SUPPORTED, "can not create audio context");
    return Cc;
  }
  function gd(c) {
    if (!dm()) {
      h.debug("polyfill audio node");
      var a = c.connect,
        b = c.disconnect;
      c.connect = (b, e, f) => {
        var d;
        return (
          c._inputNodes || (c._inputNodes = []),
          Aa((d = c._inputNodes)).call(d, b) ||
            (b instanceof AudioNode
              ? (c._inputNodes.push(b), a.call(c, b, e, f))
              : a.call(c, b, e)),
          c
        );
      };
      c.disconnect = (d, e, f) => {
        b.call(c);
        d ? bd(c._inputNodes, d) : (c._inputNodes = []);
        for (let b of c._inputNodes) a.call(c, b);
      };
    }
  }
  function em(c) {
    let a = fd();
    return new u((b, d) => {
      a.decodeAudioData(
        c,
        (a) => {
          b(a);
        },
        (a) => {
          d(new m(l.DECODE_AUDIO_FILE_FAILED, a.toString()));
        }
      );
    });
  }
  function dm() {
    if (null !== af) return af;
    var c = fd();
    let a = c.createBufferSource(),
      b = c.createGain();
    c = c.createGain();
    a.connect(b);
    a.connect(c);
    a.disconnect(b);
    c = !1;
    try {
      a.disconnect(b);
    } catch (d) {
      c = !0;
    }
    return a.disconnect(), (af = c), c;
  }
  function bf(c, a) {
    let b = 1 / a,
      d = fd(),
      e = d.createGain();
    e.gain.value = 0;
    e.connect(d.destination);
    let f = !1,
      g = () => {
        if (f) return void (e = null);
        const a = d.createOscillator();
        a.onended = g;
        a.connect(e);
        a.start(0);
        a.stop(d.currentTime + b);
        c(d.currentTime);
      };
    return (
      g(),
      () => {
        f = !0;
      }
    );
  }
  function fm(c) {
    for (let a = 0; a < c.outputBuffer.numberOfChannels; a += 1) {
      let b = c.outputBuffer.getChannelData(a);
      for (let a = 0; a < b.length; a += 1) b[a] = 0;
    }
    return c.inputBuffer;
  }
  function cm(c) {
    function a(a) {
      "running" === c.state
        ? (b(!1), t && c.suspend().then(d, d))
        : "closed" !== c.state &&
          (t ? b(!1) : (b(!0), a && c.resume().then(d, d)));
    }
    function b(a) {
      if (w !== a) {
        w = a;
        for (let b = 0, c = v; b < c.length; b += 1) {
          let d = c[b];
          a
            ? window.addEventListener(d, e, { capture: !0, passive: !0 })
            : window.removeEventListener(d, e, { capture: !0, passive: !0 });
        }
      }
    }
    function d() {
      a(!1);
    }
    function e() {
      a(!0);
    }
    function f(a) {
      if (!y)
        if (u.paused)
          if (t) g(!1);
          else if (a) {
            g(!1);
            y = !0;
            a = void 0;
            try {
              (a = u.play())
                ? a.then(k, k)
                : (u.addEventListener("playing", k),
                  u.addEventListener("abort", k),
                  u.addEventListener("error", k));
            } catch (lq) {
              k();
            }
          } else g(!0);
        else g(!1), t && u.pause();
    }
    function g(a) {
      if (z !== a) {
        z = a;
        for (let b = 0, c = v; b < c.length; b++) {
          let d = c[b];
          a
            ? window.addEventListener(d, q, { capture: !0, passive: !0 })
            : window.removeEventListener(d, q, { capture: !0, passive: !0 });
        }
      }
    }
    function k() {
      u.removeEventListener("playing", k);
      u.removeEventListener("abort", k);
      u.removeEventListener("error", k);
      y = !1;
      f(!1);
    }
    function q() {
      f(!0);
    }
    function B() {
      p && r ? m || ((m = !0), (t = !1), u && f(!0), a(!0)) : m && (m = !1);
    }
    function L() {
      l && document[l.hidden] === m && ((p = !document[l.hidden]), B());
    }
    function h(a) {
      if (!a || a.target === window) {
        if (document.hasFocus()) {
          if (r) return;
          r = !0;
        } else {
          if (!r) return;
          r = !1;
        }
        B();
      }
    }
    function x(a, b) {
      let c;
      for (c = b; 1 < a; a--) c += b;
      return c;
    }
    let l;
    void 0 !== document.hidden
      ? (l = { hidden: "hidden", visibilitychange: "visibilitychange" })
      : void 0 !== document.webkitHidden
      ? (l = {
          hidden: "webkitHidden",
          visibilitychange: "webkitvisibilitychange",
        })
      : void 0 !== document.mozHidden
      ? (l = { hidden: "mozHidden", visibilitychange: "mozvisibilitychange" })
      : void 0 !== document.msHidden &&
        (l = { hidden: "msHidden", visibilitychange: "msvisibilitychange" });
    var n = navigator.userAgent.toLowerCase();
    n =
      (0 <= E(n).call(n, "iphone") && 0 > E(n).call(n, "like iphone")) ||
      (0 <= E(n).call(n, "ipad") && 0 > E(n).call(n, "like ipad")) ||
      (0 <= E(n).call(n, "ipod") && 0 > E(n).call(n, "like ipod"));
    let m = !0,
      p = !0,
      r = !0,
      t = !1,
      v =
        "click contextmenu auxclick dblclick mousedown mouseup touchend keydown keyup".split(
          " "
        ),
      u,
      w = !1,
      z = !1,
      y = !1;
    if (n) {
      let a = document.createElement("div");
      a.innerHTML = "<audio x-webkit-airplay='deny'></audio>";
      u = a.children.item(0);
      u.controls = !1;
      u.disableRemotePlayback = !0;
      u.preload = "auto";
      u.src =
        "data:audio/mpeg;base64,//uQx" +
        x(23, "A") +
        "WGluZwAAAA8AAAACAAACcQCA" +
        x(16, "gICA") +
        x(66, "/") +
        "8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkI" +
        x(320, "A") +
        "//sQxAADgnABGiAAQBCqgCRMAAgEAH" +
        x(15, "/") +
        "7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq" +
        x(18, "/") +
        "9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAw" +
        x(97, "V") +
        "Q==";
      u.loop = !0;
      u.load();
      f(!0);
    }
    c.onstatechange = function () {
      a(!0);
    };
    a(!1);
    l && document.addEventListener(l.visibilitychange, L, !0);
    n &&
      (window.addEventListener("focus", h, !0),
      window.addEventListener("blur", h, !0));
    L();
    h();
  }
  function Yh(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function cf(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Yh(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = Yh(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function Zh(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function df(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = Zh(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = Zh(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function $h(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function gm(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = $h(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = $h(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  async function hm(c, a, b, d, e) {
    let f = v(),
      g = { sid: b.sid, opid: 10, appid: b.appId, string_uid: a },
      k = c[0];
    b = await Yb(
      () =>
        Nb(
          k +
            "".concat(-1 === E(k).call(k, "?") ? "?" : "&", "action=stringuid"),
          {
            data: g,
            cancelToken: d,
            headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 72 },
          }
        ),
      (b, d) => {
        if (0 === b.code) {
          var e;
          if (0 >= b.uid || b.uid >= Math.pow(2, 32))
            throw (
              (h.error(
                n((e = "Invalid Uint Uid ".concat(a, " => "))).call(e, b.uid),
                b
              ),
              t.reqUserAccount(g.sid, {
                lts: f,
                success: !1,
                serverAddr: k,
                stringUid: g.string_uid,
                uid: b.uid,
                errorCode: l.INVALID_UINT_UID_FROM_STRING_UID,
                extend: g,
              }),
              new m(l.INVALID_UINT_UID_FROM_STRING_UID))
            );
          return (
            t.reqUserAccount(g.sid, {
              lts: f,
              success: !0,
              serverAddr: k,
              stringUid: g.string_uid,
              uid: b.uid,
              errorCode: null,
              extend: g,
            }),
            !1
          );
        }
        e = Pd(b.code);
        return (
          e.retry && (k = c[(d + 1) % c.length]),
          t.reqUserAccount(g.sid, {
            lts: f,
            success: !1,
            serverAddr: k,
            stringUid: g.string_uid,
            uid: b.uid,
            errorCode: e.desc,
            extend: g,
          }),
          e.retry
        );
      },
      (a, b) =>
        a.code !== l.OPERATION_ABORTED &&
        (t.reqUserAccount(g.sid, {
          lts: f,
          success: !1,
          serverAddr: k,
          stringUid: g.string_uid,
          uid: null,
          errorCode: a.code,
          extend: g,
        }),
        (k = c[(b + 1) % c.length]),
        !0),
      e
    );
    if (0 !== b.code)
      throw ((b = Pd(b.code)), new m(l.UNEXPECTED_RESPONSE, b.desc));
    return b;
  }
  function im(c, a, b, d) {
    let e = v(),
      f = {
        opid: 133,
        flag: 1048576,
        ts: +new Date(),
        key: a.token,
        cname: a.cname,
        sid: a.sid,
        detail: {},
        uid: a.uid || 0,
      };
    return Yb(
      async () =>
        await Nb(c, {
          data: f,
          cancelToken: b,
          headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 69 },
        }),
      (b) => {
        var d;
        if (0 === b.code)
          return (
            t.joinWebProxyAP(a.sid, {
              lts: e,
              sucess: 1,
              apServerAddr: c,
              turnServerAddrList: A((d = b.addresses))
                .call(d, (a) => a.ip)
                .join(","),
              errorCode: null,
              eventType: a.cloudProxyServer,
            }),
            !1
          );
        b = Pd(b.code);
        throw new m(l.CAN_NOT_GET_GATEWAY_SERVER, b.desc, { retry: b.retry });
      },
      (b) =>
        b.code !== l.OPERATION_ABORTED &&
        (t.joinWebProxyAP(f.sid, {
          lts: e,
          sucess: 0,
          apServerAddr: c,
          turnServerAddrList: null,
          errorCode: b.code,
          eventType: a.cloudProxyServer,
        }),
        !0),
      d
    );
  }
  function jm(c, a, b, d) {
    let e = v(),
      f = {
        command: "convergeAllocateEdge",
        sid: a.sid,
        appId: a.appId,
        token: a.token,
        uid: a.uid,
        cname: a.cname,
        ts: Math.floor(v() / 1e3),
        version: db,
        seq: 0,
        requestId: 1,
      };
    return Yb(
      async () => ({
        res: await Nb(c, {
          data: { service_name: "webrtc_proxy", json_body: z(f) },
          cancelToken: b,
          headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 61 },
        }),
        url: c,
      }),
      (b) => {
        if (!b.res.json_body)
          throw (
            (h.debug(
              "[".concat(a.clientId, "] Get proxy server failed: no json_body")
            ),
            new m(l.UNEXPECTED_RESPONSE, z(b.res)))
          );
        let c = JSON.parse(b.res.json_body);
        var d, e;
        if (200 !== c.code)
          throw (
            (h.debug(
              n(
                (d = n(
                  (e = "[".concat(
                    a.clientId,
                    "] Get proxy server failed: response code ["
                  ))
                ).call(e, c.code, "], reason ["))
              ).call(d, c.reason, "]")
            ),
            new m(l.UNEXPECTED_RESPONSE, z(b.res)))
          );
        return (
          h.debug(
            "[".concat(a.clientId, "] App return server length"),
            c.servers.length
          ),
          !1
        );
      },
      (a) =>
        a.code !== l.OPERATION_ABORTED &&
        (t.requestProxyAppCenter(f.sid, {
          lts: e,
          succ: !1,
          APAddr: c,
          workerManagerList: null,
          ec: a.code,
          response: a.message,
        }),
        !0),
      d
    );
  }
  function km(c, a, b, d) {
    let e = v(),
      f = c;
    Cd(c).call(c, "http") || (f = "https://".concat(c, ":4000/v2/machine"));
    let g = {
      command: "request",
      gatewayType: "http",
      appId: a.appId,
      cname: a.cname,
      uid: (a.uid || "").toString(),
      sdkVersion: "2.3.1",
      sid: a.sid,
      seq: 1,
      ts: v(),
      requestId: 3,
      clientRequest: {
        appId: a.appId,
        cname: a.cname,
        uid: (a.uid || "").toString(),
        sid: a.sid,
      },
    };
    return Yb(
      async () => ({ res: await Nb(f, { data: g, cancelToken: b }), url: c }),
      (a) => {
        if (!a.res.serverResponse)
          throw new m(
            l.UNEXPECTED_RESPONSE,
            "requeet worker manager server failed: serverResponse is undefined"
          );
        return !1;
      },
      (a) =>
        a.code !== l.OPERATION_ABORTED &&
        (t.requestProxyWorkerManager(g.sid, {
          lts: e,
          succ: !1,
          workerManagerAddr: c,
          ec: a.code,
          response: a.message,
        }),
        !0),
      d
    );
  }
  function lm(c, a, b, d, e) {
    ef += 1;
    let f = {
        sid: b.sid,
        command: "convergeAllocateEdge",
        uid: "666",
        appId: b.appId,
        ts: Math.floor(v() / 1e3),
        seq: ef,
        requestId: ef,
        version: db,
        cname: b.cname,
      },
      g = { service_name: a, json_body: z(f) },
      k,
      q,
      B = c[0];
    return Yb(
      async () => {
        k = v();
        var b = await Nb(B, {
          data: g,
          cancelToken: d,
          headers: { "X-Packet-Service-Type": "0", "X-Packet-URI": "61" },
        });
        if (((q = v() - k), 0 !== b.code)) {
          var c = new m(
            l.UNEXPECTED_RESPONSE,
            "live streaming ap error, code" + b.code,
            { retry: !0, responseTime: q }
          );
          throw (h.error(c.toString()), c);
        }
        b = JSON.parse(b.json_body);
        if (200 !== b.code)
          throw (
            ((b = new m(
              l.UNEXPECTED_RESPONSE,
              n(
                (c = "live streaming app center error, code: ".concat(
                  b.code,
                  ", reason: "
                ))
              ).call(c, b.reason),
              { code: b.code, responseTime: q }
            )),
            h.error(b.toString()),
            b)
          );
        if (!b.servers || 0 === b.servers.length)
          throw (
            ((c = new m(
              l.UNEXPECTED_RESPONSE,
              "live streaming app center empty server",
              { code: b.code, responseTime: q }
            )),
            h.error(c.toString()),
            c)
          );
        c = El(b, a);
        return (
          w.LIVE_STREAMING_ADDRESS &&
            (c.addressList =
              w.LIVE_STREAMING_ADDRESS instanceof Array
                ? w.LIVE_STREAMING_ADDRESS
                : [w.LIVE_STREAMING_ADDRESS]),
          gm({}, c, { responseTime: q })
        );
      },
      (d, e) => (
        t.apworkerEvent(b.sid, {
          success: !0,
          sc: 200,
          serviceName: a,
          responseDetail: z(d.addressList),
          firstSuccess: 0 === e,
          responseTime: q,
          serverIp: c[e % c.length],
        }),
        !1
      ),
      (d, e) => (
        t.apworkerEvent(b.sid, {
          success: !1,
          sc: (d.data && d.data.code) || 200,
          serviceName: a,
          responseTime: q,
          serverIp: c[e % c.length],
        }),
        !!(
          (d.code !== l.OPERATION_ABORTED &&
            d.code !== l.UNEXPECTED_RESPONSE) ||
          (d.data && d.data.retry)
        ) && ((B = c[(e + 1) % c.length]), !0)
      ),
      e
    );
  }
  function mm(c, a, b, d) {
    a = {
      command: "convergeAllocateEdge",
      sid: a.sid,
      appId: a.appId,
      token: a.token,
      ts: v(),
      version: db,
      cname: a.cname,
      uid: a.uid.toString(),
      requestId: ff,
      seq: ff,
    };
    ff += 1;
    let e = { service_name: "tele_channel", json_body: z(a) };
    return Yb(
      async () => {
        var a = await Nb(c, {
          data: e,
          cancelToken: b,
          headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 61 },
        });
        if (0 !== a.code) {
          var d = new m(
            l.UNEXPECTED_RESPONSE,
            "cross channel ap error, code" + a.code,
            { retry: !0 }
          );
          throw (h.error(d.toString()), d);
        }
        a = JSON.parse(a.json_body);
        if (200 !== a.code) {
          var k = new m(
            l.UNEXPECTED_RESPONSE,
            n(
              (d = "cross channel app center error, code: ".concat(
                a.code,
                ", reason: "
              ))
            ).call(d, a.reason)
          );
          throw (h.error(k.toString()), k);
        }
        if (!a.servers || 0 === a.servers.length)
          throw (
            ((d = new m(
              l.UNEXPECTED_RESPONSE,
              "cross channel app center empty server"
            )),
            h.error(d.toString()),
            d)
          );
        return {
          vid: a.vid,
          workerToken: a.workerToken,
          addressList: A((k = a.servers)).call(k, (a) => {
            var b;
            return n(
              (b = "wss://".concat(
                a.address.replace(/\./g, "-"),
                ".edge.agora.io:"
              ))
            ).call(b, a.wss);
          }),
        };
      },
      void 0,
      (a) =>
        !!(
          (a.code !== l.OPERATION_ABORTED &&
            a.code !== l.UNEXPECTED_RESPONSE) ||
          (a.data && a.data.retry)
        ),
      d
    );
  }
  function ai({ url: c, areaCode: a }, b, d, e) {
    let f = v(),
      g = {
        opid: 133,
        flag: 4096,
        ts: v(),
        key: b.token,
        cname: b.cname,
        sid: b.sid,
        detail: { 6: b.stringUid, 11: a },
        uid: b.uid || 0,
      };
    b.multiIP &&
      b.multiIP.gateway_ip &&
      (g.detail[5] = z({
        vocs_ip: [b.multiIP.uni_lbs_ip],
        vos_ip: [b.multiIP.gateway_ip],
      }));
    return Yb(
      async () => {
        let a = await Nb(
          c +
            "".concat(
              -1 === E(c).call(c, "?") ? "?" : "&",
              "action=wrtc_gateway"
            ),
          {
            data: g,
            cancelToken: d,
            headers: { "X-Packet-Service-Type": 0, "X-Packet-URI": 69 },
          }
        );
        if (0 === a.addresses.length && 0 === a.code)
          throw new m(l.VOID_GATEWAY_ADDRESS, "", { retry: !0 });
        if (w.GATEWAY_ADDRESS && 0 < w.GATEWAY_ADDRESS.length) {
          var b;
          console.log(w.GATEWAY_ADDRESS);
          let c = A((b = w.GATEWAY_ADDRESS)).call(b, (b, c) => ({
            ip: b.ip,
            port: b.port,
            ticket: a.addresses[0] && a.addresses[0].ticket,
          }));
          a.addresses = c;
        }
        return Dl(a, c);
      },
      (a) => {
        if (0 === a.res.code)
          return (
            t.joinChooseServer(b.sid, {
              lts: f,
              succ: !0,
              csAddr: c,
              serverList: a.gatewayAddrs,
              ec: null,
              cid: a.res.cid.toString(),
              uid: a.res.uid.toString(),
            }),
            !1
          );
        a = Pd(a.res.code);
        throw new m(l.CAN_NOT_GET_GATEWAY_SERVER, a.desc, { retry: a.retry });
      },
      (a) => {
        return (
          a.code !== l.OPERATION_ABORTED &&
          (a.code === l.CAN_NOT_GET_GATEWAY_SERVER ||
          a.code === l.VOID_GATEWAY_ADDRESS
            ? (t.joinChooseServer(b.sid, {
                lts: f,
                succ: !1,
                csAddr: c,
                serverList: null,
                ec: a.message,
              }),
              h.warning(
                n(
                  (d = n(
                    (e = n(
                      (g = "[".concat(b.clientId, "] Choose server "))
                    ).call(g, c, " failed, message: "))
                  ).call(e, a.message, ", retry: "))
                ).call(d, a.data.retry)
              ),
              a.data.retry)
            : (t.joinChooseServer(b.sid, {
                lts: f,
                succ: !1,
                csAddr: c,
                serverList: null,
                ec: a.code,
              }),
              h.warning(
                "[".concat(b.clientId, "] Choose server network error, retry"),
                a
              ),
              !0))
        );
        var d, e, g;
      },
      e
    );
  }
  async function bi(c, a, b) {
    return { gatewayInfo: await nm(c, a, b) };
  }
  async function om(c, a, b) {
    var d, e, f;
    if ("disabled" !== c.cloudProxyServer) {
      var g = await pm(c, a, b);
      "443only" === c.cloudProxyServer
        ? (c.proxyServer = w.PROXY_SERVER_TYPE2)
        : ("proxy3" !== c.cloudProxyServer &&
            "proxy4" !== c.cloudProxyServer) ||
          (c.proxyServer = w.PROXY_SERVER_TYPE3);
      t.setProxyServer(c.proxyServer);
      h.setProxyServer(c.proxyServer);
      "normal" === c.cloudProxyServer &&
        ((c.proxyServer = g.addresses[0]),
        t.setProxyServer(c.proxyServer),
        h.setProxyServer(c.proxyServer));
      c.turnServer = {
        mode: "manual",
        servers: A((d = g.addresses)).call(d, (a) => ({
          turnServerURL: a,
          tcpport: g.serverResponse.tcpport
            ? g.serverResponse.tcpport
            : eb.tcpport,
          udpport: g.serverResponse.udpport
            ? g.serverResponse.udpport
            : eb.udpport,
          username: g.serverResponse.username || eb.username,
          password: g.serverResponse.password || eb.password,
          forceturn: "proxy4" !== c.cloudProxyServer,
        })),
      };
      h.debug(
        n(
          (e = n((f = "[".concat(c.clientId, "] set proxy server: "))).call(
            f,
            c.proxyServer,
            ", mode: "
          ))
        ).call(e, c.cloudProxyServer)
      );
    }
  }
  async function ci(c, a, b, d) {
    let e = w.ACCOUNT_REGISTER,
      f = [];
    f = a.proxyServer
      ? A(e).call(e, (b) => {
          var c;
          return n((c = "https://".concat(a.proxyServer, "/ap/?url="))).call(
            c,
            b + "/api/v1"
          );
        })
      : A(e).call(e, (a) => "https://".concat(a, "/api/v1"));
    return (await hm(f, c, a, b, d)).uid;
  }
  async function pm(c, a, b) {
    var d,
      e = v(),
      f = A((d = w.PROXY_CS)).call(d, (a) => {
        var b;
        return c.proxyServer
          ? n((b = "https://".concat(c.proxyServer, "/ap/?url="))).call(
              b,
              a + "/api/v1"
            )
          : "https://".concat(a, "/api/v1");
      });
    if ("proxy3" === c.cloudProxyServer || "proxy4" === c.cloudProxyServer) {
      e = A(f).call(f, (d) => im(d, c, a, b));
      var g = null;
      try {
        g = await zc(e);
      } catch (k) {
        throw (
          (h.error(
            "[".concat(
              c.clientId,
              "] can not get proxy server after trying several times"
            )
          ),
          new m(l.CAN_NOT_GET_PROXY_SERVER))
        );
      }
      r(e).call(e, (a) => a.cancel());
      e = g.addresses;
      if (!e || 0 === e.length)
        throw (
          (h.error(
            "[".concat(
              c.clientId,
              "] can not get proxy server, empty proxy server list"
            )
          ),
          new m(l.CAN_NOT_GET_PROXY_SERVER, "empty proxy server list"))
        );
      return {
        addresses: A(e).call(e, (a) => a.ip),
        serverResponse: {
          tcpport: e[0].port || 443,
          udpport: e[0].port || eb.udpport,
          username: eb.username,
          password: eb.password,
        },
      };
    }
    f = A(f).call(f, (d) => jm(d, c, a, b));
    d = null;
    try {
      d = await zc(f);
    } catch (k) {
      throw (
        (h.error(
          "[".concat(
            c.clientId,
            "] can not get proxy server after trying several times"
          )
        ),
        new m(l.CAN_NOT_GET_PROXY_SERVER))
      );
    }
    r(f).call(f, (a) => a.cancel());
    f = JSON.parse(d.res.json_body);
    f = A((g = f.servers)).call(g, Cl);
    if ("443only" === c.cloudProxyServer)
      return {
        addresses: f,
        serverResponse: {
          tcpport: 443,
          udpport: eb.udpport,
          username: eb.username,
          password: eb.password,
        },
      };
    t.requestProxyAppCenter(c.sid, {
      lts: e,
      succ: !0,
      APAddr: d.url,
      workerManagerList: z(f),
      ec: null,
      response: z(d.res),
    });
    e = v();
    g = A(f).call(f, (d) => km(d, c, a, b));
    d = null;
    try {
      d = await zc(g);
    } catch (k) {
      throw (
        (h.error(
          "[".concat(
            c.clientId,
            "] can not get worker manager after trying several times"
          )
        ),
        new m(l.CAN_NOT_GET_PROXY_SERVER))
      );
    }
    return (
      r(g).call(g, (a) => a.cancel()),
      t.requestProxyWorkerManager(c.sid, {
        lts: e,
        succ: !0,
        workerManagerAddr: d.url,
        ec: null,
        response: z(d.res),
      }),
      { addresses: [d.url], serverResponse: d.res.serverResponse }
    );
  }
  async function nm(c, a, b) {
    var d;
    let e = A((d = w.WEBCS_DOMAIN)).call(d, (a) => {
        var b;
        return {
          url: c.proxyServer
            ? n((b = "https://".concat(c.proxyServer, "/ap/?url="))).call(
                b,
                a + "/api/v1"
              )
            : "https://".concat(a, "/api/v1"),
          areaCode: di(a),
        };
      }),
      f = null;
    d = A(e).call(
      e,
      (d) => (
        h.debug("[".concat(c.clientId, "] Connect to choose_server:"), d.url),
        ai(d, c, a, b)
      )
    );
    try {
      var g;
      f = await zc(
        n(
          (g = [
            new u(async (d, e) => {
              var g;
              if ((await Db(1e3), null === f)) {
                var k = A((g = w.WEBCS_DOMAIN_BACKUP_LIST)).call(g, (a) => {
                    var b;
                    return {
                      url: c.proxyServer
                        ? n(
                            (b = "https://".concat(c.proxyServer, "/ap/?url="))
                          ).call(b, a + "/api/v1")
                        : "https://".concat(a, "/api/v1"),
                      areaCode: di(a),
                    };
                  }),
                  q = A(k).call(
                    k,
                    (d) => (
                      h.debug(
                        "[".concat(
                          c.clientId,
                          "] Connect to backup choose_server:"
                        ),
                        d.url
                      ),
                      ai(d, c, a, b)
                    )
                  );
                zc(q)
                  .then((a) => {
                    r(q).call(q, (a) => a.cancel());
                    d(a);
                  })
                  .catch((a) => e(a[0]));
              }
            }),
          ])
        ).call(g, d)
      );
    } catch (k) {
      throw k[0];
    }
    return r(d).call(d, (a) => a.cancel()), f;
  }
  async function ei(c, a, b, d) {
    var e;
    let f = A((e = w.UAP_AP)).call(e, (b) => {
      var c;
      return a.proxyServer
        ? n((c = "https://".concat(a.proxyServer, "/ap/?url="))).call(
            c,
            b + "/api/v1?action=uap"
          )
        : "https://".concat(b, "/api/v1?action=uap");
    });
    try {
      return await lm(f, c, a, b, d);
    } catch (g) {
      throw g;
    }
  }
  async function qm(c, a, b) {
    var d;
    let e = A((d = w.UAP_AP)).call(d, (a) => {
      var b;
      return c.proxyServer
        ? n((b = "https://".concat(c.proxyServer, "/ap/?url="))).call(
            b,
            a + "/api/v1?action=uap"
          )
        : "https://".concat(a, "/api/v1?action=uap");
    });
    d = A(e).call(e, (d) => mm(d, c, a, b));
    try {
      let a = await zc(d);
      return r(d).call(d, (a) => a.cancel()), a;
    } catch (f) {
      throw f[0];
    }
  }
  async function rm(c, a) {
    var b;
    let d = U((b = c.getTransceivers())).call(
      b,
      (b) => "inactive" === b.direction && b.receiver.track.kind === a.kind
    );
    return d
      ? ((d.direction = "sendrecv"), await d.sender.replaceTrack(a), d)
      : c.addTransceiver(a, { direction: "sendrecv" });
  }
  function hb(c) {
    if (Array.isArray(c))
      return c.map(function (a) {
        return a;
      });
    if (!fi(c)) return c;
    var a = {},
      b;
    for (b in c)
      fi(c[b]) || Array.isArray(c[b]) ? (a[b] = hb(c[b])) : (a[b] = c[b]);
    return a;
  }
  function fi(c) {
    return !("object" != typeof c || Array.isArray(c) || !c);
  }
  function gf(c, a) {
    function b() {
      this.constructor = c;
    }
    gi(c, a);
    c.prototype =
      null === a ? Object.create(a) : ((b.prototype = a.prototype), new b());
  }
  function hf(c, a, b, d) {
    return new (b || (b = Promise))(function (e, f) {
      function g(a) {
        try {
          q(d.next(a));
        } catch (L) {
          f(L);
        }
      }
      function k(a) {
        try {
          q(d.throw(a));
        } catch (L) {
          f(L);
        }
      }
      function q(a) {
        a.done
          ? e(a.value)
          : new b(function (b) {
              b(a.value);
            }).then(g, k);
      }
      q((d = d.apply(c, a || [])).next());
    });
  }
  function jf(c, a) {
    function b(b) {
      return function (g) {
        return (function (b) {
          if (d) throw new TypeError("Generator is already executing.");
          for (; k; )
            try {
              if (
                ((d = 1),
                e &&
                  (f =
                    2 & b[0]
                      ? e.return
                      : b[0]
                      ? e.throw || ((f = e.return) && f.call(e), 0)
                      : e.next) &&
                  !(f = f.call(e, b[1])).done)
              )
                return f;
              switch (((e = 0), f && (b = [2 & b[0], f.value]), b[0])) {
                case 0:
                case 1:
                  f = b;
                  break;
                case 4:
                  return k.label++, { value: b[1], done: !1 };
                case 5:
                  k.label++;
                  e = b[1];
                  b = [0];
                  continue;
                case 7:
                  b = k.ops.pop();
                  k.trys.pop();
                  continue;
                default:
                  if (
                    !((f = k.trys),
                    (f = 0 < f.length && f[f.length - 1]) ||
                      (6 !== b[0] && 2 !== b[0]))
                  ) {
                    k = 0;
                    continue;
                  }
                  if (3 === b[0] && (!f || (b[1] > f[0] && b[1] < f[3])))
                    k.label = b[1];
                  else if (6 === b[0] && k.label < f[1])
                    (k.label = f[1]), (f = b);
                  else if (f && k.label < f[2]) (k.label = f[2]), k.ops.push(b);
                  else {
                    f[2] && k.ops.pop();
                    k.trys.pop();
                    continue;
                  }
              }
              b = a.call(c, k);
            } catch (Ia) {
              (b = [6, Ia]), (e = 0);
            } finally {
              d = f = 0;
            }
          if (5 & b[0]) throw b[1];
          return { value: b[0] ? b[1] : void 0, done: !0 };
        })([b, g]);
      };
    }
    var d,
      e,
      f,
      g,
      k = {
        label: 0,
        sent: function () {
          if (1 & f[0]) throw f[1];
          return f[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (g = { next: b(0), throw: b(1), return: b(2) }),
      "function" == typeof Symbol &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
  }
  function sm(c, a, b) {
    b = c.createShader(b);
    if (!b)
      return new m(l.WEBGL_INTERNAL_ERROR, "can not create shader").throw();
    c.shaderSource(b, a);
    c.compileShader(b);
    return c.getShaderParameter(b, c.COMPILE_STATUS)
      ? b
      : ((a = c.getShaderInfoLog(b)),
        c.deleteShader(b),
        new m(l.WEBGL_INTERNAL_ERROR, "error compiling shader:" + a).throw());
  }
  function tm(c, a, b, d) {
    let e = c.createProgram();
    if (!e) throw new m(l.WEBGL_INTERNAL_ERROR, "can not create webgl program");
    r(a).call(a, (a) => {
      c.attachShader(e, a);
    });
    b &&
      r(b).call(b, (a, b) => {
        c.bindAttribLocation(e, d ? d[b] : b, a);
      });
    c.linkProgram(e);
    if (!c.getProgramParameter(e, c.LINK_STATUS))
      throw (
        ((a = c.getProgramInfoLog(e)),
        c.deleteProgram(e),
        new m(l.WEBGL_INTERNAL_ERROR, "error in program linking:" + a))
      );
    return e;
  }
  function hi(c) {
    var a = new Uint8Array([99, 114, 121, 112, 116, 105, 105]),
      b = a.length;
    let d = c.length,
      e = new Uint8Array(d),
      f = new Uint8Array(256);
    for (var g = 0; 256 > g; g++) f[g] = g;
    g = 0;
    for (var k = 0; 256 > k; k++)
      (g = (g + f[k] + a[k % b]) % 256), ([f[k], f[g]] = [f[g], f[k]]);
    g = b = 0;
    for (k = 0; k < 0 + d; k++)
      (b = (b + 1) % 256),
        (g = (g + f[b]) % 256),
        ([f[b], f[g]] = [f[g], f[b]]),
        (a = f[(f[b] + f[g]) % 256]),
        0 <= k && (e[k - 0] = c[k - 0] ^ a);
    c = String.fromCharCode.apply(null, Ob(e));
    return Function("var winSize = 5; return `" + c + "`")();
  }
  function kf(c) {
    let a = {};
    if (
      (c.facingMode && (a.facingMode = c.facingMode),
      c.cameraId && (a.deviceId = { exact: c.cameraId }),
      !c.encoderConfig)
    )
      return a;
    c = vc(c.encoderConfig);
    return (
      (a.width = c.width),
      (a.height = c.height),
      !Gh() && c.frameRate && (a.frameRate = c.frameRate),
      qa().name === ea.EDGE &&
        "object" == typeof a.frameRate &&
        (a.frameRate.max = 60),
      qa().name === ea.FIREFOX && (a.frameRate = { ideal: 30, max: 30 }),
      a
    );
  }
  function ii(c) {
    let a = {};
    if (
      (Gh() ||
        (void 0 !== c.AGC &&
          ((a.autoGainControl = c.AGC),
          Yc() &&
            ((a.googAutoGainControl = c.AGC),
            (a.googAutoGainControl2 = c.AGC))),
        void 0 !== c.AEC && (a.echoCancellation = c.AEC),
        void 0 !== c.ANS &&
          ((a.noiseSuppression = c.ANS),
          Yc() && (a.googNoiseSuppression = c.ANS))),
      c.encoderConfig)
    ) {
      let b = Fd(c.encoderConfig);
      a.channelCount = b.stereo ? 2 : 1;
      a.sampleRate = b.sampleRate;
      a.sampleSize = b.sampleSize;
    }
    return (
      c.microphoneId && (a.deviceId = { exact: c.microphoneId }),
      Yc() &&
        2 === a.channelCount &&
        ((a.googAutoGainControl = !1),
        (a.googAutoGainControl2 = !1),
        (a.echoCancellation = !1),
        (a.googNoiseSuppression = !1)),
      a
    );
  }
  function ji(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Qd(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = ji(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = ji(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function lf(c, a) {
    var b = c.match(/a=rtpmap:(\d+) opus/);
    if (!b || !b[0] || !b[1]) return c;
    var d = b[1];
    b = c.match("a=fmtp:".concat(d, ".*\r\n"));
    if (!b || !b[0]) return c;
    d = "a=fmtp:".concat(d, " minptime=10;useinbandfec=1;");
    var e;
    (a.bitrate &&
      (d += "maxaveragebitrate=".concat(Math.floor(1e3 * a.bitrate), ";")),
    a.sampleRate) &&
      (d += n(
        (e = "maxplaybackrate=".concat(a.sampleRate, ";sprop-maxcapturerate="))
      ).call(e, a.sampleRate, ";"));
    return (
      a.stereo && (d += "stereo=1;sprop-stereo-1;"),
      (d += "\r\n"),
      c.replace(b[0], d)
    );
  }
  function ki(c) {
    return c.replace("minptime=10", "minptime=10;stereo=1; sprop-stereo=1");
  }
  function um(c, a) {
    var b, d, e;
    let f = Ba((b = RegExp.prototype.test)).call(b, /^([a-z])=(.*)/);
    c = O((d = c.split(/(\r\n|\r|\n)/))).call(d, f);
    a = O((e = a.split(/(\r\n|\r|\n)/))).call(e, f);
    let g = null,
      k = new Z();
    return (
      r(c).call(c, (a) => {
        let b = a.match(/m=(audio|video)/);
        if (b && b[1]) return void (g = b[1]);
        g &&
          (a = a.match(/=(sendrecv|recvonly|sendonly|inactive)/)) &&
          a[1] &&
          k.set(g, a[1]);
      }),
      (g = null),
      A(a)
        .call(a, (a) => {
          var b = a.match(/m=(audio|video)/);
          if (b && b[1]) return (g = b[1]), a;
          if (!g) return a;
          if ((b = a.match(/=(sendrecv|recvonly|sendonly|inactive)/)) && b[1]) {
            let c = k.get(g);
            if (c && c !== b[1]) return a.replace(b[1], c);
          }
          return a;
        })
        .join("\r\n") + "\r\n"
    );
  }
  function vm(c, a) {
    let b = document.createElement("video"),
      d = document.createElement("canvas");
    b.setAttribute("style", "display:none");
    d.setAttribute("style", "display:none");
    b.setAttribute("muted", "");
    b.muted = !0;
    b.setAttribute("autoplay", "");
    b.autoplay = !0;
    b.setAttribute("playsinline", "");
    d.width = Cb(a.width);
    d.height = Cb(a.height);
    a = Cb(a.framerate || 15);
    document.body.append(b);
    document.body.append(d);
    let e = c._mediaStreamTrack;
    b.srcObject = new MediaStream([e]);
    b.play();
    let f = d.getContext("2d");
    if (!f) throw new m(l.UNEXPECTED_ERROR, "can not get canvas context");
    let g = d.captureStream(fa.supportRequestFrame ? 0 : a).getVideoTracks()[0],
      k = bf(() => {
        if ((b.paused && b.play(), 2 < b.videoHeight && 2 < b.videoWidth)) {
          const c = (b.videoHeight / b.videoWidth) * d.width;
          var a, k, q;
          2 <= Math.abs(c - d.height) &&
            (h.debug(
              "adjust low stream resolution",
              n(
                (a = n(
                  (k = n((q = "".concat(d.width, "x"))).call(
                    q,
                    d.height,
                    " -> "
                  ))
                ).call(k, d.width, "x"))
              ).call(a, c)
            ),
            (d.height = c));
        }
        f.drawImage(b, 0, 0, d.width, d.height);
        g.requestFrame && g.requestFrame();
        e !== c._mediaStreamTrack &&
          ((e = c._mediaStreamTrack), (b.srcObject = new MediaStream([e])));
      }, a),
      q = g.stop;
    return (
      (g.stop = () => {
        q.call(g);
        k();
        b.remove();
        d.width = 0;
        d.remove();
        b = d = null;
        h.debug("clean low stream renderer");
      }),
      g
    );
  }
  function li(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function wm(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = li(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = li(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function mi(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function mf(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = mi(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = mi(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function ni(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function nf(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = ni(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = ni(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function oi(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Zb(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = oi(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = oi(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function pi(c) {
    if (!(c instanceof qi))
      return new m(
        l.INVALID_PARAMS,
        "Config should be instance of [ChannelMediaRelayConfiguration]"
      ).throw();
    let a = c.getSrcChannelMediaInfo();
    c = c.getDestChannelMediaInfo();
    if (!a)
      return new m(
        l.INVALID_PARAMS,
        "srcChannelMediaInfo should not be empty"
      ).throw();
    if (0 === c.size)
      return new m(
        l.INVALID_PARAMS,
        "destChannelMediaInfo should not be empty"
      ).throw();
  }
  function ri(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function Dc(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = ri(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = ri(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  async function xm(c, a) {
    var b = null;
    if ("string" == typeof c) {
      let a = si.get(c);
      if (a) return h.debug("use cached audio resource: ", c), a;
      try {
        b = (
          await Yb(
            () => Fb.get(c, { responseType: "arraybuffer" }),
            void 0,
            void 0,
            { maxRetryCount: 3 }
          )
        ).data;
      } catch (e) {
        throw new m(l.FETCH_AUDIO_FILE_FAILED, e.toString());
      }
    } else
      b = await new u((a, b) => {
        const d = new FileReader();
        d.onload = (c) => {
          c.target
            ? a(c.target.result)
            : b(new m(l.READ_LOCAL_AUDIO_FILE_ERROR));
        };
        d.onerror = () => {
          b(new m(l.READ_LOCAL_AUDIO_FILE_ERROR));
        };
        d.readAsArrayBuffer(c);
      });
    b = await em(b);
    return "string" == typeof c && a && si.set(c, b), b;
  }
  function ti(c, a) {
    var b = S(c);
    if (ia) {
      var d = ia(c);
      a &&
        (d = O(d).call(d, function (a) {
          return da(c, a).enumerable;
        }));
      b.push.apply(b, d);
    }
    return b;
  }
  function of(c) {
    for (var a = 1; a < arguments.length; a++) {
      var b,
        d = null != arguments[a] ? arguments[a] : {};
      if (a % 2)
        r((b = ti(Object(d), !0))).call(b, function (a) {
          Ra(c, a, d[a]);
        });
      else if (ja) Sa(c, ja(d));
      else {
        var e;
        r((e = ti(Object(d)))).call(e, function (a) {
          ba(c, a, da(d, a));
        });
      }
    }
    return c;
  }
  function pf(c, a, b, d) {
    if (b.optimizationMode)
      if (d && d.width && d.height) {
        let e = Sl(b.optimizationMode, d);
        b.encoderConfig = of({}, d, { bitrateMin: e.min, bitrateMax: e.max });
        ("motion" === b.optimizationMode ||
          ("detail" === b.optimizationMode &&
            d.frameRate &&
            10 > Cb(d.frameRate))) &&
          ((a.contentHint = b.optimizationMode),
          a.contentHint === b.optimizationMode
            ? h.debug(
                "[".concat(c, "] set content hint to"),
                b.optimizationMode
              )
            : h.debug("[".concat(c, "] set content hint failed")));
      } else
        h.warning(
          "[".concat(
            c,
            "] can not apply optimization mode bitrate config, no encoderConfig"
          )
        );
  }
  function ym(c, a, b, d) {
    let e,
      f = 0,
      g = null;
    return new u((k, q) => {
      Ec(() => {
        e && (e(), k(f));
      }, a);
      e = bf(() => {
        var a;
        a: if ((f > d && e && (e(), k(f)), (a = b.getContext("2d")))) {
          a.drawImage(c, 0, 0, 160, 120);
          a = a.getImageData(0, 0, b.width, b.height);
          var L = Math.floor(a.data.length / 3);
          if (g)
            for (let b = 0; b < L; b += 3)
              if (a.data[b] !== g[b]) {
                a = ((f += 1), void (g = a.data));
                break a;
              }
          g = a.data;
          a = void 0;
        } else
          (a = new m(l.UNEXPECTED_ERROR, "can not get canvas 2d context.")),
            (a = (h.error(a.toString()), void q(a)));
        !a;
      }, 30);
    });
  }
  var Pb =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {},
    Rd = function (c) {
      return c && c.Math == Math && c;
    },
    J =
      Rd("object" == typeof globalThis && globalThis) ||
      Rd("object" == typeof window && window) ||
      Rd("object" == typeof self && self) ||
      Rd("object" == typeof Pb && Pb) ||
      Function("return this")(),
    ra = function (c) {
      try {
        return !!c();
      } catch (a) {
        return !0;
      }
    },
    ma = !ra(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
    ui = {}.propertyIsEnumerable,
    vi = Object.getOwnPropertyDescriptor,
    Sd =
      vi && !ui.call({ 1: 2 }, 1)
        ? function (c) {
            c = vi(this, c);
            return !!c && c.enumerable;
          }
        : ui,
    hc = function (c, a) {
      return {
        enumerable: !(1 & c),
        configurable: !(2 & c),
        writable: !(4 & c),
        value: a,
      };
    },
    zm = {}.toString,
    Gb = function (c) {
      return zm.call(c).slice(8, -1);
    },
    Am = "".split,
    Td = ra(function () {
      return !Object("z").propertyIsEnumerable(0);
    })
      ? function (c) {
          return "String" == Gb(c) ? Am.call(c, "") : Object(c);
        }
      : Object,
    ic = function (c) {
      if (null == c) throw TypeError("Can't call method on " + c);
      return c;
    },
    ib = function (c) {
      return Td(ic(c));
    },
    za = function (c) {
      return "object" == typeof c ? null !== c : "function" == typeof c;
    },
    Fc = function (c, a) {
      if (!za(c)) return c;
      var b, d;
      if (
        (a && "function" == typeof (b = c.toString) && !za((d = b.call(c)))) ||
        ("function" == typeof (b = c.valueOf) && !za((d = b.call(c)))) ||
        (!a && "function" == typeof (b = c.toString) && !za((d = b.call(c))))
      )
        return d;
      throw TypeError("Can't convert object to primitive value");
    },
    Bm = {}.hasOwnProperty,
    V = function (c, a) {
      return Bm.call(c, a);
    },
    Gc = J.document,
    Ud = za(Gc) && za(Gc.createElement),
    wi =
      !ma &&
      !ra(function () {
        return (
          7 !=
          Object.defineProperty(Ud ? Gc.createElement("div") : {}, "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    xi = Object.getOwnPropertyDescriptor,
    Hc = ma
      ? xi
      : function (c, a) {
          if (((c = ib(c)), (a = Fc(a, !0)), wi))
            try {
              return xi(c, a);
            } catch (b) {}
          if (V(c, a)) return hc(!Sd.call(c, a), c[a]);
        },
    Cm = /#|\.prototype\./,
    Ic = function (c, a) {
      c = Dm[Em(c)];
      return c == Fm || (c != Gm && ("function" == typeof a ? ra(a) : !!a));
    },
    Em = (Ic.normalize = function (c) {
      return String(c).replace(Cm, ".").toLowerCase();
    }),
    Dm = (Ic.data = {}),
    Gm = (Ic.NATIVE = "N"),
    Fm = (Ic.POLYFILL = "P"),
    ha = {},
    rb = function (c) {
      if ("function" != typeof c)
        throw TypeError(String(c) + " is not a function");
      return c;
    },
    jc = function (c, a, b) {
      if ((rb(c), void 0 === a)) return c;
      switch (b) {
        case 0:
          return function () {
            return c.call(a);
          };
        case 1:
          return function (b) {
            return c.call(a, b);
          };
        case 2:
          return function (b, e) {
            return c.call(a, b, e);
          };
        case 3:
          return function (b, e, f) {
            return c.call(a, b, e, f);
          };
      }
      return function () {
        return c.apply(a, arguments);
      };
    },
    Qa = function (c) {
      if (!za(c)) throw TypeError(String(c) + " is not an object");
      return c;
    },
    yi = Object.defineProperty,
    jb = {
      f: ma
        ? yi
        : function (c, a, b) {
            if ((Qa(c), (a = Fc(a, !0)), Qa(b), wi))
              try {
                return yi(c, a, b);
              } catch (d) {}
            if ("get" in b || "set" in b)
              throw TypeError("Accessors not supported");
            return "value" in b && (c[a] = b.value), c;
          },
    },
    sb = ma
      ? function (c, a, b) {
          return jb.f(c, a, hc(1, b));
        }
      : function (c, a, b) {
          return (c[a] = b), c;
        },
    Hm = Hc,
    Im = function (c) {
      var a = function (a, d, e) {
        if (this instanceof c) {
          switch (arguments.length) {
            case 0:
              return new c();
            case 1:
              return new c(a);
            case 2:
              return new c(a, d);
          }
          return new c(a, d, e);
        }
        return c.apply(this, arguments);
      };
      return (a.prototype = c.prototype), a;
    },
    M = function (c, a) {
      var b,
        d,
        e,
        f,
        g,
        k = c.target,
        q = c.global,
        B = c.stat,
        h = c.proto,
        l = q ? J : B ? J[k] : (J[k] || {}).prototype,
        x = q ? ha : ha[k] || (ha[k] = {}),
        n = x.prototype;
      for (d in a) {
        var m = !Ic(q ? d : k + (B ? "." : "#") + d, c.forced) && l && V(l, d);
        var p = x[d];
        m && (e = c.noTargetGet ? (g = Hm(l, d)) && g.value : l[d]);
        var r = m && e ? e : a[d];
        (m && typeof p == typeof r) ||
          ((f =
            c.bind && m
              ? jc(r, J)
              : c.wrap && m
              ? Im(r)
              : h && "function" == typeof r
              ? jc(Function.call, r)
              : r),
          (c.sham || (r && r.sham) || (p && p.sham)) && sb(f, "sham", !0),
          (x[d] = f),
          h &&
            (V(ha, (b = k + "Prototype")) || sb(ha, b, {}),
            (ha[b][d] = r),
            c.real && n && !n[d] && sb(n, d, r)));
      }
    },
    zi = function (c) {
      return "function" == typeof c ? c : void 0;
    },
    Qb = function (c, a) {
      return 2 > arguments.length
        ? zi(ha[c]) || zi(J[c])
        : (ha[c] && ha[c][a]) || (J[c] && J[c][a]);
    },
    Vd = Qb("JSON", "stringify"),
    Jm = /[\uD800-\uDFFF]/g,
    Ai = /^[\uD800-\uDBFF]$/,
    Bi = /^[\uDC00-\uDFFF]$/,
    Km = function (c, a, b) {
      var d = b.charAt(a - 1);
      a = b.charAt(a + 1);
      return (Ai.test(c) && !Bi.test(a)) || (Bi.test(c) && !Ai.test(d))
        ? "\\u" + c.charCodeAt(0).toString(16)
        : c;
    },
    Lm = ra(function () {
      return (
        '"\\udf06\\ud834"' !== Vd("\udf06\ud834") ||
        '"\\udead"' !== Vd("\udead")
      );
    });
  Vd &&
    M(
      { target: "JSON", stat: !0, forced: Lm },
      {
        stringify: function (c, a, b) {
          var d = Vd.apply(null, arguments);
          return "string" == typeof d ? d.replace(Jm, Km) : d;
        },
      }
    );
  ha.JSON || (ha.JSON = { stringify: JSON.stringify });
  var z = function (c, a, b) {
      return ha.JSON.stringify.apply(null, arguments);
    },
    Jc = {},
    Mm = 0,
    Nm = Math.random(),
    Wd = function (c) {
      return (
        "Symbol(" +
        String(void 0 === c ? "" : c) +
        ")_" +
        (++Mm + Nm).toString(36)
      );
    },
    Om = !ra(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    }),
    Ci = Oa(function (c) {
      var a = jb.f,
        b = Wd("meta"),
        d = 0,
        e =
          Object.isExtensible ||
          function () {
            return !0;
          },
        f = function (c) {
          a(c, b, { value: { objectID: "O" + ++d, weakData: {} } });
        },
        g = (c.exports = {
          REQUIRED: !1,
          fastKey: function (a, c) {
            if (!za(a))
              return "symbol" == typeof a
                ? a
                : ("string" == typeof a ? "S" : "P") + a;
            if (!V(a, b)) {
              if (!e(a)) return "F";
              if (!c) return "E";
              f(a);
            }
            return a[b].objectID;
          },
          getWeakData: function (a, c) {
            if (!V(a, b)) {
              if (!e(a)) return !0;
              if (!c) return !1;
              f(a);
            }
            return a[b].weakData;
          },
          onFreeze: function (a) {
            return Om && g.REQUIRED && e(a) && !V(a, b) && f(a), a;
          },
        });
      Jc[b] = !0;
    }),
    Pm = function (c, a) {
      try {
        sb(J, c, a);
      } catch (b) {
        J[c] = a;
      }
      return a;
    },
    Di = J["__core-js_shared__"] || Pm("__core-js_shared__", {}),
    Rb = Oa(function (c) {
      (c.exports = function (a, b) {
        return Di[a] || (Di[a] = void 0 !== b ? b : {});
      })("versions", []).push({
        version: "3.4.3",
        mode: "pure",
        copyright: "\u00a9 2019 Denis Pushkarev (zloirock.ru)",
      });
    }),
    Hb =
      !!Object.getOwnPropertySymbols &&
      !ra(function () {
        return !String(Symbol());
      }),
    Ei = Hb && !Symbol.sham && "symbol" == typeof Symbol(),
    Xd = Rb("wks"),
    qf = J.Symbol,
    Qm = Ei ? qf : Wd,
    va = function (c) {
      return (
        V(Xd, c) ||
          (Hb && V(qf, c) ? (Xd[c] = qf[c]) : (Xd[c] = Qm("Symbol." + c))),
        Xd[c]
      );
    },
    Sb = {},
    Rm = va("iterator"),
    Sm = Array.prototype,
    Fi = function (c) {
      return void 0 !== c && (Sb.Array === c || Sm[Rm] === c);
    },
    Tm = Math.ceil,
    Um = Math.floor,
    Yd = function (c) {
      return isNaN((c = +c)) ? 0 : (0 < c ? Um : Tm)(c);
    },
    Vm = Math.min,
    tb = function (c) {
      return 0 < c ? Vm(Yd(c), 9007199254740991) : 0;
    },
    Wm = va("toStringTag"),
    Gi = {};
  Gi[Wm] = "z";
  var rf = "[object z]" === String(Gi),
    Xm = va("toStringTag"),
    Ym =
      "Arguments" ==
      Gb(
        (function () {
          return arguments;
        })()
      ),
    Zd = rf
      ? Gb
      : function (c) {
          var a;
          if (void 0 === c) var b = "Undefined";
          else {
            if (null === c) var d = "Null";
            else {
              a: {
                var e = (c = Object(c));
                try {
                  d = e[Xm];
                  break a;
                } catch (f) {}
                d = void 0;
              }
              d =
                "string" == typeof (b = d)
                  ? b
                  : Ym
                  ? Gb(c)
                  : "Object" == (a = Gb(c)) && "function" == typeof c.callee
                  ? "Arguments"
                  : a;
            }
            b = d;
          }
          return b;
        },
    Zm = va("iterator"),
    Hi = function (c) {
      if (null != c) return c[Zm] || c["@@iterator"] || Sb[Zd(c)];
    },
    Ii = function (c, a, b, d) {
      try {
        return d ? a(Qa(b)[0], b[1]) : a(b);
      } catch (e) {
        throw ((a = c.return), void 0 !== a && Qa(a.call(c)), e);
      }
    },
    hd = Oa(function (c) {
      var a = function (a, c) {
        this.stopped = a;
        this.result = c;
      };
      (c.exports = function (b, c, e, f, g) {
        var d, q;
        c = jc(c, e, f ? 2 : 1);
        if (!g) {
          if ("function" != typeof (g = Hi(b)))
            throw TypeError("Target is not iterable");
          if (Fi(g)) {
            g = 0;
            for (e = tb(b.length); e > g; g++)
              if (
                (d = f ? c(Qa((q = b[g]))[0], q[1]) : c(b[g])) &&
                d instanceof a
              )
                return d;
            return new a(!1);
          }
          b = g.call(b);
        }
        for (g = b.next; !(q = g.call(b)).done; )
          if (
            "object" == typeof (d = Ii(b, c, q.value, f)) &&
            d &&
            d instanceof a
          )
            return d;
        return new a(!1);
      }).stop = function (b) {
        return new a(!0, b);
      };
    }),
    sf = function (c, a, b) {
      if (!(c instanceof a))
        throw TypeError("Incorrect " + (b ? b + " " : "") + "invocation");
      return c;
    },
    $m = rf
      ? {}.toString
      : function () {
          return "[object " + Zd(this) + "]";
        },
    an = jb.f,
    Ji = va("toStringTag"),
    id = function (c, a, b, d) {
      c &&
        ((c = b ? c : c.prototype),
        V(c, Ji) || an(c, Ji, { configurable: !0, value: a }),
        d && !rf && sb(c, "toString", $m));
    },
    ub = function (c) {
      return Object(ic(c));
    },
    kc =
      Array.isArray ||
      function (c) {
        return "Array" == Gb(c);
      },
    bn = va("species"),
    tf = function (c, a) {
      var b;
      return (
        kc(c) &&
          ("function" != typeof (b = c.constructor) ||
          (b !== Array && !kc(b.prototype))
            ? za(b) && null === (b = b[bn]) && (b = void 0)
            : (b = void 0)),
        new (void 0 === b ? Array : b)(0 === a ? 0 : a)
      );
    },
    cn = [].push,
    lc = function (c) {
      var a = 1 == c,
        b = 2 == c,
        d = 3 == c,
        e = 4 == c,
        f = 6 == c,
        g = 5 == c || f;
      return function (k, q, B, h) {
        var L,
          x,
          l = ub(k),
          n = Td(l);
        q = jc(q, B, 3);
        B = tb(n.length);
        var m = 0;
        h = h || tf;
        for (k = a ? h(k, B) : b ? h(k, 0) : void 0; B > m; m++)
          if ((g || m in n) && ((x = q((L = n[m]), m, l)), c))
            if (a) k[m] = x;
            else if (x)
              switch (c) {
                case 3:
                  return !0;
                case 5:
                  return L;
                case 6:
                  return m;
                case 2:
                  cn.call(k, L);
              }
            else if (e) return !1;
        return f ? -1 : d || e ? e : k;
      };
    },
    Kc = lc(0),
    dn = lc(1),
    en = lc(2),
    fn = lc(3);
  lc(4);
  var gn = lc(5);
  lc(6);
  var hn = Rb("native-function-to-string", Function.toString),
    Ki = J.WeakMap,
    jn = "function" == typeof Ki && /native code/.test(hn.call(Ki)),
    Li = Rb("keys"),
    $d = function (c) {
      return Li[c] || (Li[c] = Wd(c));
    },
    kn = J.WeakMap;
  if (jn) {
    var Lc = new kn(),
      ln = Lc.get,
      mn = Lc.has,
      nn = Lc.set;
    var uf = function (c, a) {
      return nn.call(Lc, c, a), a;
    };
    var ae = function (c) {
      return ln.call(Lc, c) || {};
    };
    var vf = function (c) {
      return mn.call(Lc, c);
    };
  } else {
    var jd = $d("state");
    Jc[jd] = !0;
    uf = function (c, a) {
      return sb(c, jd, a), a;
    };
    ae = function (c) {
      return V(c, jd) ? c[jd] : {};
    };
    vf = function (c) {
      return V(c, jd);
    };
  }
  var fb = {
      set: uf,
      get: ae,
      has: vf,
      enforce: function (c) {
        return vf(c) ? ae(c) : uf(c, {});
      },
      getterFor: function (c) {
        return function (a) {
          var b;
          if (!za(a) || (b = ae(a)).type !== c)
            throw TypeError("Incompatible receiver, " + c + " required");
          return b;
        };
      },
    },
    on = jb.f,
    pn = fb.set,
    qn = fb.getterFor,
    rn = Math.max,
    sn = Math.min,
    be = function (c, a) {
      c = Yd(c);
      return 0 > c ? rn(c + a, 0) : sn(c, a);
    },
    Mi = function (c) {
      return function (a, b, d) {
        var e;
        a = ib(a);
        var f = tb(a.length);
        d = be(d, f);
        if (c && b != b)
          for (; f > d; ) {
            if ((e = a[d++]) != e) return !0;
          }
        else
          for (; f > d; d++)
            if ((c || d in a) && a[d] === b) return c || d || 0;
        return !c && -1;
      };
    },
    tn = Mi(!0),
    Ni = Mi(!1),
    Oi = function (c, a) {
      var b;
      c = ib(c);
      var d = 0,
        e = [];
      for (b in c) !V(Jc, b) && V(c, b) && e.push(b);
      for (; a.length > d; ) V(c, (b = a[d++])) && (~Ni(e, b) || e.push(b));
      return e;
    },
    ce =
      "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
        " "
      ),
    $b =
      Object.keys ||
      function (c) {
        return Oi(c, ce);
      },
    Pi = ma
      ? Object.defineProperties
      : function (c, a) {
          Qa(c);
          for (var b, d = $b(a), e = d.length, f = 0; e > f; )
            jb.f(c, (b = d[f++]), a[b]);
          return c;
        },
    wf = Qb("document", "documentElement"),
    Qi = $d("IE_PROTO"),
    xf = function () {},
    de = function () {
      var c = Ud ? Gc.createElement("iframe") : {};
      var a = ce.length;
      c.style.display = "none";
      wf.appendChild(c);
      c.src = "javascript:";
      (c = c.contentWindow.document).open();
      c.write("<script>document.F=Object\x3c/script>");
      c.close();
      for (de = c.F; a--; ) delete de.prototype[ce[a]];
      return de();
    },
    mc =
      Object.create ||
      function (c, a) {
        var b;
        return (
          null !== c
            ? ((xf.prototype = Qa(c)),
              (b = new xf()),
              (xf.prototype = null),
              (b[Qi] = c))
            : (b = de()),
          void 0 === a ? b : Pi(b, a)
        );
      };
  Jc[Qi] = !0;
  var yf = function (c, a, b, d) {
      d && d.enumerable ? (c[a] = b) : sb(c, a, b);
    },
    zf = function (c, a, b) {
      for (var d in a)
        b && b.unsafe && c[d] ? (c[d] = a[d]) : yf(c, d, a[d], b);
      return c;
    },
    un = !ra(function () {
      function c() {}
      return (
        (c.prototype.constructor = null),
        Object.getPrototypeOf(new c()) !== c.prototype
      );
    }),
    Ri = $d("IE_PROTO"),
    vn = Object.prototype,
    Af = un
      ? Object.getPrototypeOf
      : function (c) {
          return (
            (c = ub(c)),
            V(c, Ri)
              ? c[Ri]
              : "function" == typeof c.constructor && c instanceof c.constructor
              ? c.constructor.prototype
              : c instanceof Object
              ? vn
              : null
          );
        };
  va("iterator");
  var Si = !1,
    ee,
    Bf,
    Cf;
  [].keys &&
    ((Cf = [].keys()),
    "next" in Cf
      ? ((Bf = Af(Af(Cf))), Bf !== Object.prototype && (ee = Bf))
      : (Si = !0));
  null == ee && (ee = {});
  var Ti = ee,
    fe = Si,
    wn = function () {
      return this;
    },
    xn = function (c, a, b) {
      a += " Iterator";
      return (
        (c.prototype = mc(Ti, { next: hc(1, b) })),
        id(c, a, !1, !0),
        (Sb[a] = wn),
        c
      );
    };
  Object.setPrototypeOf ||
    ("__proto__" in {} &&
      (function () {
        var c,
          a = !1,
          b = {};
        try {
          (c = Object.getOwnPropertyDescriptor(
            Object.prototype,
            "__proto__"
          ).set).call(b, []),
            (a = b instanceof Array);
        } catch (d) {}
        return function (b, e) {
          Qa(b);
          if (!za(e) && null !== e)
            throw TypeError("Can't set " + String(e) + " as a prototype");
          return a ? c.call(b, e) : (b.__proto__ = e), b;
        };
      })());
  var Df = va("iterator"),
    yn = function () {
      return this;
    },
    Ef = function (c, a, b, d, e, f, g) {
      xn(b, a, d);
      var k, q, B;
      d = function (a) {
        if (a === e && m) return m;
        if (!fe && a in x) return x[a];
        switch (a) {
          case "keys":
          case "values":
          case "entries":
            return function () {
              return new b(this, a);
            };
        }
        return function () {
          return new b(this);
        };
      };
      var h = a + " Iterator",
        l = !1,
        x = c.prototype,
        n = x[Df] || x["@@iterator"] || (e && x[e]),
        m = (!fe && n) || d(e),
        p = ("Array" == a && x.entries) || n;
      if (
        (p &&
          ((k = Af(p.call(new c()))),
          Ti !== Object.prototype &&
            k.next &&
            (id(k, h, !0, !0), (Sb[h] = yn))),
        "values" == e &&
          n &&
          "values" !== n.name &&
          ((l = !0),
          (m = function () {
            return n.call(this);
          })),
        g && x[Df] !== m && sb(x, Df, m),
        (Sb[a] = m),
        e)
      )
        if (
          ((q = {
            values: d("values"),
            keys: f ? m : d("keys"),
            entries: d("entries"),
          }),
          g)
        )
          for (B in q) (!fe && !l && B in x) || yf(x, B, q[B]);
        else M({ target: a, proto: !0, forced: fe || l }, q);
      return q;
    },
    Ui = va("species"),
    Vi = function (c) {
      c = Qb(c);
      var a = jb.f;
      ma &&
        c &&
        !c[Ui] &&
        a(c, Ui, {
          configurable: !0,
          get: function () {
            return this;
          },
        });
    },
    zn = jb.f,
    Wi = Ci.fastKey,
    Xi = fb.set,
    Ff = fb.getterFor;
  (function (c, a, b) {
    var d = -1 !== c.indexOf("Map"),
      e = -1 !== c.indexOf("Weak"),
      f = d ? "set" : "add",
      g = J[c],
      k = g && g.prototype,
      q = {};
    if (
      ma &&
      "function" == typeof g &&
      (e ||
        (k.forEach &&
          !ra(function () {
            new g().entries().next();
          })))
    ) {
      var B = a(function (a, b) {
        pn(sf(a, B, c), { type: c, collection: new g() });
        null != b && hd(b, a[f], a, d);
      });
      var h = qn(c);
      Kc(
        "add clear delete forEach get has set keys values entries".split(" "),
        function (a) {
          var b = "add" == a || "set" == a;
          !(a in k) ||
            (e && "clear" == a) ||
            sb(B.prototype, a, function (c, d) {
              var f = h(this).collection;
              if (!b && e && !za(c)) return "get" == a && void 0;
              c = f[a](0 === c ? 0 : c, d);
              return b ? this : c;
            });
        }
      );
      e ||
        on(B.prototype, "size", {
          configurable: !0,
          get: function () {
            return h(this).collection.size;
          },
        });
    } else (B = b.getConstructor(a, c, d, f)), (Ci.REQUIRED = !0);
    return (
      id(B, c, !1, !0),
      (q[c] = B),
      M({ global: !0, forced: !0 }, q),
      e || b.setStrong(B, c, d),
      B
    );
  })(
    "Map",
    function (c) {
      return function () {
        return c(this, arguments.length ? arguments[0] : void 0);
      };
    },
    {
      getConstructor: function (c, a, b, d) {
        var e = c(function (c, f) {
            sf(c, e, a);
            Xi(c, {
              type: a,
              index: mc(null),
              first: void 0,
              last: void 0,
              size: 0,
            });
            ma || (c.size = 0);
            null != f && hd(f, c[d], c, b);
          }),
          f = Ff(a),
          g = function (a, b, c) {
            var d,
              e,
              g = f(a),
              q = k(a, b);
            return (
              q
                ? (q.value = c)
                : ((g.last = q =
                    {
                      index: (e = Wi(b, !0)),
                      key: b,
                      value: c,
                      previous: (d = g.last),
                      next: void 0,
                      removed: !1,
                    }),
                  g.first || (g.first = q),
                  d && (d.next = q),
                  ma ? g.size++ : a.size++,
                  "F" !== e && (g.index[e] = q)),
              a
            );
          },
          k = function (a, b) {
            a = f(a);
            var c = Wi(b);
            if ("F" !== c) return a.index[c];
            for (a = a.first; a; a = a.next) if (a.key == b) return a;
          };
        return (
          zf(e.prototype, {
            clear: function () {
              for (var a = f(this), b = a.index, c = a.first; c; )
                (c.removed = !0),
                  c.previous && (c.previous = c.previous.next = void 0),
                  delete b[c.index],
                  (c = c.next);
              a.first = a.last = void 0;
              ma ? (a.size = 0) : (this.size = 0);
            },
            delete: function (a) {
              var b = f(this);
              if ((a = k(this, a))) {
                var c = a.next,
                  d = a.previous;
                delete b.index[a.index];
                a.removed = !0;
                d && (d.next = c);
                c && (c.previous = d);
                b.first == a && (b.first = c);
                b.last == a && (b.last = d);
                ma ? b.size-- : this.size--;
              }
              return !!a;
            },
            forEach: function (a) {
              for (
                var b,
                  c = f(this),
                  d = jc(a, 1 < arguments.length ? arguments[1] : void 0, 3);
                (b = b ? b.next : c.first);

              )
                for (d(b.value, b.key, this); b && b.removed; ) b = b.previous;
            },
            has: function (a) {
              return !!k(this, a);
            },
          }),
          zf(
            e.prototype,
            b
              ? {
                  get: function (a) {
                    return (a = k(this, a)) && a.value;
                  },
                  set: function (a, b) {
                    return g(this, 0 === a ? 0 : a, b);
                  },
                }
              : {
                  add: function (a) {
                    return g(this, (a = 0 === a ? 0 : a), a);
                  },
                }
          ),
          ma &&
            zn(e.prototype, "size", {
              get: function () {
                return f(this).size;
              },
            }),
          e
        );
      },
      setStrong: function (c, a, b) {
        var d = a + " Iterator",
          e = Ff(a),
          f = Ff(d);
        Ef(
          c,
          a,
          function (a, b) {
            Xi(this, {
              type: d,
              target: a,
              state: e(a),
              kind: b,
              last: void 0,
            });
          },
          function () {
            for (var a = f(this), b = a.kind, c = a.last; c && c.removed; )
              c = c.previous;
            return a.target && (a.last = c = c ? c.next : a.state.first)
              ? "keys" == b
                ? { value: c.key, done: !1 }
                : "values" == b
                ? { value: c.value, done: !1 }
                : { value: [c.key, c.value], done: !1 }
              : ((a.target = void 0), { value: void 0, done: !0 });
          },
          b ? "entries" : "values",
          !b,
          !0
        );
        Vi(a);
      },
    }
  );
  var Yi = function (c) {
      return function (a, b) {
        var d, e;
        a = String(ic(a));
        b = Yd(b);
        var f = a.length;
        return 0 > b || b >= f
          ? c
            ? ""
            : void 0
          : 55296 > (d = a.charCodeAt(b)) ||
            56319 < d ||
            b + 1 === f ||
            56320 > (e = a.charCodeAt(b + 1)) ||
            57343 < e
          ? c
            ? a.charAt(b)
            : d
          : c
          ? a.slice(b, b + 2)
          : e - 56320 + ((d - 55296) << 10) + 65536;
      };
    },
    An = { codeAt: Yi(!1), charAt: Yi(!0) }.charAt,
    Bn = fb.set,
    Cn = fb.getterFor("String Iterator");
  Ef(
    String,
    "String",
    function (c) {
      Bn(this, { type: "String Iterator", string: String(c), index: 0 });
    },
    function () {
      var c,
        a = Cn(this),
        b = a.string,
        d = a.index;
      return d >= b.length
        ? { value: void 0, done: !0 }
        : ((c = An(b, d)), (a.index += c.length), { value: c, done: !1 });
    }
  );
  var Dn = fb.set,
    En = fb.getterFor("Array Iterator");
  Ef(
    Array,
    "Array",
    function (c, a) {
      Dn(this, { type: "Array Iterator", target: ib(c), index: 0, kind: a });
    },
    function () {
      var c = En(this),
        a = c.target,
        b = c.kind,
        d = c.index++;
      return !a || d >= a.length
        ? ((c.target = void 0), { value: void 0, done: !0 })
        : "keys" == b
        ? { value: d, done: !1 }
        : "values" == b
        ? { value: a[d], done: !1 }
        : { value: [d, a[d]], done: !1 };
    },
    "values"
  );
  Sb.Arguments = Sb.Array;
  var Fn = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0,
    },
    Zi = va("toStringTag"),
    ge;
  for (ge in Fn) {
    var $i = J[ge],
      Gf = $i && $i.prototype;
    Gf && !Gf[Zi] && sb(Gf, Zi, ge);
    Sb[ge] = Sb.Array;
  }
  var Z = ha.Map,
    Gn = va("match"),
    Hf = function (c) {
      var a;
      if (za(c) && (void 0 !== (a = c[Gn]) ? a : "RegExp" == Gb(c)))
        throw TypeError("The method doesn't accept regular expressions");
      return c;
    },
    Hn = va("match"),
    If = function (c) {
      var a = /./;
      try {
        "/./"[c](a);
      } catch (b) {
        try {
          return (a[Hn] = !1), "/./"[c](a);
        } catch (d) {}
      }
      return !1;
    },
    aj = "".endsWith,
    In = Math.min,
    Jn = If("endsWith");
  M(
    { target: "String", proto: !0, forced: !Jn },
    {
      endsWith: function (c) {
        var a = String(ic(this));
        Hf(c);
        var b = 1 < arguments.length ? arguments[1] : void 0,
          d = tb(a.length);
        b = void 0 === b ? d : In(tb(b), d);
        d = String(c);
        return aj ? aj.call(a, d, b) : a.slice(b - d.length, b) === d;
      },
    }
  );
  var Da = function (c) {
      return ha[c + "Prototype"];
    },
    Kn = Da("String").endsWith,
    bj = String.prototype,
    Bg = function (c) {
      var a = c.endsWith;
      return "string" == typeof c ||
        c === bj ||
        (c instanceof String && a === bj.endsWith)
        ? Kn
        : a;
    },
    kd = function (c, a) {
      var b = [][c];
      return (
        !b ||
        !ra(function () {
          b.call(
            null,
            a ||
              function () {
                throw 1;
              },
            1
          );
        })
      );
    },
    cj = kd("forEach")
      ? function (c) {
          return Kc(this, c, 1 < arguments.length ? arguments[1] : void 0);
        }
      : [].forEach;
  M({ target: "Array", proto: !0, forced: [].forEach != cj }, { forEach: cj });
  var Ln = Da("Array").forEach,
    dj = Array.prototype,
    Mn = { DOMTokenList: !0, NodeList: !0 },
    r = function (c) {
      var a = c.forEach;
      return c === dj ||
        (c instanceof Array && a === dj.forEach) ||
        Mn.hasOwnProperty(Zd(c))
        ? Ln
        : a;
    },
    ld = { f: Object.getOwnPropertySymbols },
    he = Object.assign,
    ej =
      !he ||
      ra(function () {
        var c = {},
          a = {},
          b = Symbol();
        return (
          (c[b] = 7),
          "abcdefghijklmnopqrst".split("").forEach(function (b) {
            a[b] = b;
          }),
          7 != he({}, c)[b] || "abcdefghijklmnopqrst" != $b(he({}, a)).join("")
        );
      })
        ? function (c, a) {
            for (
              var b = ub(c), d = arguments.length, e = 1, f = ld.f, g = Sd;
              d > e;

            )
              for (
                var k,
                  q = Td(arguments[e++]),
                  B = f ? $b(q).concat(f(q)) : $b(q),
                  h = B.length,
                  l = 0;
                h > l;

              )
                (k = B[l++]), (ma && !g.call(q, k)) || (b[k] = q[k]);
            return b;
          }
        : he;
  M(
    { target: "Object", stat: !0, forced: Object.assign !== ej },
    { assign: ej }
  );
  var ab = ha.Object.assign,
    Nn = ra(function () {
      $b(1);
    });
  M(
    { target: "Object", stat: !0, forced: Nn },
    {
      keys: function (c) {
        return $b(ub(c));
      },
    }
  );
  var S = ha.Object.keys,
    fj = function (c) {
      return function (a, b, d, e) {
        rb(b);
        a = ub(a);
        var f = Td(a),
          g = tb(a.length),
          k = c ? g - 1 : 0,
          q = c ? -1 : 1;
        if (2 > d)
          for (;;) {
            if (k in f) {
              e = f[k];
              k += q;
              break;
            }
            if (((k += q), c ? 0 > k : g <= k))
              throw TypeError("Reduce of empty array with no initial value");
          }
        for (; c ? 0 <= k : g > k; k += q) k in f && (e = b(e, f[k], k, a));
        return e;
      };
    },
    On = { left: fj(!1), right: fj(!0) }.left;
  M(
    { target: "Array", proto: !0, forced: kd("reduce") },
    {
      reduce: function (c) {
        return On(
          this,
          c,
          arguments.length,
          1 < arguments.length ? arguments[1] : void 0
        );
      },
    }
  );
  var Pn = Da("Array").reduce,
    gj = Array.prototype,
    Ae = function (c) {
      var a = c.reduce;
      return c === gj || (c instanceof Array && a === gj.reduce) ? Pn : a;
    };
  M(
    { target: "Object", stat: !0, forced: !ma, sham: !ma },
    { defineProperty: jb.f }
  );
  var hj = Oa(function (c) {
      var a = ha.Object;
      c = c.exports = function (b, c, e) {
        return a.defineProperty(b, c, e);
      };
      a.defineProperty.sham && (c.sham = !0);
    }),
    ba = hj,
    Qn =
      /^[\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff][\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]*/,
    Rn =
      /[\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff][\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]*$/,
    Jf = function (c) {
      return function (a) {
        a = String(ic(a));
        return (
          1 & c && (a = a.replace(Qn, "")), 2 & c && (a = a.replace(Rn, "")), a
        );
      };
    };
  Jf(1);
  Jf(2);
  var ij = Jf(3),
    ie = J.parseInt,
    Sn = /^[+-]?0[Xx]/,
    jj =
      8 !==
        ie(
          "\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff08"
        ) ||
      22 !==
        ie(
          "\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff0x16"
        )
        ? function (c, a) {
            c = ij(String(c));
            return ie(c, a >>> 0 || (Sn.test(c) ? 16 : 10));
          }
        : ie;
  M({ global: !0, forced: parseInt != jj }, { parseInt: jj });
  var R = ha.parseInt;
  let yg = !0,
    zg = !0;
  var kj = Hc,
    Tn = ra(function () {
      kj(1);
    });
  M(
    { target: "Object", stat: !0, forced: !ma || Tn, sham: !ma },
    {
      getOwnPropertyDescriptor: function (c, a) {
        return kj(ib(c), a);
      },
    }
  );
  var da = Oa(function (c) {
      var a = ha.Object;
      c = c.exports = function (b, c) {
        return a.getOwnPropertyDescriptor(b, c);
      };
      a.getOwnPropertyDescriptor.sham && (c.sham = !0);
    }),
    nc = function (c, a, b) {
      a = Fc(a);
      a in c ? jb.f(c, a, hc(0, b)) : (c[a] = b);
    },
    md = Qb("navigator", "userAgent") || "",
    lj = J.process,
    mj = lj && lj.versions,
    nj = mj && mj.v8,
    Tb,
    je;
  nj
    ? ((Tb = nj.split(".")), (je = Tb[0] + Tb[1]))
    : md &&
      ((Tb = md.match(/Edge\/(\d+)/)),
      (!Tb || 74 <= Tb[1]) &&
        ((Tb = md.match(/Chrome\/(\d+)/)), Tb && (je = Tb[1])));
  var ke = je && +je,
    Un = va("species"),
    nd = function (c) {
      return (
        51 <= ke ||
        !ra(function () {
          var a = [];
          return (
            ((a.constructor = {})[Un] = function () {
              return { foo: 1 };
            }),
            1 !== a[c](Boolean).foo
          );
        })
      );
    },
    oj = va("isConcatSpreadable"),
    Vn =
      51 <= ke ||
      !ra(function () {
        var c = [];
        return (c[oj] = !1), c.concat()[0] !== c;
      }),
    Wn = nd("concat");
  M(
    { target: "Array", proto: !0, forced: !Vn || !Wn },
    {
      concat: function (c) {
        var a,
          b,
          d = ub(this),
          e = tf(d, 0),
          f = 0;
        var g = -1;
        for (a = arguments.length; g < a; g++) {
          var k = (b = -1 === g ? d : arguments[g]);
          if (za(k)) {
            var q = k[oj];
            k = void 0 !== q ? !!q : kc(k);
          } else k = !1;
          if (k) {
            if (9007199254740991 < f + (q = tb(b.length)))
              throw TypeError("Maximum allowed index exceeded");
            for (k = 0; k < q; k++, f++) k in b && nc(e, f, b[k]);
          } else {
            if (9007199254740991 <= f)
              throw TypeError("Maximum allowed index exceeded");
            nc(e, f++, b);
          }
        }
        return (e.length = f), e;
      },
    }
  );
  var Xn = Da("Array").concat,
    pj = Array.prototype,
    n = function (c) {
      var a = c.concat;
      return c === pj || (c instanceof Array && a === pj.concat) ? Xn : a;
    };
  M(
    { target: "Array", proto: !0, forced: !nd("filter") },
    {
      filter: function (c) {
        return en(this, c, 1 < arguments.length ? arguments[1] : void 0);
      },
    }
  );
  var Yn = Da("Array").filter,
    qj = Array.prototype,
    O = function (c) {
      var a = c.filter;
      return c === qj || (c instanceof Array && a === qj.filter) ? Yn : a;
    },
    Zn = J.Promise,
    rj = va("iterator"),
    sj = !1;
  try {
    var $n = 0,
      tj = {
        next: function () {
          return { done: !!$n++ };
        },
        return: function () {
          sj = !0;
        },
      };
    tj[rj] = function () {
      return this;
    };
    Array.from(tj, function () {
      throw 2;
    });
  } catch (c) {}
  var uj = function (c, a) {
      if (!a && !sj) return !1;
      var b = !1;
      try {
        (a = {}),
          (a[rj] = function () {
            return {
              next: function () {
                return { done: (b = !0) };
              },
            };
          }),
          c(a);
      } catch (d) {}
      return b;
    },
    ao = va("species"),
    vj = function (c, a) {
      var b;
      c = Qa(c).constructor;
      return void 0 === c || null == (b = Qa(c)[ao]) ? a : rb(b);
    },
    wj = /(iphone|ipod|ipad).*applewebkit/i.test(md),
    xj = J.location,
    Kf = J.setImmediate,
    yj = J.clearImmediate,
    zj = J.process,
    Aj = J.MessageChannel,
    Lf = J.Dispatch,
    Mf = 0,
    od = {},
    Mc,
    Nf,
    Of,
    Pf = function (c) {
      if (od.hasOwnProperty(c)) {
        var a = od[c];
        delete od[c];
        a();
      }
    },
    Qf = function (c) {
      return function () {
        Pf(c);
      };
    },
    Bj = function (c) {
      Pf(c.data);
    },
    Cj = function (c) {
      J.postMessage(c + "", xj.protocol + "//" + xj.host);
    };
  (Kf && yj) ||
    ((Kf = function (c) {
      for (var a = [], b = 1; arguments.length > b; ) a.push(arguments[b++]);
      return (
        (od[++Mf] = function () {
          ("function" == typeof c ? c : Function(c)).apply(void 0, a);
        }),
        Mc(Mf),
        Mf
      );
    }),
    (yj = function (c) {
      delete od[c];
    }),
    "process" == Gb(zj)
      ? (Mc = function (c) {
          zj.nextTick(Qf(c));
        })
      : Lf && Lf.now
      ? (Mc = function (c) {
          Lf.now(Qf(c));
        })
      : Aj && !wj
      ? ((Nf = new Aj()),
        (Of = Nf.port2),
        (Nf.port1.onmessage = Bj),
        (Mc = jc(Of.postMessage, Of, 1)))
      : !J.addEventListener ||
        "function" != typeof postMessage ||
        J.importScripts ||
        ra(Cj)
      ? (Mc =
          "onreadystatechange" in (Ud ? Gc.createElement("script") : {})
            ? function (c) {
                wf.appendChild(
                  Ud ? Gc.createElement("script") : {}
                ).onreadystatechange = function () {
                  wf.removeChild(this);
                  Pf(c);
                };
              }
            : function (c) {
                setTimeout(Qf(c), 0);
              })
      : ((Mc = Cj), J.addEventListener("message", Bj, !1)));
  var Rf = Kf,
    bo = Hc,
    Dj = J.MutationObserver || J.WebKitMutationObserver,
    Sf = J.process,
    Tf = J.Promise,
    Ej = "process" == Gb(Sf),
    Fj = bo(J, "queueMicrotask"),
    Gj = Fj && Fj.value,
    pd,
    oc,
    qd,
    Nc,
    Uf,
    Vf,
    Wf,
    Hj;
  Gj ||
    ((pd = function () {
      var c;
      for (Ej && (c = Sf.domain) && c.exit(); oc; ) {
        var a = oc.fn;
        oc = oc.next;
        try {
          a();
        } catch (b) {
          throw (oc ? Nc() : (qd = void 0), b);
        }
      }
      qd = void 0;
      c && c.enter();
    }),
    Ej
      ? (Nc = function () {
          Sf.nextTick(pd);
        })
      : Dj && !wj
      ? ((Uf = !0),
        (Vf = document.createTextNode("")),
        new Dj(pd).observe(Vf, { characterData: !0 }),
        (Nc = function () {
          Vf.data = Uf = !Uf;
        }))
      : Tf && Tf.resolve
      ? ((Wf = Tf.resolve(void 0)),
        (Hj = Wf.then),
        (Nc = function () {
          Hj.call(Wf, pd);
        }))
      : (Nc = function () {
          Rf.call(J, pd);
        }));
  var Ij =
      Gj ||
      function (c) {
        c = { fn: c, next: void 0 };
        qd && (qd.next = c);
        oc || ((oc = c), Nc());
        qd = c;
      },
    co = function (c) {
      var a, b;
      this.promise = new c(function (c, e) {
        if (void 0 !== a || void 0 !== b)
          throw TypeError("Bad Promise constructor");
        a = c;
        b = e;
      });
      this.resolve = rb(a);
      this.reject = rb(b);
    },
    le = {
      f: function (c) {
        return new co(c);
      },
    },
    Xf = function (c, a) {
      if ((Qa(c), za(a) && a.constructor === c)) return a;
      c = le.f(c);
      return (0, c.resolve)(a), c.promise;
    },
    eo = function (c, a) {
      var b = J.console;
      b && b.error && (1 === arguments.length ? b.error(c) : b.error(c, a));
    },
    me = function (c) {
      try {
        return { error: !1, value: c() };
      } catch (a) {
        return { error: !0, value: a };
      }
    },
    fo = va("species"),
    Jj = fb.get,
    go = fb.set,
    ho = fb.getterFor("Promise"),
    Ua = Zn,
    Kj = J.TypeError,
    Yf = J.document,
    ne = J.process,
    io = Rb("inspectSource");
  Qb("fetch");
  var Oc = le.f,
    jo = Oc,
    rd = "process" == Gb(ne),
    ko = !!(Yf && Yf.createEvent && J.dispatchEvent),
    oe,
    Lj,
    pe = Ic("Promise", function () {
      if (
        (io(Ua) === String(Ua) &&
          (66 === ke || (!rd && "function" != typeof PromiseRejectionEvent))) ||
        !Ua.prototype.finally
      )
        return !0;
      if (51 <= ke && /native code/.test(Ua)) return !1;
      var c = Ua.resolve(1),
        a = function (a) {
          a(
            function () {},
            function () {}
          );
        };
      return (
        ((c.constructor = {})[fo] = a), !(c.then(function () {}) instanceof a)
      );
    }),
    lo =
      pe ||
      !uj(function (c) {
        Ua.all(c).catch(function () {});
      }),
    Mj = function (c) {
      var a;
      return !(!za(c) || "function" != typeof (a = c.then)) && a;
    },
    Zf = function (c, a, b) {
      if (!a.notified) {
        a.notified = !0;
        var d = a.reactions;
        Ij(function () {
          for (var e = a.value, f = 1 == a.state, g = 0; d.length > g; ) {
            var k,
              q,
              B,
              h = d[g++],
              l = f ? h.ok : h.fail,
              x = h.resolve,
              n = h.reject,
              m = h.domain;
            try {
              l
                ? (f || (2 === a.rejection && mo(c, a), (a.rejection = 1)),
                  !0 === l
                    ? (k = e)
                    : (m && m.enter(), (k = l(e)), m && (m.exit(), (B = !0))),
                  k === h.promise
                    ? n(Kj("Promise-chain cycle"))
                    : (q = Mj(k))
                    ? q.call(k, x, n)
                    : x(k))
                : n(e);
            } catch (la) {
              m && !B && m.exit(), n(la);
            }
          }
          a.reactions = [];
          a.notified = !1;
          b && !a.rejection && no(c, a);
        });
      }
    },
    Nj = function (c, a, b) {
      var d, e;
      ko
        ? (((d = Yf.createEvent("Event")).promise = a),
          (d.reason = b),
          d.initEvent(c, !1, !0),
          J.dispatchEvent(d))
        : (d = { promise: a, reason: b });
      (e = J["on" + c])
        ? e(d)
        : "unhandledrejection" === c && eo("Unhandled promise rejection", b);
    },
    no = function (c, a) {
      Rf.call(J, function () {
        var b,
          d = a.value;
        if (
          1 !== a.rejection &&
          !a.parent &&
          ((b = me(function () {
            rd
              ? ne.emit("unhandledRejection", d, c)
              : Nj("unhandledrejection", c, d);
          })),
          (a.rejection = rd || (1 !== a.rejection && !a.parent) ? 2 : 1),
          b.error)
        )
          throw b.value;
      });
    },
    mo = function (c, a) {
      Rf.call(J, function () {
        rd
          ? ne.emit("rejectionHandled", c)
          : Nj("rejectionhandled", c, a.value);
      });
    },
    Pc = function (c, a, b, d) {
      return function (e) {
        c(a, b, e, d);
      };
    },
    Qc = function (c, a, b, d) {
      a.done ||
        ((a.done = !0),
        d && (a = d),
        (a.value = b),
        (a.state = 2),
        Zf(c, a, !0));
    },
    $f = function (c, a, b, d) {
      if (!a.done) {
        a.done = !0;
        d && (a = d);
        try {
          if (c === b) throw Kj("Promise can't be resolved itself");
          var e = Mj(b);
          e
            ? Ij(function () {
                var d = { done: !1 };
                try {
                  e.call(b, Pc($f, c, d, a), Pc(Qc, c, d, a));
                } catch (g) {
                  Qc(c, d, g, a);
                }
              })
            : ((a.value = b), (a.state = 1), Zf(c, a, !1));
        } catch (f) {
          Qc(c, { done: !1 }, f, a);
        }
      }
    };
  pe &&
    ((Ua = function (c) {
      sf(this, Ua, "Promise");
      rb(c);
      oe.call(this);
      var a = Jj(this);
      try {
        c(Pc($f, this, a), Pc(Qc, this, a));
      } catch (b) {
        Qc(this, a, b);
      }
    }),
    (oe = function (c) {
      go(this, {
        type: "Promise",
        done: !1,
        notified: !1,
        parent: !1,
        reactions: [],
        rejection: !1,
        state: 0,
        value: void 0,
      });
    }),
    (oe.prototype = zf(Ua.prototype, {
      then: function (c, a) {
        var b = ho(this),
          d = Oc(vj(this, Ua));
        return (
          (d.ok = "function" != typeof c || c),
          (d.fail = "function" == typeof a && a),
          (d.domain = rd ? ne.domain : void 0),
          (b.parent = !0),
          b.reactions.push(d),
          0 != b.state && Zf(this, b, !1),
          d.promise
        );
      },
      catch: function (c) {
        return this.then(void 0, c);
      },
    })),
    (Lj = function () {
      var c = new oe(),
        a = Jj(c);
      this.promise = c;
      this.resolve = Pc($f, c, a);
      this.reject = Pc(Qc, c, a);
    }),
    (le.f = Oc =
      function (c) {
        return c === Ua || c === Oj ? new Lj(c) : jo(c);
      }));
  M({ global: !0, wrap: !0, forced: pe }, { Promise: Ua });
  id(Ua, "Promise", !1, !0);
  Vi("Promise");
  var Oj = Qb("Promise");
  M(
    { target: "Promise", stat: !0, forced: pe },
    {
      reject: function (c) {
        var a = Oc(this);
        return a.reject.call(void 0, c), a.promise;
      },
    }
  );
  M(
    { target: "Promise", stat: !0, forced: !0 },
    {
      resolve: function (c) {
        return Xf(this === Oj ? Ua : this, c);
      },
    }
  );
  M(
    { target: "Promise", stat: !0, forced: lo },
    {
      all: function (c) {
        var a = this,
          b = Oc(a),
          d = b.resolve,
          e = b.reject,
          f = me(function () {
            var b = rb(a.resolve),
              f = [],
              q = 0,
              h = 1;
            hd(c, function (c) {
              var g = q++,
                k = !1;
              f.push(void 0);
              h++;
              b.call(a, c).then(function (a) {
                k || ((k = !0), (f[g] = a), --h || d(f));
              }, e);
            });
            --h || d(f);
          });
        return f.error && e(f.value), b.promise;
      },
      race: function (c) {
        var a = this,
          b = Oc(a),
          d = b.reject,
          e = me(function () {
            var e = rb(a.resolve);
            hd(c, function (c) {
              e.call(a, c).then(b.resolve, d);
            });
          });
        return e.error && d(e.value), b.promise;
      },
    }
  );
  M(
    { target: "Promise", stat: !0 },
    {
      allSettled: function (c) {
        var a = this,
          b = le.f(a),
          d = b.resolve,
          e = b.reject,
          f = me(function () {
            var b = rb(a.resolve),
              e = [],
              f = 0,
              h = 1;
            hd(c, function (c) {
              var g = f++,
                k = !1;
              e.push(void 0);
              h++;
              b.call(a, c).then(
                function (a) {
                  k ||
                    ((k = !0),
                    (e[g] = { status: "fulfilled", value: a }),
                    --h || d(e));
                },
                function (a) {
                  k ||
                    ((k = !0),
                    (e[g] = { status: "rejected", reason: a }),
                    --h || d(e));
                }
              );
            });
            --h || d(e);
          });
        return f.error && e(f.value), b.promise;
      },
    }
  );
  M(
    { target: "Promise", proto: !0, real: !0 },
    {
      finally: function (c) {
        var a = vj(this, Qb("Promise")),
          b = "function" == typeof c;
        return this.then(
          b
            ? function (b) {
                return Xf(a, c()).then(function () {
                  return b;
                });
              }
            : c,
          b
            ? function (b) {
                return Xf(a, c()).then(function () {
                  throw b;
                });
              }
            : c
        );
      },
    }
  );
  var u = ha.Promise;
  M(
    { target: "Array", proto: !0, forced: !nd("map") },
    {
      map: function (c) {
        return dn(this, c, 1 < arguments.length ? arguments[1] : void 0);
      },
    }
  );
  var oo = Da("Array").map,
    Pj = Array.prototype,
    A = function (c) {
      var a = c.map;
      return c === Pj || (c instanceof Array && a === Pj.map) ? oo : a;
    },
    po = Math.max,
    qo = Math.min;
  M(
    { target: "Array", proto: !0, forced: !nd("splice") },
    {
      splice: function (c, a) {
        var b,
          d,
          e,
          f,
          g = ub(this),
          k = tb(g.length),
          q = be(c, k);
        var h = arguments.length;
        if (
          (0 === h
            ? (b = d = 0)
            : 1 === h
            ? ((b = 0), (d = k - q))
            : ((b = h - 2), (d = qo(po(Yd(a), 0), k - q))),
          9007199254740991 < k + b - d)
        )
          throw TypeError("Maximum allowed length exceeded");
        h = tf(g, d);
        for (e = 0; e < d; e++) (f = q + e) in g && nc(h, e, g[f]);
        if (((h.length = d), b < d)) {
          for (e = q; e < k - d; e++) {
            var L = e + b;
            (f = e + d) in g ? (g[L] = g[f]) : delete g[L];
          }
          for (e = k; e > k - d + b; e--) delete g[e - 1];
        } else if (b > d)
          for (e = k - d; e > q; e--)
            (L = e + b - 1), (f = e + d - 1) in g ? (g[L] = g[f]) : delete g[L];
        for (e = 0; e < b; e++) g[e + q] = arguments[e + 2];
        return (g.length = k - d + b), h;
      },
    }
  );
  var ro = Da("Array").splice,
    Qj = Array.prototype,
    Ja = function (c) {
      var a = c.splice;
      return c === Qj || (c instanceof Array && a === Qj.splice) ? ro : a;
    },
    Rj = [].indexOf,
    Sj = !!Rj && 0 > 1 / [1].indexOf(1, -0),
    so = kd("indexOf");
  M(
    { target: "Array", proto: !0, forced: Sj || so },
    {
      indexOf: function (c) {
        return Sj
          ? Rj.apply(this, arguments) || 0
          : Ni(this, c, 1 < arguments.length ? arguments[1] : void 0);
      },
    }
  );
  var to = Da("Array").indexOf,
    Tj = Array.prototype,
    E = function (c) {
      var a = c.indexOf;
      return c === Tj || (c instanceof Array && a === Tj.indexOf) ? to : a;
    },
    uo = va("species"),
    vo = [].slice,
    wo = Math.max;
  M(
    { target: "Array", proto: !0, forced: !nd("slice") },
    {
      slice: function (c, a) {
        var b,
          d = ib(this);
        var e = tb(d.length);
        c = be(c, e);
        a = be(void 0 === a ? e : a, e);
        if (
          kc(d) &&
          ("function" != typeof (b = d.constructor) ||
          (b !== Array && !kc(b.prototype))
            ? za(b) && null === (b = b[uo]) && (b = void 0)
            : (b = void 0),
          b === Array || void 0 === b)
        )
          return vo.call(d, c, a);
        b = new (void 0 === b ? Array : b)(wo(a - c, 0));
        for (e = 0; c < a; c++, e++) c in d && nc(b, e, d[c]);
        return (b.length = e), b;
      },
    }
  );
  var xo = Da("Array").slice,
    Uj = Array.prototype,
    zb = function (c) {
      var a = c.slice;
      return c === Uj || (c instanceof Array && a === Uj.slice) ? xo : a;
    },
    Vj = !0;
  "find" in [] &&
    Array(1).find(function () {
      Vj = !1;
    });
  M(
    { target: "Array", proto: !0, forced: Vj },
    {
      find: function (c) {
        return gn(this, c, 1 < arguments.length ? arguments[1] : void 0);
      },
    }
  );
  var yo = Da("Array").find,
    Wj = Array.prototype,
    U = function (c) {
      var a = c.find;
      return c === Wj || (c instanceof Array && a === Wj.find) ? yo : a;
    },
    Xj = [].slice,
    ag = {};
  M(
    { target: "Function", proto: !0 },
    {
      bind:
        Function.bind ||
        function (c) {
          var a = rb(this),
            b = Xj.call(arguments, 1),
            d = function () {
              var e = b.concat(Xj.call(arguments));
              if (this instanceof d) {
                var f = e.length;
                if (!(f in ag)) {
                  for (var g = [], k = 0; k < f; k++) g[k] = "a[" + k + "]";
                  ag[f] = Function("C,a", "return new C(" + g.join(",") + ")");
                }
                e = ag[f](a, e);
              } else e = a.apply(c, e);
              return e;
            };
          return za(a.prototype) && (d.prototype = a.prototype), d;
        },
    }
  );
  var zo = Da("Function").bind,
    Yj = Function.prototype,
    Ba = function (c) {
      var a = c.bind;
      return c === Yj || (c instanceof Function && a === Yj.bind) ? zo : a;
    };
  M(
    { target: "Array", proto: !0 },
    {
      includes: function (c) {
        return tn(this, c, 1 < arguments.length ? arguments[1] : void 0);
      },
    }
  );
  var Ao = Da("Array").includes;
  M(
    { target: "String", proto: !0, forced: !If("includes") },
    {
      includes: function (c) {
        return !!~String(ic(this)).indexOf(
          Hf(c),
          1 < arguments.length ? arguments[1] : void 0
        );
      },
    }
  );
  var Bo = Da("String").includes,
    Zj = Array.prototype,
    ak = String.prototype,
    Aa = function (c) {
      var a = c.includes;
      return c === Zj || (c instanceof Array && a === Zj.includes)
        ? Ao
        : "string" == typeof c ||
          c === ak ||
          (c instanceof String && a === ak.includes)
        ? Bo
        : a;
    };
  M(
    { target: "Array", proto: !0, forced: kd("some") },
    {
      some: function (c) {
        return fn(this, c, 1 < arguments.length ? arguments[1] : void 0);
      },
    }
  );
  var Co = Da("Array").some,
    bk = Array.prototype,
    Fg = function (c) {
      var a = c.some;
      return c === bk || (c instanceof Array && a === bk.some) ? Co : a;
    };
  let Gg = pb;
  var ck = Object.freeze({
      __proto__: null,
      shimMediaStream: Hg,
      shimOnTrack: Ig,
      shimGetSendersWithDtmf: Jg,
      shimGetStats: Kg,
      shimSenderReceiverGetStats: Lg,
      shimAddTrackRemoveTrackWithNative: Mg,
      shimAddTrackRemoveTrack: Ng,
      shimPeerConnection: Ce,
      fixNegotiationNeeded: Og,
      shimGetUserMedia: Dg,
      shimGetDisplayMedia: function (c, a) {
        (c.navigator.mediaDevices &&
          "getDisplayMedia" in c.navigator.mediaDevices) ||
          (c.navigator.mediaDevices &&
            ("function" == typeof a
              ? (c.navigator.mediaDevices.getDisplayMedia = function (b) {
                  return a(b).then((a) => {
                    let d = b.video && b.video.width,
                      f = b.video && b.video.height;
                    return (
                      (b.video = {
                        mandatory: {
                          chromeMediaSource: "desktop",
                          chromeMediaSourceId: a,
                          maxFrameRate: (b.video && b.video.frameRate) || 3,
                        },
                      }),
                      d && (b.video.mandatory.maxWidth = d),
                      f && (b.video.mandatory.maxHeight = f),
                      c.navigator.mediaDevices.getUserMedia(b)
                    );
                  });
                })
              : console.error(
                  "shimGetDisplayMedia: getSourceId argument is not a function"
                )));
      },
    }),
    dk = "".startsWith,
    Do = Math.min,
    Eo = If("startsWith");
  M(
    { target: "String", proto: !0, forced: !Eo },
    {
      startsWith: function (c) {
        var a = String(ic(this));
        Hf(c);
        var b = tb(Do(1 < arguments.length ? arguments[1] : void 0, a.length)),
          d = String(c);
        return dk ? dk.call(a, d, b) : a.slice(b, b + d.length) === d;
      },
    }
  );
  var Fo = Da("String").startsWith,
    ek = String.prototype,
    Cd = function (c) {
      var a = c.startsWith;
      return "string" == typeof c ||
        c === ek ||
        (c instanceof String && a === ek.startsWith)
        ? Fo
        : a;
    };
  M(
    {
      target: "String",
      proto: !0,
      forced: (function (c) {
        return ra(function () {
          return (
            !!"\t\n\v\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff"[
              c
            ]() ||
            "\u200b\u0085\u180e" != "\u200b\u0085\u180e"[c]() ||
            "\t\n\v\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff"[
              c
            ].name !== c
          );
        });
      })("trim"),
    },
    {
      trim: function () {
        return ij(this);
      },
    }
  );
  var Go = Da("String").trim,
    fk = String.prototype,
    uc = function (c) {
      var a = c.trim;
      return "string" == typeof c ||
        c === fk ||
        (c instanceof String && a === fk.trim)
        ? Go
        : a;
    },
    F = Oa(function (c) {
      var a = {
        generateIdentifier: function () {
          return Math.random().toString(36).substr(2, 10);
        },
      };
      a.localCName = a.generateIdentifier();
      a.splitLines = function (a) {
        var b;
        return A((b = uc(a).call(a).split("\n"))).call(b, function (a) {
          return uc(a).call(a);
        });
      };
      a.splitSections = function (a) {
        a = a.split("\nm=");
        return A(a).call(a, function (a, b) {
          var c;
          return uc((c = 0 < b ? "m=" + a : a)).call(c) + "\r\n";
        });
      };
      a.getDescription = function (b) {
        return (b = a.splitSections(b)) && b[0];
      };
      a.getMediaSections = function (b) {
        b = a.splitSections(b);
        return b.shift(), b;
      };
      a.matchPrefix = function (b, c) {
        var d;
        return O((d = a.splitLines(b))).call(d, function (a) {
          return 0 === E(a).call(a, c);
        });
      };
      a.parseCandidate = function (a) {
        var b;
        a = {
          foundation: (b =
            0 === E(a).call(a, "a=candidate:")
              ? a.substring(12).split(" ")
              : a.substring(10).split(" "))[0],
          component: R(b[1], 10),
          protocol: b[2].toLowerCase(),
          priority: R(b[3], 10),
          ip: b[4],
          address: b[4],
          port: R(b[5], 10),
          type: b[7],
        };
        for (var c = 8; c < b.length; c += 2)
          switch (b[c]) {
            case "raddr":
              a.relatedAddress = b[c + 1];
              break;
            case "rport":
              a.relatedPort = R(b[c + 1], 10);
              break;
            case "tcptype":
              a.tcpType = b[c + 1];
              break;
            case "ufrag":
              a.ufrag = b[c + 1];
              a.usernameFragment = b[c + 1];
              break;
            default:
              a[b[c]] = b[c + 1];
          }
        return a;
      };
      a.writeCandidate = function (a) {
        var b = [];
        b.push(a.foundation);
        b.push(a.component);
        b.push(a.protocol.toUpperCase());
        b.push(a.priority);
        b.push(a.address || a.ip);
        b.push(a.port);
        var c = a.type;
        return (
          b.push("typ"),
          b.push(c),
          "host" !== c &&
            a.relatedAddress &&
            a.relatedPort &&
            (b.push("raddr"),
            b.push(a.relatedAddress),
            b.push("rport"),
            b.push(a.relatedPort)),
          a.tcpType &&
            "tcp" === a.protocol.toLowerCase() &&
            (b.push("tcptype"), b.push(a.tcpType)),
          (a.usernameFragment || a.ufrag) &&
            (b.push("ufrag"), b.push(a.usernameFragment || a.ufrag)),
          "candidate:" + b.join(" ")
        );
      };
      a.parseIceOptions = function (a) {
        return a.substr(14).split(" ");
      };
      a.parseRtpMap = function (a) {
        a = a.substr(9).split(" ");
        var b = { payloadType: R(a.shift(), 10) };
        return (
          (a = a[0].split("/")),
          (b.name = a[0]),
          (b.clockRate = R(a[1], 10)),
          (b.channels = 3 === a.length ? R(a[2], 10) : 1),
          (b.numChannels = b.channels),
          b
        );
      };
      a.writeRtpMap = function (a) {
        var b = a.payloadType;
        void 0 !== a.preferredPayloadType && (b = a.preferredPayloadType);
        var c = a.channels || a.numChannels || 1;
        return (
          "a=rtpmap:" +
          b +
          " " +
          a.name +
          "/" +
          a.clockRate +
          (1 !== c ? "/" + c : "") +
          "\r\n"
        );
      };
      a.parseExtmap = function (a) {
        var b;
        a = a.substr(9).split(" ");
        return {
          id: R(a[0], 10),
          direction:
            0 < E((b = a[0])).call(b, "/") ? a[0].split("/")[1] : "sendrecv",
          uri: a[1],
        };
      };
      a.writeExtmap = function (a) {
        return (
          "a=extmap:" +
          (a.id || a.preferredId) +
          (a.direction && "sendrecv" !== a.direction ? "/" + a.direction : "") +
          " " +
          a.uri +
          "\r\n"
        );
      };
      a.parseFmtp = function (a) {
        for (
          var b = {}, c = a.substr(E(a).call(a, " ") + 1).split(";"), f = 0;
          f < c.length;
          f++
        ) {
          var g, k;
          a = uc((g = c[f]))
            .call(g)
            .split("=");
          b[uc((k = a[0])).call(k)] = a[1];
        }
        return b;
      };
      a.writeFmtp = function (a) {
        var b = "",
          c = a.payloadType;
        if (
          (void 0 !== a.preferredPayloadType && (c = a.preferredPayloadType),
          a.parameters && S(a.parameters).length)
        ) {
          var f,
            g = [];
          r((f = S(a.parameters))).call(f, function (b) {
            a.parameters[b] ? g.push(b + "=" + a.parameters[b]) : g.push(b);
          });
          b += "a=fmtp:" + c + " " + g.join(";") + "\r\n";
        }
        return b;
      };
      a.parseRtcpFb = function (a) {
        a = a.substr(E(a).call(a, " ") + 1).split(" ");
        return { type: a.shift(), parameter: a.join(" ") };
      };
      a.writeRtcpFb = function (a) {
        var b,
          c = "",
          f = a.payloadType;
        (void 0 !== a.preferredPayloadType && (f = a.preferredPayloadType),
        a.rtcpFeedback && a.rtcpFeedback.length) &&
          r((b = a.rtcpFeedback)).call(b, function (a) {
            c +=
              "a=rtcp-fb:" +
              f +
              " " +
              a.type +
              (a.parameter && a.parameter.length ? " " + a.parameter : "") +
              "\r\n";
          });
        return c;
      };
      a.parseSsrcMedia = function (a) {
        var b = E(a).call(a, " "),
          c = { ssrc: R(a.substr(7, b - 7), 10) },
          f = E(a).call(a, ":", b);
        return (
          -1 < f
            ? ((c.attribute = a.substr(b + 1, f - b - 1)),
              (c.value = a.substr(f + 1)))
            : (c.attribute = a.substr(b + 1)),
          c
        );
      };
      a.parseSsrcGroup = function (a) {
        a = a.substr(13).split(" ");
        return {
          semantics: a.shift(),
          ssrcs: A(a).call(a, function (a) {
            return R(a, 10);
          }),
        };
      };
      a.getMid = function (b) {
        if ((b = a.matchPrefix(b, "a=mid:")[0])) return b.substr(6);
      };
      a.parseFingerprint = function (a) {
        a = a.substr(14).split(" ");
        return { algorithm: a[0].toLowerCase(), value: a[1] };
      };
      a.getDtlsParameters = function (b, c) {
        b = a.matchPrefix(b + c, "a=fingerprint:");
        return { role: "auto", fingerprints: A(b).call(b, a.parseFingerprint) };
      };
      a.writeDtlsParameters = function (a, c) {
        var b,
          d = "a=setup:" + c + "\r\n";
        return (
          r((b = a.fingerprints)).call(b, function (a) {
            d += "a=fingerprint:" + a.algorithm + " " + a.value + "\r\n";
          }),
          d
        );
      };
      a.getIceParameters = function (b, c) {
        b = a.splitLines(b);
        return (
          (b = n(b).call(b, a.splitLines(c))),
          {
            usernameFragment: O(b)
              .call(b, function (a) {
                return 0 === E(a).call(a, "a=ice-ufrag:");
              })[0]
              .substr(12),
            password: O(b)
              .call(b, function (a) {
                return 0 === E(a).call(a, "a=ice-pwd:");
              })[0]
              .substr(10),
          }
        );
      };
      a.writeIceParameters = function (a) {
        return (
          "a=ice-ufrag:" +
          a.usernameFragment +
          "\r\na=ice-pwd:" +
          a.password +
          "\r\n"
        );
      };
      a.parseRtpParameters = function (b) {
        for (
          var c,
            e = {
              codecs: [],
              headerExtensions: [],
              fecMechanisms: [],
              rtcp: [],
            },
            f = a.splitLines(b)[0].split(" "),
            g = 3;
          g < f.length;
          g++
        ) {
          var k = f[g],
            q = a.matchPrefix(b, "a=rtpmap:" + k + " ")[0];
          if (q) {
            var h;
            q = a.parseRtpMap(q);
            var L = a.matchPrefix(b, "a=fmtp:" + k + " ");
            switch (
              ((q.parameters = L.length ? a.parseFmtp(L[0]) : {}),
              (q.rtcpFeedback = A(
                (h = a.matchPrefix(b, "a=rtcp-fb:" + k + " "))
              ).call(h, a.parseRtcpFb)),
              e.codecs.push(q),
              q.name.toUpperCase())
            ) {
              case "RED":
              case "ULPFEC":
                e.fecMechanisms.push(q.name.toUpperCase());
            }
          }
        }
        return (
          r((c = a.matchPrefix(b, "a=extmap:"))).call(c, function (b) {
            e.headerExtensions.push(a.parseExtmap(b));
          }),
          e
        );
      };
      a.writeRtpDescription = function (b, c) {
        var d,
          f,
          g,
          k = "";
        k += "m=" + b + " ";
        k += 0 < c.codecs.length ? "9" : "0";
        k += " UDP/TLS/RTP/SAVPF ";
        k +=
          A((d = c.codecs))
            .call(d, function (a) {
              return void 0 !== a.preferredPayloadType
                ? a.preferredPayloadType
                : a.payloadType;
            })
            .join(" ") + "\r\n";
        k += "c=IN IP4 0.0.0.0\r\n";
        k += "a=rtcp:9 IN IP4 0.0.0.0\r\n";
        r((f = c.codecs)).call(f, function (b) {
          k += a.writeRtpMap(b);
          k += a.writeFmtp(b);
          k += a.writeRtcpFb(b);
        });
        var q,
          h = 0;
        (r((g = c.codecs)).call(g, function (a) {
          a.maxptime > h && (h = a.maxptime);
        }),
        0 < h && (k += "a=maxptime:" + h + "\r\n"),
        (k += "a=rtcp-mux\r\n"),
        c.headerExtensions) &&
          r((q = c.headerExtensions)).call(q, function (b) {
            k += a.writeExtmap(b);
          });
        return k;
      };
      a.parseRtpEncodingParameters = function (b) {
        var c,
          e,
          f,
          g,
          k,
          q,
          h,
          L = [],
          l = a.parseRtpParameters(b),
          n = -1 !== E((c = l.fecMechanisms)).call(c, "RED"),
          m = -1 !== E((e = l.fecMechanisms)).call(e, "ULPFEC");
        c = O(
          (f = A((g = a.matchPrefix(b, "a=ssrc:"))).call(g, function (b) {
            return a.parseSsrcMedia(b);
          }))
        ).call(f, function (a) {
          return "cname" === a.attribute;
        });
        var p = 0 < c.length && c[0].ssrc;
        f = A((k = a.matchPrefix(b, "a=ssrc-group:FID"))).call(k, function (a) {
          a = a.substr(17).split(" ");
          return A(a).call(a, function (a) {
            return R(a, 10);
          });
        });
        0 < f.length && 1 < f[0].length && f[0][0] === p && (h = f[0][1]);
        r((q = l.codecs)).call(q, function (a) {
          "RTX" === a.name.toUpperCase() &&
            a.parameters.apt &&
            ((a = { ssrc: p, codecPayloadType: R(a.parameters.apt, 10) }),
            p && h && (a.rtx = { ssrc: h }),
            L.push(a),
            n &&
              (((a = JSON.parse(z(a))).fec = {
                ssrc: p,
                mechanism: m ? "red+ulpfec" : "red",
              }),
              L.push(a)));
        });
        0 === L.length && p && L.push({ ssrc: p });
        var la,
          t,
          u = a.matchPrefix(b, "b=");
        u.length &&
          ((u =
            0 === E((la = u[0])).call(la, "b=TIAS:")
              ? R(u[0].substr(7), 10)
              : 0 === E((t = u[0])).call(t, "b=AS:")
              ? 950 * R(u[0].substr(5), 10) - 16e3
              : void 0),
          r(L).call(L, function (a) {
            a.maxBitrate = u;
          }));
        return L;
      };
      a.parseRtcpParameters = function (b) {
        var c,
          e,
          f = {},
          g = O(
            (c = A((e = a.matchPrefix(b, "a=ssrc:"))).call(e, function (b) {
              return a.parseSsrcMedia(b);
            }))
          ).call(c, function (a) {
            return "cname" === a.attribute;
          })[0];
        g && ((f.cname = g.value), (f.ssrc = g.ssrc));
        c = a.matchPrefix(b, "a=rtcp-rsize");
        f.reducedSize = 0 < c.length;
        f.compound = 0 === c.length;
        b = a.matchPrefix(b, "a=rtcp-mux");
        return (f.mux = 0 < b.length), f;
      };
      a.parseMsid = function (b) {
        var c,
          e,
          f,
          g = a.matchPrefix(b, "a=msid:");
        if (1 === g.length)
          return { stream: (f = g[0].substr(7).split(" "))[0], track: f[1] };
        b = O(
          (c = A((e = a.matchPrefix(b, "a=ssrc:"))).call(e, function (b) {
            return a.parseSsrcMedia(b);
          }))
        ).call(c, function (a) {
          return "msid" === a.attribute;
        });
        return 0 < b.length
          ? { stream: (f = b[0].value.split(" "))[0], track: f[1] }
          : void 0;
      };
      a.generateSessionId = function () {
        return Math.random().toString().substr(2, 21);
      };
      a.writeSessionBoilerplate = function (b, c, e) {
        c = void 0 !== c ? c : 2;
        return (
          "v=0\r\no=" +
          (e || "thisisadapterortc") +
          " " +
          (b || a.generateSessionId()) +
          " " +
          c +
          " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
        );
      };
      a.writeMediaSection = function (b, c, e, f) {
        c = a.writeRtpDescription(b.kind, c);
        if (
          ((c += a.writeIceParameters(b.iceGatherer.getLocalParameters())),
          (c += a.writeDtlsParameters(
            b.dtlsTransport.getLocalParameters(),
            "offer" === e ? "actpass" : "active"
          )),
          (c += "a=mid:" + b.mid + "\r\n"),
          b.direction
            ? (c += "a=" + b.direction + "\r\n")
            : b.rtpSender && b.rtpReceiver
            ? (c += "a=sendrecv\r\n")
            : b.rtpSender
            ? (c += "a=sendonly\r\n")
            : b.rtpReceiver
            ? (c += "a=recvonly\r\n")
            : (c += "a=inactive\r\n"),
          b.rtpSender)
        )
          (e = "msid:" + f.id + " " + b.rtpSender.track.id + "\r\n"),
            (c =
              c +
              ("a=" + e) +
              ("a=ssrc:" + b.sendEncodingParameters[0].ssrc + " " + e)),
            b.sendEncodingParameters[0].rtx &&
              ((c +=
                "a=ssrc:" + b.sendEncodingParameters[0].rtx.ssrc + " " + e),
              (c +=
                "a=ssrc-group:FID " +
                b.sendEncodingParameters[0].ssrc +
                " " +
                b.sendEncodingParameters[0].rtx.ssrc +
                "\r\n"));
        return (
          (c +=
            "a=ssrc:" +
            b.sendEncodingParameters[0].ssrc +
            " cname:" +
            a.localCName +
            "\r\n"),
          b.rtpSender &&
            b.sendEncodingParameters[0].rtx &&
            (c +=
              "a=ssrc:" +
              b.sendEncodingParameters[0].rtx.ssrc +
              " cname:" +
              a.localCName +
              "\r\n"),
          c
        );
      };
      a.getDirection = function (b, c) {
        b = a.splitLines(b);
        for (var d = 0; d < b.length; d++)
          switch (b[d]) {
            case "a=sendrecv":
            case "a=sendonly":
            case "a=recvonly":
            case "a=inactive":
              return b[d].substr(2);
          }
        return c ? a.getDirection(c) : "sendrecv";
      };
      a.getKind = function (b) {
        return a.splitLines(b)[0].split(" ")[0].substr(2);
      };
      a.isRejected = function (a) {
        return "0" === a.split(" ", 2)[1];
      };
      a.parseMLine = function (b) {
        b = a.splitLines(b)[0].substr(2).split(" ");
        return {
          kind: b[0],
          port: R(b[1], 10),
          protocol: b[2],
          fmt: zb(b).call(b, 3).join(" "),
        };
      };
      a.parseOLine = function (b) {
        b = a.matchPrefix(b, "o=")[0].substr(2).split(" ");
        return {
          username: b[0],
          sessionId: b[1],
          sessionVersion: R(b[2], 10),
          netType: b[3],
          addressType: b[4],
          address: b[5],
        };
      };
      a.isValidSDP = function (b) {
        if ("string" != typeof b || 0 === b.length) return !1;
        b = a.splitLines(b);
        for (var c = 0; c < b.length; c++)
          if (2 > b[c].length || "=" !== b[c].charAt(1)) return !1;
        return !0;
      };
      c.exports = a;
    }),
    ul = function (c, a) {
      function b(a, b) {
        b.addTrack(a);
        b.dispatchEvent(new c.MediaStreamTrackEvent("addtrack", { track: a }));
      }
      function d(a, b, d, e) {
        var f = new Event("track");
        f.track = b;
        f.receiver = d;
        f.transceiver = { receiver: d };
        f.streams = e;
        c.setTimeout(function () {
          a._dispatchEvent("track", f);
        });
      }
      var e = function (b) {
        var d = this,
          e = document.createDocumentFragment();
        if (
          (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(
            function (a) {
              d[a] = e[a].bind(e);
            }
          ),
          (this.canTrickleIceCandidates = null),
          (this.needNegotiation = !1),
          (this.localStreams = []),
          (this.remoteStreams = []),
          (this._localDescription = null),
          (this._remoteDescription = null),
          (this.signalingState = "stable"),
          (this.iceConnectionState = "new"),
          (this.connectionState = "new"),
          (this.iceGatheringState = "new"),
          (b = JSON.parse(JSON.stringify(b || {}))),
          (this.usingBundle = "max-bundle" === b.bundlePolicy),
          "negotiate" === b.rtcpMuxPolicy)
        )
          throw Ka(
            "NotSupportedError",
            "rtcpMuxPolicy 'negotiate' is not supported"
          );
        switch (
          (b.rtcpMuxPolicy || (b.rtcpMuxPolicy = "require"),
          b.iceTransportPolicy)
        ) {
          case "all":
          case "relay":
            break;
          default:
            b.iceTransportPolicy = "all";
        }
        switch (b.bundlePolicy) {
          case "balanced":
          case "max-compat":
          case "max-bundle":
            break;
          default:
            b.bundlePolicy = "balanced";
        }
        if (
          ((b.iceServers = tl(b.iceServers || [], a)),
          (this._iceGatherers = []),
          b.iceCandidatePoolSize)
        )
          for (var f = b.iceCandidatePoolSize; 0 < f; f--)
            this._iceGatherers.push(
              new c.RTCIceGatherer({
                iceServers: b.iceServers,
                gatherPolicy: b.iceTransportPolicy,
              })
            );
        else b.iceCandidatePoolSize = 0;
        this._config = b;
        this.transceivers = [];
        this._sdpSessionId = F.generateSessionId();
        this._sdpSessionVersion = 0;
        this._dtlsRole = void 0;
        this._isClosed = !1;
      };
      Object.defineProperty(e.prototype, "localDescription", {
        configurable: !0,
        get: function () {
          return this._localDescription;
        },
      });
      Object.defineProperty(e.prototype, "remoteDescription", {
        configurable: !0,
        get: function () {
          return this._remoteDescription;
        },
      });
      e.prototype.onicecandidate = null;
      e.prototype.onaddstream = null;
      e.prototype.ontrack = null;
      e.prototype.onremovestream = null;
      e.prototype.onsignalingstatechange = null;
      e.prototype.oniceconnectionstatechange = null;
      e.prototype.onconnectionstatechange = null;
      e.prototype.onicegatheringstatechange = null;
      e.prototype.onnegotiationneeded = null;
      e.prototype.ondatachannel = null;
      e.prototype._dispatchEvent = function (a, b) {
        this._isClosed ||
          (this.dispatchEvent(b),
          "function" == typeof this["on" + a] && this["on" + a](b));
      };
      e.prototype._emitGatheringStateChange = function () {
        var a = new Event("icegatheringstatechange");
        this._dispatchEvent("icegatheringstatechange", a);
      };
      e.prototype.getConfiguration = function () {
        return this._config;
      };
      e.prototype.getLocalStreams = function () {
        return this.localStreams;
      };
      e.prototype.getRemoteStreams = function () {
        return this.remoteStreams;
      };
      e.prototype._createTransceiver = function (a, b) {
        var c = 0 < this.transceivers.length;
        a = {
          track: null,
          iceGatherer: null,
          iceTransport: null,
          dtlsTransport: null,
          localCapabilities: null,
          remoteCapabilities: null,
          rtpSender: null,
          rtpReceiver: null,
          kind: a,
          mid: null,
          sendEncodingParameters: null,
          recvEncodingParameters: null,
          stream: null,
          associatedRemoteMediaStreams: [],
          wantReceive: !0,
        };
        this.usingBundle && c
          ? ((a.iceTransport = this.transceivers[0].iceTransport),
            (a.dtlsTransport = this.transceivers[0].dtlsTransport))
          : ((c = this._createIceAndDtlsTransports()),
            (a.iceTransport = c.iceTransport),
            (a.dtlsTransport = c.dtlsTransport));
        return b || this.transceivers.push(a), a;
      };
      e.prototype.addTrack = function (a, b) {
        if (this._isClosed)
          throw Ka(
            "InvalidStateError",
            "Attempted to call addTrack on a closed peerconnection."
          );
        var d;
        if (
          this.transceivers.find(function (b) {
            return b.track === a;
          })
        )
          throw Ka("InvalidAccessError", "Track already exists.");
        for (var e = 0; e < this.transceivers.length; e++)
          this.transceivers[e].track ||
            this.transceivers[e].kind !== a.kind ||
            (d = this.transceivers[e]);
        return (
          d || (d = this._createTransceiver(a.kind)),
          this._maybeFireNegotiationNeeded(),
          -1 === this.localStreams.indexOf(b) && this.localStreams.push(b),
          (d.track = a),
          (d.stream = b),
          (d.rtpSender = new c.RTCRtpSender(a, d.dtlsTransport)),
          d.rtpSender
        );
      };
      e.prototype.addStream = function (b) {
        var c = this;
        if (15025 <= a)
          b.getTracks().forEach(function (a) {
            c.addTrack(a, b);
          });
        else {
          var d = b.clone();
          b.getTracks().forEach(function (a, b) {
            var c = d.getTracks()[b];
            a.addEventListener("enabled", function (a) {
              c.enabled = a.enabled;
            });
          });
          d.getTracks().forEach(function (a) {
            c.addTrack(a, d);
          });
        }
      };
      e.prototype.removeTrack = function (a) {
        if (this._isClosed)
          throw Ka(
            "InvalidStateError",
            "Attempted to call removeTrack on a closed peerconnection."
          );
        if (!(a instanceof c.RTCRtpSender))
          throw new TypeError(
            "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender."
          );
        var b = this.transceivers.find(function (b) {
          return b.rtpSender === a;
        });
        if (!b)
          throw Ka(
            "InvalidAccessError",
            "Sender was not created by this connection."
          );
        var d = b.stream;
        b.rtpSender.stop();
        b.rtpSender = null;
        b.track = null;
        b.stream = null;
        -1 ===
          this.transceivers
            .map(function (a) {
              return a.stream;
            })
            .indexOf(d) &&
          -1 < this.localStreams.indexOf(d) &&
          this.localStreams.splice(this.localStreams.indexOf(d), 1);
        this._maybeFireNegotiationNeeded();
      };
      e.prototype.removeStream = function (a) {
        var b = this;
        a.getTracks().forEach(function (a) {
          var c = b.getSenders().find(function (b) {
            return b.track === a;
          });
          c && b.removeTrack(c);
        });
      };
      e.prototype.getSenders = function () {
        return this.transceivers
          .filter(function (a) {
            return !!a.rtpSender;
          })
          .map(function (a) {
            return a.rtpSender;
          });
      };
      e.prototype.getReceivers = function () {
        return this.transceivers
          .filter(function (a) {
            return !!a.rtpReceiver;
          })
          .map(function (a) {
            return a.rtpReceiver;
          });
      };
      e.prototype._createIceGatherer = function (a, b) {
        var d = this;
        if (b && 0 < a) return this.transceivers[0].iceGatherer;
        if (this._iceGatherers.length) return this._iceGatherers.shift();
        var e = new c.RTCIceGatherer({
          iceServers: this._config.iceServers,
          gatherPolicy: this._config.iceTransportPolicy,
        });
        return (
          Object.defineProperty(e, "state", { value: "new", writable: !0 }),
          (this.transceivers[a].bufferedCandidateEvents = []),
          (this.transceivers[a].bufferCandidates = function (b) {
            var c = !b.candidate || 0 === Object.keys(b.candidate).length;
            e.state = c ? "completed" : "gathering";
            null !== d.transceivers[a].bufferedCandidateEvents &&
              d.transceivers[a].bufferedCandidateEvents.push(b);
          }),
          e.addEventListener(
            "localcandidate",
            this.transceivers[a].bufferCandidates
          ),
          e
        );
      };
      e.prototype._gather = function (a, b) {
        var d = this,
          e = this.transceivers[b].iceGatherer;
        if (!e.onlocalcandidate) {
          var f = this.transceivers[b].bufferedCandidateEvents;
          this.transceivers[b].bufferedCandidateEvents = null;
          e.removeEventListener(
            "localcandidate",
            this.transceivers[b].bufferCandidates
          );
          e.onlocalcandidate = function (c) {
            if (!(d.usingBundle && 0 < b)) {
              var f = new Event("icecandidate");
              f.candidate = { sdpMid: a, sdpMLineIndex: b };
              var g = c.candidate;
              (c = !g || 0 === Object.keys(g).length)
                ? ("new" !== e.state && "gathering" !== e.state) ||
                  (e.state = "completed")
                : ("new" === e.state && (e.state = "gathering"),
                  (g.component = 1),
                  (g.ufrag = e.getLocalParameters().usernameFragment),
                  (g = F.writeCandidate(g)),
                  (f.candidate = Object.assign(
                    f.candidate,
                    F.parseCandidate(g)
                  )),
                  (f.candidate.candidate = g),
                  (f.candidate.toJSON = function () {
                    return {
                      candidate: f.candidate.candidate,
                      sdpMid: f.candidate.sdpMid,
                      sdpMLineIndex: f.candidate.sdpMLineIndex,
                      usernameFragment: f.candidate.usernameFragment,
                    };
                  }));
              g = F.getMediaSections(d._localDescription.sdp);
              g[f.candidate.sdpMLineIndex] += c
                ? "a=end-of-candidates\r\n"
                : "a=" + f.candidate.candidate + "\r\n";
              d._localDescription.sdp =
                F.getDescription(d._localDescription.sdp) + g.join("");
              g = d.transceivers.every(function (a) {
                return a.iceGatherer && "completed" === a.iceGatherer.state;
              });
              "gathering" !== d.iceGatheringState &&
                ((d.iceGatheringState = "gathering"),
                d._emitGatheringStateChange());
              c || d._dispatchEvent("icecandidate", f);
              g &&
                (d._dispatchEvent("icecandidate", new Event("icecandidate")),
                (d.iceGatheringState = "complete"),
                d._emitGatheringStateChange());
            }
          };
          c.setTimeout(function () {
            f.forEach(function (a) {
              e.onlocalcandidate(a);
            });
          }, 0);
        }
      };
      e.prototype._createIceAndDtlsTransports = function () {
        var a = this,
          b = new c.RTCIceTransport(null);
        b.onicestatechange = function () {
          a._updateIceConnectionState();
          a._updateConnectionState();
        };
        var d = new c.RTCDtlsTransport(b);
        return (
          (d.ondtlsstatechange = function () {
            a._updateConnectionState();
          }),
          (d.onerror = function () {
            Object.defineProperty(d, "state", {
              value: "failed",
              writable: !0,
            });
            a._updateConnectionState();
          }),
          { iceTransport: b, dtlsTransport: d }
        );
      };
      e.prototype._disposeIceAndDtlsTransports = function (a) {
        var b = this.transceivers[a].iceGatherer;
        b &&
          (delete b.onlocalcandidate, delete this.transceivers[a].iceGatherer);
        (b = this.transceivers[a].iceTransport) &&
          (delete b.onicestatechange, delete this.transceivers[a].iceTransport);
        (b = this.transceivers[a].dtlsTransport) &&
          (delete b.ondtlsstatechange,
          delete b.onerror,
          delete this.transceivers[a].dtlsTransport);
      };
      e.prototype._transceive = function (b, c, d) {
        var e = Dd(b.localCapabilities, b.remoteCapabilities);
        c &&
          b.rtpSender &&
          ((e.encodings = b.sendEncodingParameters),
          (e.rtcp = {
            cname: F.localCName,
            compound: b.rtcpParameters.compound,
          }),
          b.recvEncodingParameters.length &&
            (e.rtcp.ssrc = b.recvEncodingParameters[0].ssrc),
          b.rtpSender.send(e));
        d &&
          b.rtpReceiver &&
          0 < e.codecs.length &&
          ("video" === b.kind &&
            b.recvEncodingParameters &&
            15019 > a &&
            b.recvEncodingParameters.forEach(function (a) {
              delete a.rtx;
            }),
          b.recvEncodingParameters.length
            ? (e.encodings = b.recvEncodingParameters)
            : (e.encodings = [{}]),
          (e.rtcp = { compound: b.rtcpParameters.compound }),
          b.rtcpParameters.cname && (e.rtcp.cname = b.rtcpParameters.cname),
          b.sendEncodingParameters.length &&
            (e.rtcp.ssrc = b.sendEncodingParameters[0].ssrc),
          b.rtpReceiver.receive(e));
      };
      e.prototype.setLocalDescription = function (a) {
        var b = this;
        if (-1 === ["offer", "answer"].indexOf(a.type))
          return Promise.reject(
            Ka("TypeError", 'Unsupported type "' + a.type + '"')
          );
        if (!Qg("setLocalDescription", a.type, b.signalingState) || b._isClosed)
          return Promise.reject(
            Ka(
              "InvalidStateError",
              "Can not set local " + a.type + " in state " + b.signalingState
            )
          );
        if ("offer" === a.type) {
          var c = F.splitSections(a.sdp);
          var d = c.shift();
          c.forEach(function (a, c) {
            a = F.parseRtpParameters(a);
            b.transceivers[c].localCapabilities = a;
          });
          b.transceivers.forEach(function (a, c) {
            b._gather(a.mid, c);
          });
        } else if ("answer" === a.type) {
          c = F.splitSections(b._remoteDescription.sdp);
          d = c.shift();
          var e = 0 < F.matchPrefix(d, "a=ice-lite").length;
          c.forEach(function (a, c) {
            var f = b.transceivers[c],
              g = f.iceGatherer,
              k = f.iceTransport,
              q = f.dtlsTransport,
              h = f.localCapabilities,
              B = f.remoteCapabilities;
            if (
              !(
                (F.isRejected(a) &&
                  0 === F.matchPrefix(a, "a=bundle-only").length) ||
                f.rejected
              )
            ) {
              var l = F.getIceParameters(a, d);
              a = F.getDtlsParameters(a, d);
              e && (a.role = "server");
              (b.usingBundle && 0 !== c) ||
                (b._gather(f.mid, c),
                "new" === k.state &&
                  k.start(g, l, e ? "controlling" : "controlled"),
                "new" === q.state && q.start(a));
              c = Dd(h, B);
              b._transceive(f, 0 < c.codecs.length, !1);
            }
          });
        }
        return (
          (b._localDescription = { type: a.type, sdp: a.sdp }),
          "offer" === a.type
            ? b._updateSignalingState("have-local-offer")
            : b._updateSignalingState("stable"),
          Promise.resolve()
        );
      };
      e.prototype.setRemoteDescription = function (e) {
        var f = this;
        if (-1 === ["offer", "answer"].indexOf(e.type))
          return Promise.reject(
            Ka("TypeError", 'Unsupported type "' + e.type + '"')
          );
        if (
          !Qg("setRemoteDescription", e.type, f.signalingState) ||
          f._isClosed
        )
          return Promise.reject(
            Ka(
              "InvalidStateError",
              "Can not set remote " + e.type + " in state " + f.signalingState
            )
          );
        var g = {};
        f.remoteStreams.forEach(function (a) {
          g[a.id] = a;
        });
        var h = [],
          l = F.splitSections(e.sdp),
          n = l.shift(),
          m = 0 < F.matchPrefix(n, "a=ice-lite").length,
          p = 0 < F.matchPrefix(n, "a=group:BUNDLE ").length;
        f.usingBundle = p;
        var r = F.matchPrefix(n, "a=ice-options:")[0];
        return (
          (f.canTrickleIceCandidates =
            !!r && 0 <= r.substr(14).split(" ").indexOf("trickle")),
          l.forEach(function (d, k) {
            var q = F.splitLines(d),
              B = F.getKind(d),
              l =
                F.isRejected(d) &&
                0 === F.matchPrefix(d, "a=bundle-only").length,
              L = q[0].substr(2).split(" ")[2];
            q = F.getDirection(d, n);
            var x = F.parseMsid(d),
              Ia = F.getMid(d) || F.generateIdentifier();
            if (
              l ||
              ("application" === B &&
                ("DTLS/SCTP" === L || "UDP/DTLS/SCTP" === L))
            )
              f.transceivers[k] = {
                mid: Ia,
                kind: B,
                protocol: L,
                rejected: !0,
              };
            else {
              var r, t;
              !l &&
                f.transceivers[k] &&
                f.transceivers[k].rejected &&
                (f.transceivers[k] = f._createTransceiver(B, !0));
              var Ha,
                la,
                u = F.parseRtpParameters(d);
              l ||
                ((Ha = F.getIceParameters(d, n)),
                ((la = F.getDtlsParameters(d, n)).role = "client"));
              L = F.parseRtpEncodingParameters(d);
              var Eg = F.parseRtcpParameters(d),
                v = 0 < F.matchPrefix(d, "a=end-of-candidates", n).length;
              d = F.matchPrefix(d, "a=candidate:")
                .map(function (a) {
                  return F.parseCandidate(a);
                })
                .filter(function (a) {
                  return 1 === a.component;
                });
              if (
                (("offer" === e.type || "answer" === e.type) &&
                  !l &&
                  p &&
                  0 < k &&
                  f.transceivers[k] &&
                  (f._disposeIceAndDtlsTransports(k),
                  (f.transceivers[k].iceGatherer =
                    f.transceivers[0].iceGatherer),
                  (f.transceivers[k].iceTransport =
                    f.transceivers[0].iceTransport),
                  (f.transceivers[k].dtlsTransport =
                    f.transceivers[0].dtlsTransport),
                  f.transceivers[k].rtpSender &&
                    f.transceivers[k].rtpSender.setTransport(
                      f.transceivers[0].dtlsTransport
                    ),
                  f.transceivers[k].rtpReceiver &&
                    f.transceivers[k].rtpReceiver.setTransport(
                      f.transceivers[0].dtlsTransport
                    )),
                "offer" !== e.type || l)
              ) {
                if ("answer" === e.type && !l) {
                  B = (r = f.transceivers[k]).iceGatherer;
                  var w = r.iceTransport;
                  var z = r.dtlsTransport;
                  var y = r.rtpReceiver;
                  l = r.sendEncodingParameters;
                  Ia = r.localCapabilities;
                  f.transceivers[k].recvEncodingParameters = L;
                  f.transceivers[k].remoteCapabilities = u;
                  f.transceivers[k].rtcpParameters = Eg;
                  d.length &&
                    "new" === w.state &&
                    ((!m && !v) || (p && 0 !== k)
                      ? d.forEach(function (a) {
                          De(r.iceTransport, a);
                        })
                      : w.setRemoteCandidates(d));
                  (p && 0 !== k) ||
                    ("new" === w.state && w.start(B, Ha, "controlling"),
                    "new" === z.state && z.start(la));
                  !Dd(r.localCapabilities, r.remoteCapabilities).codecs.filter(
                    function (a) {
                      return "rtx" === a.name.toLowerCase();
                    }
                  ).length &&
                    r.sendEncodingParameters[0].rtx &&
                    delete r.sendEncodingParameters[0].rtx;
                  f._transceive(
                    r,
                    "sendrecv" === q || "recvonly" === q,
                    "sendrecv" === q || "sendonly" === q
                  );
                  !y || ("sendrecv" !== q && "sendonly" !== q)
                    ? delete r.rtpReceiver
                    : ((t = y.track),
                      x
                        ? (g[x.stream] || (g[x.stream] = new c.MediaStream()),
                          b(t, g[x.stream]),
                          h.push([t, y, g[x.stream]]))
                        : (g.default || (g.default = new c.MediaStream()),
                          b(t, g.default),
                          h.push([t, y, g.default])));
                }
              } else {
                (r = f.transceivers[k] || f._createTransceiver(B)).mid = Ia;
                r.iceGatherer || (r.iceGatherer = f._createIceGatherer(k, p));
                d.length &&
                  "new" === r.iceTransport.state &&
                  (!v || (p && 0 !== k)
                    ? d.forEach(function (a) {
                        De(r.iceTransport, a);
                      })
                    : r.iceTransport.setRemoteCandidates(d));
                Ia = c.RTCRtpReceiver.getCapabilities(B);
                15019 > a &&
                  (Ia.codecs = Ia.codecs.filter(function (a) {
                    return "rtx" !== a.name;
                  }));
                l = r.sendEncodingParameters || [{ ssrc: 1001 * (2 * k + 2) }];
                Ha = !1;
                if ("sendrecv" === q || "sendonly" === q) {
                  if (
                    ((Ha = !r.rtpReceiver),
                    (y =
                      r.rtpReceiver ||
                      new c.RTCRtpReceiver(r.dtlsTransport, B)),
                    Ha)
                  )
                    (t = y.track),
                      (x && "-" === x.stream) ||
                        (x
                          ? (g[x.stream] ||
                              ((g[x.stream] = new c.MediaStream()),
                              Object.defineProperty(g[x.stream], "id", {
                                get: function () {
                                  return x.stream;
                                },
                              })),
                            Object.defineProperty(t, "id", {
                              get: function () {
                                return x.track;
                              },
                            }),
                            (w = g[x.stream]))
                          : (g.default || (g.default = new c.MediaStream()),
                            (w = g.default))),
                      w && (b(t, w), r.associatedRemoteMediaStreams.push(w)),
                      h.push([t, y, w]);
                } else
                  r.rtpReceiver &&
                    r.rtpReceiver.track &&
                    (r.associatedRemoteMediaStreams.forEach(function (a) {
                      var b = a.getTracks().find(function (a) {
                        return a.id === r.rtpReceiver.track.id;
                      });
                      b &&
                        (function (a, b) {
                          b.removeTrack(a);
                          b.dispatchEvent(
                            new c.MediaStreamTrackEvent("removetrack", {
                              track: a,
                            })
                          );
                        })(b, a);
                    }),
                    (r.associatedRemoteMediaStreams = []));
                r.localCapabilities = Ia;
                r.remoteCapabilities = u;
                r.rtpReceiver = y;
                r.rtcpParameters = Eg;
                r.sendEncodingParameters = l;
                r.recvEncodingParameters = L;
                f._transceive(f.transceivers[k], !1, Ha);
              }
            }
          }),
          void 0 === f._dtlsRole &&
            (f._dtlsRole = "offer" === e.type ? "active" : "passive"),
          (f._remoteDescription = { type: e.type, sdp: e.sdp }),
          "offer" === e.type
            ? f._updateSignalingState("have-remote-offer")
            : f._updateSignalingState("stable"),
          Object.keys(g).forEach(function (a) {
            var b = g[a];
            if (b.getTracks().length) {
              if (-1 === f.remoteStreams.indexOf(b)) {
                f.remoteStreams.push(b);
                var e = new Event("addstream");
                e.stream = b;
                c.setTimeout(function () {
                  f._dispatchEvent("addstream", e);
                });
              }
              h.forEach(function (a) {
                var c = a[0],
                  e = a[1];
                b.id === a[2].id && d(f, c, e, [b]);
              });
            }
          }),
          h.forEach(function (a) {
            a[2] || d(f, a[0], a[1], []);
          }),
          c.setTimeout(function () {
            f &&
              f.transceivers &&
              f.transceivers.forEach(function (a) {
                a.iceTransport &&
                  "new" === a.iceTransport.state &&
                  0 < a.iceTransport.getRemoteCandidates().length &&
                  (console.warn(
                    "Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"
                  ),
                  a.iceTransport.addRemoteCandidate({}));
              });
          }, 4e3),
          Promise.resolve()
        );
      };
      e.prototype.close = function () {
        this.transceivers.forEach(function (a) {
          a.iceTransport && a.iceTransport.stop();
          a.dtlsTransport && a.dtlsTransport.stop();
          a.rtpSender && a.rtpSender.stop();
          a.rtpReceiver && a.rtpReceiver.stop();
        });
        this._isClosed = !0;
        this._updateSignalingState("closed");
      };
      e.prototype._updateSignalingState = function (a) {
        this.signalingState = a;
        a = new Event("signalingstatechange");
        this._dispatchEvent("signalingstatechange", a);
      };
      e.prototype._maybeFireNegotiationNeeded = function () {
        var a = this;
        "stable" === this.signalingState &&
          !0 !== this.needNegotiation &&
          ((this.needNegotiation = !0),
          c.setTimeout(function () {
            if (a.needNegotiation) {
              a.needNegotiation = !1;
              var b = new Event("negotiationneeded");
              a._dispatchEvent("negotiationneeded", b);
            }
          }, 0));
      };
      e.prototype._updateIceConnectionState = function () {
        var a,
          b = {
            new: 0,
            closed: 0,
            checking: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0,
          };
        if (
          (this.transceivers.forEach(function (a) {
            a.iceTransport && !a.rejected && b[a.iceTransport.state]++;
          }),
          (a = "new"),
          0 < b.failed
            ? (a = "failed")
            : 0 < b.checking
            ? (a = "checking")
            : 0 < b.disconnected
            ? (a = "disconnected")
            : 0 < b.new
            ? (a = "new")
            : 0 < b.connected
            ? (a = "connected")
            : 0 < b.completed && (a = "completed"),
          a !== this.iceConnectionState)
        )
          (this.iceConnectionState = a),
            (a = new Event("iceconnectionstatechange")),
            this._dispatchEvent("iceconnectionstatechange", a);
      };
      e.prototype._updateConnectionState = function () {
        var a,
          b = {
            new: 0,
            closed: 0,
            connecting: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0,
          };
        if (
          (this.transceivers.forEach(function (a) {
            a.iceTransport &&
              a.dtlsTransport &&
              !a.rejected &&
              (b[a.iceTransport.state]++, b[a.dtlsTransport.state]++);
          }),
          (b.connected += b.completed),
          (a = "new"),
          0 < b.failed
            ? (a = "failed")
            : 0 < b.connecting
            ? (a = "connecting")
            : 0 < b.disconnected
            ? (a = "disconnected")
            : 0 < b.new
            ? (a = "new")
            : 0 < b.connected && (a = "connected"),
          a !== this.connectionState)
        )
          (this.connectionState = a),
            (a = new Event("connectionstatechange")),
            this._dispatchEvent("connectionstatechange", a);
      };
      e.prototype.createOffer = function (b) {
        var d = this;
        if (d._isClosed)
          return Promise.reject(
            Ka("InvalidStateError", "Can not call createOffer after close")
          );
        var e = d.transceivers.filter(function (a) {
            return "audio" === a.kind;
          }).length,
          f = d.transceivers.filter(function (a) {
            return "video" === a.kind;
          }).length;
        if (b) {
          if (b.mandatory || b.optional)
            throw new TypeError(
              "Legacy mandatory/optional constraints not supported."
            );
          void 0 !== b.offerToReceiveAudio &&
            (e =
              !0 === b.offerToReceiveAudio
                ? 1
                : !1 === b.offerToReceiveAudio
                ? 0
                : b.offerToReceiveAudio);
          void 0 !== b.offerToReceiveVideo &&
            (f =
              !0 === b.offerToReceiveVideo
                ? 1
                : !1 === b.offerToReceiveVideo
                ? 0
                : b.offerToReceiveVideo);
        }
        for (
          d.transceivers.forEach(function (a) {
            "audio" === a.kind
              ? 0 > --e && (a.wantReceive = !1)
              : "video" === a.kind && 0 > --f && (a.wantReceive = !1);
          });
          0 < e || 0 < f;

        )
          0 < e && (d._createTransceiver("audio"), e--),
            0 < f && (d._createTransceiver("video"), f--);
        var g = F.writeSessionBoilerplate(
          d._sdpSessionId,
          d._sdpSessionVersion++
        );
        d.transceivers.forEach(function (b, e) {
          var f = b.track,
            g = b.kind,
            k = b.mid || F.generateIdentifier();
          b.mid = k;
          b.iceGatherer ||
            (b.iceGatherer = d._createIceGatherer(e, d.usingBundle));
          k = c.RTCRtpSender.getCapabilities(g);
          15019 > a &&
            (k.codecs = k.codecs.filter(function (a) {
              return "rtx" !== a.name;
            }));
          k.codecs.forEach(function (a) {
            "H264" === a.name &&
              void 0 === a.parameters["level-asymmetry-allowed"] &&
              (a.parameters["level-asymmetry-allowed"] = "1");
            b.remoteCapabilities &&
              b.remoteCapabilities.codecs &&
              b.remoteCapabilities.codecs.forEach(function (b) {
                a.name.toLowerCase() === b.name.toLowerCase() &&
                  a.clockRate === b.clockRate &&
                  (a.preferredPayloadType = b.payloadType);
              });
          });
          k.headerExtensions.forEach(function (a) {
            (
              (b.remoteCapabilities && b.remoteCapabilities.headerExtensions) ||
              []
            ).forEach(function (b) {
              a.uri === b.uri && (a.id = b.id);
            });
          });
          e = b.sendEncodingParameters || [{ ssrc: 1001 * (2 * e + 1) }];
          f &&
            15019 <= a &&
            "video" === g &&
            !e[0].rtx &&
            (e[0].rtx = { ssrc: e[0].ssrc + 1 });
          b.wantReceive &&
            (b.rtpReceiver = new c.RTCRtpReceiver(b.dtlsTransport, g));
          b.localCapabilities = k;
          b.sendEncodingParameters = e;
        });
        "max-compat" !== d._config.bundlePolicy &&
          (g +=
            "a=group:BUNDLE " +
            d.transceivers
              .map(function (a) {
                return a.mid;
              })
              .join(" ") +
            "\r\n");
        g += "a=ice-options:trickle\r\n";
        d.transceivers.forEach(function (a, b) {
          g += Pg(a, a.localCapabilities, "offer", a.stream, d._dtlsRole);
          g += "a=rtcp-rsize\r\n";
          !a.iceGatherer ||
            "new" === d.iceGatheringState ||
            (0 !== b && d.usingBundle) ||
            (a.iceGatherer.getLocalCandidates().forEach(function (a) {
              a.component = 1;
              g += "a=" + F.writeCandidate(a) + "\r\n";
            }),
            "completed" === a.iceGatherer.state &&
              (g += "a=end-of-candidates\r\n"));
        });
        b = new c.RTCSessionDescription({ type: "offer", sdp: g });
        return Promise.resolve(b);
      };
      e.prototype.createAnswer = function () {
        var b = this;
        if (b._isClosed)
          return Promise.reject(
            Ka("InvalidStateError", "Can not call createAnswer after close")
          );
        if (
          "have-remote-offer" !== b.signalingState &&
          "have-local-pranswer" !== b.signalingState
        )
          return Promise.reject(
            Ka(
              "InvalidStateError",
              "Can not call createAnswer in signalingState " + b.signalingState
            )
          );
        var d = F.writeSessionBoilerplate(
          b._sdpSessionId,
          b._sdpSessionVersion++
        );
        b.usingBundle &&
          (d +=
            "a=group:BUNDLE " +
            b.transceivers
              .map(function (a) {
                return a.mid;
              })
              .join(" ") +
            "\r\n");
        d += "a=ice-options:trickle\r\n";
        var e = F.getMediaSections(b._remoteDescription.sdp).length;
        b.transceivers.forEach(function (c, f) {
          if (!(f + 1 > e)) {
            if (c.rejected)
              return (
                "application" === c.kind
                  ? "DTLS/SCTP" === c.protocol
                    ? (d += "m=application 0 DTLS/SCTP 5000\r\n")
                    : (d +=
                        "m=application 0 " +
                        c.protocol +
                        " webrtc-datachannel\r\n")
                  : "audio" === c.kind
                  ? (d +=
                      "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n")
                  : "video" === c.kind &&
                    (d +=
                      "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                void (d +=
                  "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + c.mid + "\r\n")
              );
            var g;
            c.stream &&
              ("audio" === c.kind
                ? (g = c.stream.getAudioTracks()[0])
                : "video" === c.kind && (g = c.stream.getVideoTracks()[0]),
              g &&
                15019 <= a &&
                "video" === c.kind &&
                !c.sendEncodingParameters[0].rtx &&
                (c.sendEncodingParameters[0].rtx = {
                  ssrc: c.sendEncodingParameters[0].ssrc + 1,
                }));
            f = Dd(c.localCapabilities, c.remoteCapabilities);
            !f.codecs.filter(function (a) {
              return "rtx" === a.name.toLowerCase();
            }).length &&
              c.sendEncodingParameters[0].rtx &&
              delete c.sendEncodingParameters[0].rtx;
            d += Pg(c, f, "answer", c.stream, b._dtlsRole);
            c.rtcpParameters &&
              c.rtcpParameters.reducedSize &&
              (d += "a=rtcp-rsize\r\n");
          }
        });
        var f = new c.RTCSessionDescription({ type: "answer", sdp: d });
        return Promise.resolve(f);
      };
      e.prototype.addIceCandidate = function (a) {
        var b,
          c = this;
        return a && void 0 === a.sdpMLineIndex && !a.sdpMid
          ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required"))
          : new Promise(function (d, e) {
              if (!c._remoteDescription)
                return e(
                  Ka(
                    "InvalidStateError",
                    "Can not add ICE candidate without a remote description"
                  )
                );
              if (a && "" !== a.candidate) {
                var f = a.sdpMLineIndex;
                if (a.sdpMid)
                  for (var g = 0; g < c.transceivers.length; g++)
                    if (c.transceivers[g].mid === a.sdpMid) {
                      f = g;
                      break;
                    }
                var k = c.transceivers[f];
                if (!k)
                  return e(Ka("OperationError", "Can not add ICE candidate"));
                if (k.rejected) return d();
                g =
                  0 < Object.keys(a.candidate).length
                    ? F.parseCandidate(a.candidate)
                    : {};
                if (
                  ("tcp" === g.protocol && (0 === g.port || 9 === g.port)) ||
                  (g.component && 1 !== g.component)
                )
                  return d();
                if (
                  (0 === f ||
                    (0 < f &&
                      k.iceTransport !== c.transceivers[0].iceTransport)) &&
                  !De(k.iceTransport, g)
                )
                  return e(Ka("OperationError", "Can not add ICE candidate"));
                e = a.candidate.trim();
                0 === e.indexOf("a=") && (e = e.substr(2));
                (b = F.getMediaSections(c._remoteDescription.sdp))[f] +=
                  "a=" + (g.type ? e : "end-of-candidates") + "\r\n";
                c._remoteDescription.sdp =
                  F.getDescription(c._remoteDescription.sdp) + b.join("");
              } else for (f = 0; f < c.transceivers.length && (c.transceivers[f].rejected || (c.transceivers[f].iceTransport.addRemoteCandidate({}), ((b = F.getMediaSections(c._remoteDescription.sdp))[f] += "a=end-of-candidates\r\n"), (c._remoteDescription.sdp = F.getDescription(c._remoteDescription.sdp) + b.join("")), !c.usingBundle)); f++);
              d();
            });
      };
      e.prototype.getStats = function (a) {
        if (a && a instanceof c.MediaStreamTrack) {
          var b = null;
          if (
            (this.transceivers.forEach(function (c) {
              c.rtpSender && c.rtpSender.track === a
                ? (b = c.rtpSender)
                : c.rtpReceiver &&
                  c.rtpReceiver.track === a &&
                  (b = c.rtpReceiver);
            }),
            !b)
          )
            throw Ka("InvalidAccessError", "Invalid selector.");
          return b.getStats();
        }
        var d = [];
        return (
          this.transceivers.forEach(function (a) {
            [
              "rtpSender",
              "rtpReceiver",
              "iceGatherer",
              "iceTransport",
              "dtlsTransport",
            ].forEach(function (b) {
              a[b] && d.push(a[b].getStats());
            });
          }),
          Promise.all(d).then(function (a) {
            var b = new Map();
            return (
              a.forEach(function (a) {
                a.forEach(function (a) {
                  b.set(a.id, a);
                });
              }),
              b
            );
          })
        );
      };
      [
        "RTCRtpSender",
        "RTCRtpReceiver",
        "RTCIceGatherer",
        "RTCIceTransport",
        "RTCDtlsTransport",
      ].forEach(function (a) {
        if ((a = c[a]) && a.prototype && a.prototype.getStats) {
          var b = a.prototype.getStats;
          a.prototype.getStats = function () {
            return b.apply(this).then(function (a) {
              var b = new Map();
              return (
                Object.keys(a).forEach(function (c) {
                  var d = a[c];
                  a[c].type =
                    {
                      inboundrtp: "inbound-rtp",
                      outboundrtp: "outbound-rtp",
                      candidatepair: "candidate-pair",
                      localcandidate: "local-candidate",
                      remotecandidate: "remote-candidate",
                    }[d.type] || d.type;
                  b.set(c, a[c]);
                }),
                b
              );
            });
          };
        }
      });
      var f = ["createOffer", "createAnswer"];
      return (
        f.forEach(function (a) {
          var b = e.prototype[a];
          e.prototype[a] = function () {
            var a = arguments;
            return "function" == typeof a[0] || "function" == typeof a[1]
              ? b.apply(this, [arguments[2]]).then(
                  function (b) {
                    "function" == typeof a[0] && a[0].apply(null, [b]);
                  },
                  function (b) {
                    "function" == typeof a[1] && a[1].apply(null, [b]);
                  }
                )
              : b.apply(this, arguments);
          };
        }),
        (f = [
          "setLocalDescription",
          "setRemoteDescription",
          "addIceCandidate",
        ]).forEach(function (a) {
          var b = e.prototype[a];
          e.prototype[a] = function () {
            var a = arguments;
            return "function" == typeof a[1] || "function" == typeof a[2]
              ? b.apply(this, arguments).then(
                  function () {
                    "function" == typeof a[1] && a[1].apply(null);
                  },
                  function (b) {
                    "function" == typeof a[2] && a[2].apply(null, [b]);
                  }
                )
              : b.apply(this, arguments);
          };
        }),
        ["getStats"].forEach(function (a) {
          var b = e.prototype[a];
          e.prototype[a] = function () {
            var a = arguments;
            return "function" == typeof a[1]
              ? b.apply(this, arguments).then(function () {
                  "function" == typeof a[1] && a[1].apply(null);
                })
              : b.apply(this, arguments);
          };
        }),
        e
      );
    },
    gk = Object.freeze({
      __proto__: null,
      shimPeerConnection: Ee,
      shimReplaceTrack: Tg,
      shimGetUserMedia: Rg,
      shimGetDisplayMedia: Sg,
    }),
    hk = Object.freeze({
      __proto__: null,
      shimOnTrack: Vg,
      shimPeerConnection: Fe,
      shimSenderGetStats: Wg,
      shimReceiverGetStats: Xg,
      shimRemoveStream: Yg,
      shimRTCDataChannel: Zg,
      shimGetUserMedia: Ug,
      shimGetDisplayMedia: function (c, a) {
        (c.navigator.mediaDevices &&
          "getDisplayMedia" in c.navigator.mediaDevices) ||
          (c.navigator.mediaDevices &&
            (c.navigator.mediaDevices.getDisplayMedia = function (b) {
              return b && b.video
                ? (!0 === b.video
                    ? (b.video = { mediaSource: a })
                    : (b.video.mediaSource = a),
                  c.navigator.mediaDevices.getUserMedia(b))
                : ((b = new DOMException(
                    "getDisplayMedia without video constraints is undefined"
                  )),
                  (b.name = "NotFoundError"),
                  (b.code = 8),
                  u.reject(b));
            }));
      },
    }),
    ik = Object.freeze({
      __proto__: null,
      shimLocalStreamsAPI: $g,
      shimRemoteStreamsAPI: ah,
      shimCallbacksAPI: bh,
      shimGetUserMedia: ch,
      shimConstraints: dh,
      shimRTCIceServerUrls: eh,
      shimTrackEventTransceiver: fh,
      shimCreateOfferLegacy: gh,
    }),
    Ho = Object.freeze({
      __proto__: null,
      shimRTCIceCandidate: Ed,
      shimMaxMessageSize: Tc,
      shimSendThrowTypeError: Uc,
      shimConnectionState: Ge,
      removeAllowExtmapMixed: He,
    });
  (function (
    { window: c } = {},
    a = { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 }
  ) {
    let b = Lb(c),
      d = {
        browserDetails: b,
        commonShim: Ho,
        extractVersion: Kb,
        disableLog: ql,
        disableWarnings: rl,
      };
    switch (b.browser) {
      case "chrome":
        if (!ck || !Ce || !a.shimChrome)
          return pb("Chrome shim is not included in this adapter release."), d;
        pb("adapter.js shimming chrome.");
        d.browserShim = ck;
        Dg(c);
        Hg(c);
        Ce(c);
        Ig(c);
        Ng(c);
        Jg(c);
        Kg(c);
        Lg(c);
        Og(c);
        Ed(c);
        Ge(c);
        Tc(c);
        Uc(c);
        He(c);
        break;
      case "firefox":
        if (!hk || !Fe || !a.shimFirefox)
          return pb("Firefox shim is not included in this adapter release."), d;
        pb("adapter.js shimming firefox.");
        d.browserShim = hk;
        Ug(c);
        Fe(c);
        Vg(c);
        Yg(c);
        Wg(c);
        Xg(c);
        Zg(c);
        Ed(c);
        Ge(c);
        Tc(c);
        Uc(c);
        break;
      case "edge":
        if (!gk || !Ee || !a.shimEdge)
          return pb("MS edge shim is not included in this adapter release."), d;
        pb("adapter.js shimming edge.");
        d.browserShim = gk;
        Rg(c);
        Sg(c);
        Ee(c);
        Tg(c);
        Tc(c);
        Uc(c);
        break;
      case "safari":
        if (!ik || !a.shimSafari)
          return pb("Safari shim is not included in this adapter release."), d;
        pb("adapter.js shimming safari.");
        d.browserShim = ik;
        eh(c);
        gh(c);
        bh(c);
        $g(c);
        ah(c);
        fh(c);
        ch(c);
        Ed(c);
        Tc(c);
        Uc(c);
        He(c);
        break;
      default:
        pb("Unsupported browser!");
    }
    return d;
  })({ window });
  var X, ea;
  !(function (c) {
    c.WIN_10 = "Windows 10";
    c.WIN_81 = "Windows 8.1";
    c.WIN_8 = "Windows 8";
    c.WIN_7 = "Windows 7";
    c.WIN_VISTA = "Windows Vista";
    c.WIN_SERVER_2003 = "Windows Server 2003";
    c.WIN_XP = "Windows XP";
    c.WIN_2000 = "Windows 2000";
    c.ANDROID = "Android";
    c.OPEN_BSD = "Open BSD";
    c.SUN_OS = "Sun OS";
    c.LINUX = "Linux";
    c.IOS = "iOS";
    c.MAC_OS_X = "Mac OS X";
    c.MAC_OS = "Mac OS";
    c.QNX = "QNX";
    c.UNIX = "UNIX";
    c.BEOS = "BeOS";
    c.OS_2 = "OS/2";
    c.SEARCH_BOT = "Search Bot";
  })(X || (X = {}));
  (function (c) {
    c.CHROME = "Chrome";
    c.SAFARI = "Safari";
    c.EDGE = "Edge";
    c.FIREFOX = "Firefox";
    c.OPERA = "OPR";
    c.QQ = "QQBrowser";
    c.WECHAT = "MicroMessenger";
  })(ea || (ea = {}));
  let db = (function (c) {
    if (c.match(/[0-9]+\.[0-9]+\.[0-9]+$/)) return c;
    var a = c.match(/([0-9]+\.[0-9]+\.[0-9]+)\-alpha\.([0-9]+)/);
    if (a && a[1] && a[2]) {
      var b,
        d = a[2];
      return n((b = "".concat(a[1], "."))).call(b, d);
    }
    return (a = c.match(/([0-9]+\.[0-9]+\.[0-9]+)\-special\.([0-9]+)/)) &&
      a[1] &&
      a[2]
      ? ((b = a[2]),
        n((d = "".concat(a[1], "."))).call(d, 100 * (Number(b) + 1)))
      : "4.0.0.999";
  })("4.2.1");
  try {
    var jk = !0 === JSON.parse("true");
  } catch (c) {
    jk = !0;
  }
  let yc = jk,
    eb = {
      username: "test",
      password: "111111",
      turnServerURL: "",
      tcpport: 3433,
      udpport: 3478,
      forceturn: !1,
    },
    vl = {
      "90p": H(160, 90),
      "90p_1": H(160, 90),
      "120p": H(160, 120, 15, 30, 65),
      "120p_1": H(160, 120, 15, 30, 65),
      "120p_3": H(120, 120, 15, 30, 50),
      "120p_4": H(212, 120),
      "180p": H(320, 180, 15, 30, 140),
      "180p_1": H(320, 180, 15, 30, 140),
      "180p_3": H(180, 180, 15, 30, 100),
      "180p_4": H(240, 180, 15, 30, 120),
      "240p": H(320, 240, 15, 40, 200),
      "240p_1": H(320, 240, 15, 40, 200),
      "240p_3": H(240, 240, 15, 40, 140),
      "240p_4": H(424, 240, 15, 40, 220),
      "360p": H(640, 360, 15, 80, 400),
      "360p_1": H(640, 360, 15, 80, 400),
      "360p_3": H(360, 360, 15, 80, 260),
      "360p_4": H(640, 360, 30, 80, 600),
      "360p_6": H(360, 360, 30, 80, 400),
      "360p_7": H(480, 360, 15, 80, 320),
      "360p_8": H(480, 360, 30, 80, 490),
      "360p_9": H(640, 360, 15, 80, 800),
      "360p_10": H(640, 360, 24, 80, 800),
      "360p_11": H(640, 360, 24, 80, 1e3),
      "480p": H(640, 480, 15, 100, 500),
      "480p_1": H(640, 480, 15, 100, 500),
      "480p_2": H(640, 480, 30, 100, 1e3),
      "480p_3": H(480, 480, 15, 100, 400),
      "480p_4": H(640, 480, 30, 100, 750),
      "480p_6": H(480, 480, 30, 100, 600),
      "480p_8": H(848, 480, 15, 100, 610),
      "480p_9": H(848, 480, 30, 100, 930),
      "480p_10": H(640, 480, 10, 100, 400),
      "720p": H(1280, 720, 15, 120, 1130),
      "720p_1": H(1280, 720, 15, 120, 1130),
      "720p_2": H(1280, 720, 30, 120, 2e3),
      "720p_3": H(1280, 720, 30, 120, 1710),
      "720p_5": H(960, 720, 15, 120, 910),
      "720p_6": H(960, 720, 30, 120, 1380),
      "1080p": H(1920, 1080, 15, 120, 2080),
      "1080p_1": H(1920, 1080, 15, 120, 2080),
      "1080p_2": H(1920, 1080, 30, 120, 3e3),
      "1080p_3": H(1920, 1080, 30, 120, 3150),
      "1080p_5": H(1920, 1080, 60, 120, 4780),
      "1440p": H(2560, 1440, 30, 120, 4850),
      "1440p_1": H(2560, 1440, 30, 120, 4850),
      "1440p_2": H(2560, 1440, 60, 120, 7350),
      "4k": H(3840, 2160, 30, 120, 8910),
      "4k_1": H(3840, 2160, 30, 120, 8910),
      "4k_3": H(3840, 2160, 60, 120, 13500),
    },
    wl = {
      "480p": Mb(640, 480, 5),
      "480p_1": Mb(640, 480, 5),
      "480p_2": Mb(640, 480, 30),
      "720p": Mb(1280, 720, 5),
      "720p_1": Mb(1280, 720, 5),
      "720p_2": Mb(1280, 720, 30),
      "1080p": Mb(1920, 1080, 5),
      "1080p_1": Mb(1920, 1080, 5),
      "1080p_2": Mb(1920, 1080, 30),
    },
    xl = {
      speech_low_quality: wc(16e3, !1),
      speech_standard: wc(32e3, !1, 18),
      music_standard: wc(48e3, !1),
      standard_stereo: wc(48e3, !0, 56),
      high_quality: wc(48e3, !1, 128),
      high_quality_stereo: wc(48e3, !0, 192),
    },
    w = {
      PROCESS_ID: "",
      ENCRYPT_AES: !0,
      AREAS: [],
      WEBCS_DOMAIN: [
        "webrtc2-ap-web-1.agora.io",
        "webrtc2-ap-web-2.agoraio.cn",
      ],
      WEBCS_DOMAIN_BACKUP_LIST: [
        "webrtc2-ap-web-3.agora.io",
        "webrtc2-ap-web-4.agoraio.cn",
      ],
      PROXY_CS: ["ap-proxy-1.agora.io", "ap-proxy-2.agora.io"],
      CDS_AP: [
        "cds-ap-web-1.agora.io",
        "cds-ap-web-2.agoraio.cn",
        "cds-ap-web-3.agora.io",
        "cds-ap-web-4.agoraio.cn",
      ],
      ACCOUNT_REGISTER: [
        "sua-ap-web-1.agora.io",
        "sua-ap-web-2.agoraio.cn",
        "sua-ap-web-3.agora.io",
        "sua-ap-web-4.agoraio.cn",
      ],
      UAP_AP: [
        "uap-ap-web-1.agora.io",
        "uap-ap-web-2.agoraio.cn",
        "uap-ap-web-3.agora.io",
        "uap-ap-web-4.agoraio.cn",
      ],
      LOG_UPLOAD_SERVER: "logservice.agora.io",
      EVENT_REPORT_DOMAIN: "statscollector-1.agora.io",
      EVENT_REPORT_BACKUP_DOMAIN: "statscollector-2.agoraio.cn",
      GATEWAY_ADDRESS: [],
      GATEWAY_WSS_ADDRESS: "",
      LIVE_STREAMING_ADDRESS: "",
      ACCOUNT_REGISTER_RETRY_TIMEOUT: 1,
      ACCOUNT_REGISTER_RETRY_RATIO: 2,
      ACCOUNT_REGISTER_RETRY_TIMEOUT_MAX: 6e4,
      ACCOUNT_REGISTER_RETRY_COUNT_MAX: 1e5,
      AUDIO_CONTEXT: null,
      WEBCS_BACKUP_CONNECT_TIMEOUT: 6e3,
      HTTP_CONNECT_TIMEOUT: 5e3,
      PLAYER_STATE_DEFER: 2e3,
      SIGNAL_REQUEST_TIMEOUT: 1e4,
      SIGNAL_REQUEST_WATCH_INTERVAL: 1e3,
      REPORT_STATS: !0,
      UPLOAD_LOG: !1,
      NOT_REPORT_EVENT: [],
      FILEPATH_LENMAX: 255,
      SUBSCRIBE_TCC: !1,
      PING_PONG_TIME_OUT: 10,
      DUALSTREAM_OPERATION_CHECK: !0,
      WEBSOCKET_TIMEOUT_MIN: 1e4,
      EVENT_REPORT_SEND_INTERVAL: 3e3,
      MEDIA_ELEMENT_EXISTS_DEPTH: 3,
      CANDIDATE_TIMEOUT: 5e3,
      SHIM_CANDIDATE: !1,
      LEAVE_MSG_TIMEOUT: 2e3,
      SHOW_REPORT_INVOKER_LOG: !1,
      STATS_FILTER: { transportId: !0, googTrackId: !0 },
      JOIN_EXTEND: "",
      PUB_EXTEND: "",
      SUB_EXTEND: "",
      FORCE_TURN: !1,
      TURN_ENABLE_TCP: !0,
      TURN_ENABLE_UDP: !0,
      MAX_UPLOAD_CACHE: 50,
      UPLOAD_CACHE_INTERVAL: 2e3,
      CHROME_FORCE_PLAN_B: !1,
      AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL: 400,
      AUDIO_SOURCE_AVG_VOLUME_DURATION: 3e3,
      AUDIO_VOLUME_INDICATION_INTERVAL: 2e3,
      NORMAL_EVENT_QUEUE_CAPACITY: 100,
      CUSTOM_REPORT: !0,
      CUSTOM_REPORT_LIMIT: 20,
      PROXY_SERVER_TYPE2: "webnginx-proxy.agora.io",
      PROXY_SERVER_TYPE3: "webrtc-cloud-proxy.sd-rtn.com",
    };
  yc ||
    ((w.WEBCS_DOMAIN = [
      "ap-web-1-oversea.agora.io",
      "ap-web-1-north-america.agora.io",
    ]),
    (w.WEBCS_DOMAIN_BACKUP_LIST = [
      "ap-web-2-oversea.agora.io",
      "ap-web-2-north-america.agora.io",
    ]),
    (w.PROXY_CS = [
      "proxy-ap-web-oversea.agora.io",
      "proxy-ap-web-america.agora.io",
    ]),
    (w.CDS_AP = [
      "cds-ap-web-oversea.agora.io",
      "cds-ap-web-america.agora.io",
      "cds-ap-web-america2.agora.io",
    ]),
    (w.ACCOUNT_REGISTER = [
      "sua-ap-web-oversea.agora.io",
      "sua-ap-web-america.agora.io",
      "sua-ap-web-america2.agora.io",
    ]),
    (w.UAP_AP = [
      "uap-ap-web-oversea.agora.io",
      "uap-ap-web-america.agora.io",
      "uap-ap-web-america2.agora.io",
    ]),
    (w.LOG_UPLOAD_SERVER = "logservice-oversea.agora.io"),
    (w.EVENT_REPORT_DOMAIN = "statscollector-1-oversea.agora.io"),
    (w.EVENT_REPORT_BACKUP_DOMAIN = "statscollector-2-oversea.agora.io"));
  let Io = [
      [0, 1, 2, 3, 4, 5, 5],
      [0, 2, 2, 3, 4, 5, 5],
      [0, 3, 3, 3, 4, 5, 5],
      [0, 4, 4, 4, 4, 5, 5],
      [0, 5, 5, 5, 5, 5, 5],
    ],
    kk = [];
  var bg = [],
    lk = bg.sort,
    Jo = ra(function () {
      bg.sort(void 0);
    }),
    Ko = ra(function () {
      bg.sort(null);
    }),
    Lo = kd("sort");
  M(
    { target: "Array", proto: !0, forced: Jo || !Ko || Lo },
    {
      sort: function (c) {
        return void 0 === c ? lk.call(ub(this)) : lk.call(ub(this), rb(c));
      },
    }
  );
  var Mo = Da("Array").sort,
    mk = Array.prototype,
    sd = function (c) {
      var a = c.sort;
      return c === mk || (c instanceof Array && a === mk.sort) ? Mo : a;
    };
  M({ target: "Array", stat: !0 }, { isArray: kc });
  var ec = ha.Array.isArray,
    l;
  !(function (c) {
    c.UNEXPECTED_ERROR = "UNEXPECTED_ERROR";
    c.UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE";
    c.TIMEOUT = "TIMEOUT";
    c.INVALID_PARAMS = "INVALID_PARAMS";
    c.NOT_SUPPORTED = "NOT_SUPPORTED";
    c.INVALID_OPERATION = "INVALID_OPERATION";
    c.OPERATION_ABORTED = "OPERATION_ABORTED";
    c.WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT";
    c.NETWORK_ERROR = "NETWORK_ERROR";
    c.NETWORK_TIMEOUT = "NETWORK_TIMEOUT";
    c.NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR";
    c.API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT";
    c.ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED";
    c.DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND";
    c.ELECTRON_IS_NULL = "ELECTRON_IS_NULL";
    c.ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR =
      "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR";
    c.CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE";
    c.CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL";
    c.MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID";
    c.PERMISSION_DENIED = "PERMISSION_DENIED";
    c.CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED";
    c.TRACK_IS_DISABLED = "TRACK_IS_DISABLED";
    c.SHARE_AUDIO_NOT_ALLOWED = "SHARE_AUDIO_NOT_ALLOWED";
    c.INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID";
    c.CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER";
    c.CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER";
    c.VOID_GATEWAY_ADDRESS = "VOID_GATEWAY_ADDRESS";
    c.UID_CONFLICT = "UID_CONFLICT";
    c.INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK";
    c.INVALID_TRACK = "INVALID_TRACK";
    c.SENDER_NOT_FOUND = "SENDER_NOT_FOUND";
    c.CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED";
    c.SET_ANSWER_FAILED = "SET_ANSWER_FAILED";
    c.ICE_FAILED = "ICE_FAILED";
    c.PC_CLOSED = "PC_CLOSED";
    c.SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED";
    c.GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST";
    c.NO_ICE_CANDIDATE = "NO_ICE_CANDIDATE";
    c.CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS =
      "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS";
    c.EXIST_DISABLED_VIDEO_TRACK = "EXIST_DISABLED_VIDEO_TRACK";
    c.INVALID_REMOTE_USER = "INVALID_REMOTE_USER";
    c.REMOTE_USER_IS_NOT_PUBLISHED = "REMOTE_USER_IS_NOT_PUBLISHED";
    c.CUSTOM_REPORT_SEND_FAILED = "CUSTOM_REPORT_SEND_FAILED";
    c.CUSTOM_REPORT_FREQUENCY_TOO_HIGH = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH";
    c.FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED";
    c.READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR";
    c.DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED";
    c.WS_ABORT = "WS_ABORT";
    c.WS_DISCONNECT = "WS_DISCONNECT";
    c.WS_ERR = "WS_ERR";
    c.LIVE_STREAMING_TASK_CONFLICT = "LIVE_STREAMING_TASK_CONFLICT";
    c.LIVE_STREAMING_INVALID_ARGUMENT = "LIVE_STREAMING_INVALID_ARGUMENT";
    c.LIVE_STREAMING_INTERNAL_SERVER_ERROR =
      "LIVE_STREAMING_INTERNAL_SERVER_ERROR";
    c.LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED =
      "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED";
    c.LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED =
      "LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED";
    c.LIVE_STREAMING_CDN_ERROR = "LIVE_STREAMING_CDN_ERROR";
    c.LIVE_STREAMING_INVALID_RAW_STREAM = "LIVE_STREAMING_INVALID_RAW_STREAM";
    c.LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT =
      "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT";
    c.LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE =
      "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE";
    c.LIVE_STREAMING_WARN_FREQUENT_REQUEST =
      "LIVE_STREAMING_WARN_FREQUENT_REQUEST";
    c.WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR";
    c.BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR";
    c.CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR";
    c.CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC";
    c.CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST";
    c.CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST =
      "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST";
    c.CROSS_CHANNEL_SERVER_ERROR_RESPONSE =
      "CROSS_CHANNEL_SERVER_ERROR_RESPONSE";
    c.METADATA_OUT_OF_RANGE = "METADATA_OUT_OF_RANGE";
  })(l || (l = {}));
  var qh = function (c, a) {
      return function () {
        for (var b = Array(arguments.length), d = 0; d < b.length; d++)
          b[d] = arguments[d];
        return c.apply(a, b);
      };
    },
    xc = Object.prototype.toString,
    I = {
      isArray: hh,
      isArrayBuffer: function (c) {
        return "[object ArrayBuffer]" === xc.call(c);
      },
      isBuffer: function (c) {
        return (
          null != c &&
          null != c.constructor &&
          "function" == typeof c.constructor.isBuffer &&
          c.constructor.isBuffer(c)
        );
      },
      isFormData: function (c) {
        return "undefined" != typeof FormData && c instanceof FormData;
      },
      isArrayBufferView: function (c) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
          ? ArrayBuffer.isView(c)
          : c && c.buffer && c.buffer instanceof ArrayBuffer;
      },
      isString: function (c) {
        return "string" == typeof c;
      },
      isNumber: function (c) {
        return "number" == typeof c;
      },
      isObject: ih,
      isUndefined: function (c) {
        return void 0 === c;
      },
      isDate: function (c) {
        return "[object Date]" === xc.call(c);
      },
      isFile: function (c) {
        return "[object File]" === xc.call(c);
      },
      isBlob: function (c) {
        return "[object Blob]" === xc.call(c);
      },
      isFunction: jh,
      isStream: function (c) {
        return ih(c) && jh(c.pipe);
      },
      isURLSearchParams: function (c) {
        return (
          "undefined" != typeof URLSearchParams && c instanceof URLSearchParams
        );
      },
      isStandardBrowserEnv: function () {
        return (
          ("undefined" == typeof navigator ||
            ("ReactNative" !== navigator.product &&
              "NativeScript" !== navigator.product &&
              "NS" !== navigator.product)) &&
          "undefined" != typeof window &&
          "undefined" != typeof document
        );
      },
      forEach: Gd,
      merge: kh,
      deepMerge: Je,
      extend: function (c, a, b) {
        return (
          Gd(a, function (a, e) {
            c[e] = b && "function" == typeof a ? qh(a, b) : a;
          }),
          c
        );
      },
      trim: function (c) {
        return c.replace(/^\s*/, "").replace(/\s*$/, "");
      },
    },
    nk = function (c, a, b) {
      if (!a) return c;
      if (b) a = b(a);
      else if (I.isURLSearchParams(a)) a = a.toString();
      else {
        var d = [];
        I.forEach(a, function (a, b) {
          null != a &&
            (I.isArray(a) ? (b += "[]") : (a = [a]),
            I.forEach(a, function (a) {
              I.isDate(a)
                ? (a = a.toISOString())
                : I.isObject(a) && (a = JSON.stringify(a));
              d.push(lh(b) + "=" + lh(a));
            }));
        });
        a = d.join("&");
      }
      a &&
        ((b = c.indexOf("#")),
        -1 !== b && (c = c.slice(0, b)),
        (c += (-1 === c.indexOf("?") ? "?" : "&") + a));
      return c;
    };
  Hd.prototype.use = function (c, a) {
    return (
      this.handlers.push({ fulfilled: c, rejected: a }),
      this.handlers.length - 1
    );
  };
  Hd.prototype.eject = function (c) {
    this.handlers[c] && (this.handlers[c] = null);
  };
  Hd.prototype.forEach = function (c) {
    I.forEach(this.handlers, function (a) {
      null !== a && c(a);
    });
  };
  var nh = Hd,
    cg = function (c, a, b) {
      return (
        I.forEach(b, function (b) {
          c = b(c, a);
        }),
        c
      );
    },
    ok = function (c) {
      return !(!c || !c.__CANCEL__);
    },
    pk = function (c, a) {
      I.forEach(c, function (b, d) {
        d !== a &&
          d.toUpperCase() === a.toUpperCase() &&
          ((c[a] = b), delete c[d]);
      });
    },
    qe = function (c, a, b, d, e) {
      return (
        (c.config = a),
        b && (c.code = b),
        (c.request = d),
        (c.response = e),
        (c.isAxiosError = !0),
        (c.toJSON = function () {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
          };
        }),
        c
      );
    },
    No =
      "age authorization content-length content-type etag expires from host if-modified-since if-unmodified-since last-modified location max-forwards proxy-authorization referer retry-after user-agent".split(
        " "
      ),
    Oo = function (c) {
      var a,
        b,
        d,
        e = {};
      return c
        ? (I.forEach(c.split("\n"), function (c) {
            ((d = c.indexOf(":")),
            (a = I.trim(c.substr(0, d)).toLowerCase()),
            (b = I.trim(c.substr(d + 1))),
            !a) ||
              (e[a] && 0 <= No.indexOf(a)) ||
              (e[a] =
                "set-cookie" === a
                  ? (e[a] ? e[a] : []).concat([b])
                  : e[a]
                  ? e[a] + ", " + b
                  : b);
          }),
          e)
        : e;
    },
    Po = I.isStandardBrowserEnv()
      ? (function () {
          function c(a) {
            return (
              b && (d.setAttribute("href", a), (a = d.href)),
              d.setAttribute("href", a),
              {
                href: d.href,
                protocol: d.protocol ? d.protocol.replace(/:$/, "") : "",
                host: d.host,
                search: d.search ? d.search.replace(/^\?/, "") : "",
                hash: d.hash ? d.hash.replace(/^#/, "") : "",
                hostname: d.hostname,
                port: d.port,
                pathname:
                  "/" === d.pathname.charAt(0) ? d.pathname : "/" + d.pathname,
              }
            );
          }
          var a,
            b = /(msie|trident)/i.test(navigator.userAgent),
            d = document.createElement("a");
          return (
            (a = c(window.location.href)),
            function (b) {
              b = I.isString(b) ? c(b) : b;
              return b.protocol === a.protocol && b.host === a.host;
            }
          );
        })()
      : function () {
          return !0;
        },
    Qo = I.isStandardBrowserEnv()
      ? {
          write: function (c, a, b, d, e, f) {
            var g = [];
            g.push(c + "=" + encodeURIComponent(a));
            I.isNumber(b) && g.push("expires=" + new Date(b).toGMTString());
            I.isString(d) && g.push("path=" + d);
            I.isString(e) && g.push("domain=" + e);
            !0 === f && g.push("secure");
            document.cookie = g.join("; ");
          },
          read: function (c) {
            return (c = document.cookie.match(
              new RegExp("(^|;\\s*)(" + c + ")=([^;]*)")
            ))
              ? decodeURIComponent(c[3])
              : null;
          },
          remove: function (c) {
            this.write(c, "", Date.now() - 864e5);
          },
        }
      : {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        },
    Ro = function (c) {
      return new Promise(function (a, b) {
        var d = c.data,
          e = c.headers;
        I.isFormData(d) && delete e["Content-Type"];
        var f = new XMLHttpRequest();
        c.auth &&
          (e.Authorization =
            "Basic " +
            btoa((c.auth.username || "") + ":" + (c.auth.password || "")));
        if (
          (f.open(
            c.method.toUpperCase(),
            nk(c.url, c.params, c.paramsSerializer),
            !0
          ),
          (f.timeout = c.timeout),
          (f.onreadystatechange = function () {
            if (
              f &&
              4 === f.readyState &&
              (0 !== f.status ||
                (f.responseURL && 0 === f.responseURL.indexOf("file:")))
            ) {
              var d =
                "getAllResponseHeaders" in f
                  ? Oo(f.getAllResponseHeaders())
                  : null;
              d = {
                data:
                  c.responseType && "text" !== c.responseType
                    ? f.response
                    : f.responseText,
                status: f.status,
                statusText: f.statusText,
                headers: d,
                config: c,
                request: f,
              };
              var e = d.config.validateStatus;
              !e || e(d.status)
                ? a(d)
                : b(
                    qe(
                      Error("Request failed with status code " + d.status),
                      d.config,
                      null,
                      d.request,
                      d
                    )
                  );
              f = null;
            }
          }),
          (f.onabort = function () {
            f &&
              (b(qe(Error("Request aborted"), c, "ECONNABORTED", f, void 0)),
              (f = null));
          }),
          (f.onerror = function () {
            b(qe(Error("Network Error"), c, null, f, void 0));
            f = null;
          }),
          (f.ontimeout = function () {
            b(
              qe(
                Error("timeout of " + c.timeout + "ms exceeded"),
                c,
                "ECONNABORTED",
                f,
                void 0
              )
            );
            f = null;
          }),
          I.isStandardBrowserEnv())
        ) {
          var g =
            (c.withCredentials || Po(c.url)) && c.xsrfCookieName
              ? Qo.read(c.xsrfCookieName)
              : void 0;
          g && (e[c.xsrfHeaderName] = g);
        }
        if (
          ("setRequestHeader" in f &&
            I.forEach(e, function (a, b) {
              void 0 === d && "content-type" === b.toLowerCase()
                ? delete e[b]
                : f.setRequestHeader(b, a);
            }),
          c.withCredentials && (f.withCredentials = !0),
          c.responseType)
        )
          try {
            f.responseType = c.responseType;
          } catch (k) {
            if ("json" !== c.responseType) throw k;
          }
        "function" == typeof c.onDownloadProgress &&
          f.addEventListener("progress", c.onDownloadProgress);
        "function" == typeof c.onUploadProgress &&
          f.upload &&
          f.upload.addEventListener("progress", c.onUploadProgress);
        c.cancelToken &&
          c.cancelToken.promise.then(function (a) {
            f && (f.abort(), b(a), (f = null));
          });
        void 0 === d && (d = null);
        f.send(d);
      });
    },
    So = { "Content-Type": "application/x-www-form-urlencoded" },
    re = {
      adapter: (function () {
        var c;
        return (
          (("undefined" != typeof process &&
            "[object process]" === Object.prototype.toString.call(process)) ||
            "undefined" != typeof XMLHttpRequest) &&
            (c = Ro),
          c
        );
      })(),
      transformRequest: [
        function (c, a) {
          return (
            pk(a, "Accept"),
            pk(a, "Content-Type"),
            I.isFormData(c) ||
            I.isArrayBuffer(c) ||
            I.isBuffer(c) ||
            I.isStream(c) ||
            I.isFile(c) ||
            I.isBlob(c)
              ? c
              : I.isArrayBufferView(c)
              ? c.buffer
              : I.isURLSearchParams(c)
              ? (mh(a, "application/x-www-form-urlencoded;charset=utf-8"),
                c.toString())
              : I.isObject(c)
              ? (mh(a, "application/json;charset=utf-8"), JSON.stringify(c))
              : c
          );
        },
      ],
      transformResponse: [
        function (c) {
          if ("string" == typeof c)
            try {
              c = JSON.parse(c);
            } catch (a) {}
          return c;
        },
      ],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      validateStatus: function (c) {
        return 200 <= c && 300 > c;
      },
      headers: { common: { Accept: "application/json, text/plain, */*" } },
    };
  I.forEach(["delete", "get", "head"], function (c) {
    re.headers[c] = {};
  });
  I.forEach(["post", "put", "patch"], function (c) {
    re.headers[c] = I.merge(So);
  });
  var To = function (c, a) {
      return a ? c.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, "") : c;
    },
    Uo = function (c) {
      c.cancelToken && c.cancelToken.throwIfRequested();
      return (
        c.baseURL &&
          !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(c.url) &&
          (c.url = To(c.baseURL, c.url)),
        (c.headers = c.headers || {}),
        (c.data = cg(c.data, c.headers, c.transformRequest)),
        (c.headers = I.merge(
          c.headers.common || {},
          c.headers[c.method] || {},
          c.headers || {}
        )),
        I.forEach(
          "delete get head post put patch common".split(" "),
          function (a) {
            delete c.headers[a];
          }
        ),
        (c.adapter || re.adapter)(c).then(
          function (a) {
            c.cancelToken && c.cancelToken.throwIfRequested();
            return (a.data = cg(a.data, a.headers, c.transformResponse)), a;
          },
          function (a) {
            ok(a) ||
              (c.cancelToken && c.cancelToken.throwIfRequested(),
              a &&
                a.response &&
                (a.response.data = cg(
                  a.response.data,
                  a.response.headers,
                  c.transformResponse
                )));
            return Promise.reject(a);
          }
        )
      );
    },
    dg = function (c, a) {
      a = a || {};
      var b = {};
      return (
        I.forEach(["url", "method", "params", "data"], function (c) {
          void 0 !== a[c] && (b[c] = a[c]);
        }),
        I.forEach(["headers", "auth", "proxy"], function (d) {
          I.isObject(a[d])
            ? (b[d] = I.deepMerge(c[d], a[d]))
            : void 0 !== a[d]
            ? (b[d] = a[d])
            : I.isObject(c[d])
            ? (b[d] = I.deepMerge(c[d]))
            : void 0 !== c[d] && (b[d] = c[d]);
        }),
        I.forEach(
          "baseURL transformRequest transformResponse paramsSerializer timeout withCredentials adapter responseType xsrfCookieName xsrfHeaderName onUploadProgress onDownloadProgress maxContentLength validateStatus maxRedirects httpAgent httpsAgent cancelToken socketPath".split(
            " "
          ),
          function (d) {
            void 0 !== a[d] ? (b[d] = a[d]) : void 0 !== c[d] && (b[d] = c[d]);
          }
        ),
        b
      );
    };
  Vc.prototype.request = function (c, a) {
    "string" == typeof c ? ((c = a || {}).url = c) : (c = c || {});
    (c = dg(this.defaults, c)).method = c.method
      ? c.method.toLowerCase()
      : "get";
    var b = [Uo, void 0];
    c = Promise.resolve(c);
    this.interceptors.request.forEach(function (a) {
      b.unshift(a.fulfilled, a.rejected);
    });
    for (
      this.interceptors.response.forEach(function (a) {
        b.push(a.fulfilled, a.rejected);
      });
      b.length;

    )
      c = c.then(b.shift(), b.shift());
    return c;
  };
  Vc.prototype.getUri = function (c) {
    return (
      (c = dg(this.defaults, c)),
      nk(c.url, c.params, c.paramsSerializer).replace(/^\?/, "")
    );
  };
  I.forEach(["delete", "get", "head", "options"], function (c) {
    Vc.prototype[c] = function (a, b) {
      return this.request(I.merge(b || {}, { method: c, url: a }));
    };
  });
  I.forEach(["post", "put", "patch"], function (c) {
    Vc.prototype[c] = function (a, b, d) {
      return this.request(I.merge(d || {}, { method: c, url: a, data: b }));
    };
  });
  var Jd = Vc;
  Ke.prototype.toString = function () {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  Ke.prototype.__CANCEL__ = !0;
  var oh = Ke;
  Id.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason;
  };
  Id.source = function () {
    var c;
    return {
      token: new Id(function (a) {
        c = a;
      }),
      cancel: c,
    };
  };
  var Ib = ph(re);
  Ib.Axios = Jd;
  Ib.create = function (c) {
    return ph(dg(Ib.defaults, c));
  };
  Ib.Cancel = oh;
  Ib.CancelToken = Id;
  Ib.isCancel = ok;
  Ib.all = function (c) {
    return Promise.all(c);
  };
  Ib.spread = function (c) {
    return function (a) {
      return c.apply(null, a);
    };
  };
  var Fb = (Ib.default = Ib);
  let vb = { DEBUG: 0, INFO: 1, WARNING: 2, ERROR: 3, NONE: 4 },
    qk = (c) => {
      for (const a in vb) if (vb[a] === c) return a;
      return "DEFAULT";
    };
  class Vo {
    constructor() {
      this.logLevel = vb.DEBUG;
      this.uploadLogWaitingList = [];
      this.uploadLogUploadingList = [];
      this.currentLogID = this.uploadErrorCount = 0;
    }
    debug(...c) {
      var a;
      c = n((a = [vb.DEBUG])).call(a, c);
      this.log.apply(this, c);
    }
    info(...c) {
      var a;
      c = n((a = [vb.INFO])).call(a, c);
      this.log.apply(this, c);
    }
    warning(...c) {
      var a;
      c = n((a = [vb.WARNING])).call(a, c);
      this.log.apply(this, c);
    }
    error(...c) {
      var a;
      c = n((a = [vb.ERROR])).call(a, c);
      this.log.apply(this, c);
    }
    setLogLevel(c) {
      this.logLevel = c = Math.min(Math.max(0, c), 4);
    }
    enableLogUpload() {
      Xb("UPLOAD_LOG", !0);
    }
    disableLogUpload() {
      Xb("UPLOAD_LOG", !1);
      this.uploadLogUploadingList = [];
      this.uploadLogWaitingList = [];
    }
    setProxyServer(c) {
      this.proxyServerURL = c;
    }
    log(...c) {
      var a, b, d, e;
      let f = Math.max(0, Math.min(4, c[0]));
      if (
        !((c[0] = rh() + " Agora-SDK [".concat(qk(f), "]:")),
        this.appendLogToWaitingList(f, c),
        f < this.logLevel)
      ) {
        var g = rh() + " %cAgora-SDK [".concat(qk(f), "]:");
        switch (f) {
          case vb.DEBUG:
            c = n((a = [g, "color: #64B5F6;"])).call(a, zb(c).call(c, 1));
            console.log.apply(console, c);
            break;
          case vb.INFO:
            c = n((b = [g, "color: #1E88E5; font-weight: bold;"])).call(
              b,
              zb(c).call(c, 1)
            );
            console.log.apply(console, c);
            break;
          case vb.WARNING:
            c = n((d = [g, "color: #FB8C00; font-weight: bold;"])).call(
              d,
              zb(c).call(c, 1)
            );
            console.warn.apply(console, c);
            break;
          case vb.ERROR:
            (c = n((e = [g, "color: #B00020; font-weight: bold;"])).call(
              e,
              zb(c).call(c, 1)
            )),
              console.error.apply(console, c);
        }
      }
    }
    appendLogToWaitingList(c, ...a) {
      if (w.UPLOAD_LOG) {
        var b = "";
        r(a).call(a, (a) => {
          "object" == typeof a && (a = z(a));
          b += "".concat(a, " ");
        });
        this.uploadLogWaitingList.push({
          payload_str: b,
          log_level: c,
          log_item_id: this.currentLogID++,
        });
        0 === this.uploadLogUploadingList.length && this.uploadLogInterval();
      }
    }
    async uploadLogs() {
      var c, a;
      let b = {
        sdk_version: db,
        process_id: w.PROCESS_ID,
        payload: z(this.uploadLogUploadingList),
      };
      console.log(
        this.url ||
          (this.proxyServerURL
            ? n((c = "https://".concat(this.proxyServerURL, "/ls/?h="))).call(
                c,
                w.LOG_UPLOAD_SERVER,
                "&p=443&d=upload/v1"
              )
            : "https://".concat(w.LOG_UPLOAD_SERVER, "/upload/v1"))
      );
      c = await Fb.post(
        this.url ||
          (this.proxyServerURL
            ? n((a = "https://".concat(this.proxyServerURL, "/ls/?h="))).call(
                a,
                w.LOG_UPLOAD_SERVER,
                "&p=443&d=upload/v1"
              )
            : "https://".concat(w.LOG_UPLOAD_SERVER, "/upload/v1")),
        b,
        { responseType: "text" }
      );
      if ("OK" !== c.data)
        throw Error("unexpected upload log response: " + c.data);
      this.uploadLogUploadingList = [];
    }
    uploadLogInterval() {
      if (
        0 !== this.uploadLogUploadingList.length ||
        0 !== this.uploadLogWaitingList.length
      ) {
        var c;
        0 === this.uploadLogUploadingList.length &&
          (this.uploadLogUploadingList = Ja(
            (c = this.uploadLogWaitingList)
          ).call(c, 0, 10));
        this.uploadLogs()
          .then(() => {
            this.uploadErrorCount = 0;
            0 < this.uploadLogWaitingList.length &&
              window.setTimeout(() => this.uploadLogInterval(), 3e3);
          })
          .catch((a) => {
            this.uploadErrorCount += 1;
            2 > this.uploadErrorCount
              ? window.setTimeout(() => this.uploadLogInterval(), 200)
              : window.setTimeout(() => this.uploadLogInterval(), 1e3);
          });
      }
    }
  }
  let h = new Vo();
  class m {
    constructor(c, a = "", b) {
      var d;
      this.name = "AgoraRTCException";
      this.code = c;
      this.message = n((d = "AgoraRTCError ".concat(this.code, ": "))).call(
        d,
        a
      );
      this.data = b;
    }
    toString() {
      var c;
      return this.data
        ? n((c = "".concat(this.message, " data: "))).call(c, z(this.data))
        : this.message;
    }
    throw() {
      throw (h.error(this.toString()), this);
    }
  }
  var rk, Na;
  !(function (c) {
    c.FREE = "free";
    c.UPLOADING = "uploading";
  })(rk || (rk = {}));
  (function (c) {
    c.NONE = "none";
    c.INIT = "init";
    c.CANPLAY = "canplay";
    c.PLAYING = "playing";
    c.PAUSED = "paused";
    c.SUSPEND = "suspend";
    c.STALLED = "stalled";
    c.WAITING = "waiting";
    c.ERROR = "error";
    c.DESTROYED = "destroyed";
    c.ABORT = "abort";
    c.ENDED = "ended";
    c.EMPTIED = "emptied";
  })(Na || (Na = {}));
  M({ target: "Number", stat: !0 }, { MAX_SAFE_INTEGER: 9007199254740991 });
  M({ target: "Number", stat: !0 }, { MIN_SAFE_INTEGER: -9007199254740991 });
  var Wo = function (c, a) {
      for (
        var b = Array(arguments.length - 1), d = 0, e = 2, f = !0;
        e < arguments.length;

      )
        b[d++] = arguments[e++];
      return new Promise(function (e, k) {
        b[d] = function (a) {
          if (f)
            if (((f = !1), a)) k(a);
            else {
              for (var b = Array(arguments.length - 1), c = 0; c < b.length; )
                b[c++] = arguments[c];
              e.apply(null, b);
            }
        };
        try {
          c.apply(a || null, b);
        } catch (q) {
          f && ((f = !1), k(q));
        }
      });
    },
    Xo = Oa(function (c, a) {
      a.length = function (a) {
        var b = a.length;
        if (!b) return 0;
        for (var c = 0; 1 < --b % 4 && "=" === a.charAt(b); ) ++c;
        return Math.ceil(3 * a.length) / 4 - c;
      };
      var b = Array(64),
        d = Array(123);
      for (c = 0; 64 > c; )
        d[
          (b[c] =
            26 > c ? c + 65 : 52 > c ? c + 71 : 62 > c ? c - 4 : (c - 59) | 43)
        ] = c++;
      a.encode = function (a, c, d) {
        for (var e, f = null, g = [], h = 0, l = 0; c < d; ) {
          var n = a[c++];
          switch (l) {
            case 0:
              g[h++] = b[n >> 2];
              e = (3 & n) << 4;
              l = 1;
              break;
            case 1:
              g[h++] = b[e | (n >> 4)];
              e = (15 & n) << 2;
              l = 2;
              break;
            case 2:
              (g[h++] = b[e | (n >> 6)]), (g[h++] = b[63 & n]), (l = 0);
          }
          8191 < h &&
            ((f || (f = [])).push(String.fromCharCode.apply(String, g)),
            (h = 0));
        }
        return (
          l && ((g[h++] = b[e]), (g[h++] = 61), 1 === l && (g[h++] = 61)),
          f
            ? (h && f.push(String.fromCharCode.apply(String, g.slice(0, h))),
              f.join(""))
            : String.fromCharCode.apply(String, g.slice(0, h))
        );
      };
      a.decode = function (a, b, c) {
        for (var e, f = c, g = 0, h = 0; h < a.length; ) {
          var l = a.charCodeAt(h++);
          if (61 === l && 1 < g) break;
          if (void 0 === (l = d[l])) throw Error("invalid encoding");
          switch (g) {
            case 0:
              e = l;
              g = 1;
              break;
            case 1:
              b[c++] = (e << 2) | ((48 & l) >> 4);
              e = l;
              g = 2;
              break;
            case 2:
              b[c++] = ((15 & e) << 4) | ((60 & l) >> 2);
              e = l;
              g = 3;
              break;
            case 3:
              (b[c++] = ((3 & e) << 6) | l), (g = 0);
          }
        }
        if (1 === g) throw Error("invalid encoding");
        return c - f;
      };
      a.test = function (a) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          a
        );
      };
    });
  Kd.prototype.on = function (c, a, b) {
    return (
      (this._listeners[c] || (this._listeners[c] = [])).push({
        fn: a,
        ctx: b || this,
      }),
      this
    );
  };
  Kd.prototype.off = function (c, a) {
    if (void 0 === c) this._listeners = {};
    else if (void 0 === a) this._listeners[c] = [];
    else {
      c = this._listeners[c];
      for (var b = 0; b < c.length; ) c[b].fn === a ? c.splice(b, 1) : ++b;
    }
    return this;
  };
  Kd.prototype.emit = function (c) {
    var a = this._listeners[c];
    if (a) {
      for (var b = [], d = 1; d < arguments.length; ) b.push(arguments[d++]);
      for (d = 0; d < a.length; ) a[d].fn.apply(a[d++].ctx, b);
    }
    return this;
  };
  var Yo = vh(vh),
    Zo = function (c) {
      try {
        var a = eval("quire".replace(/^/, "re"))(c);
        if (a && (a.length || Object.keys(a).length)) return a;
      } catch (b) {}
      return null;
    },
    $o = Oa(function (c, a) {
      a.length = function (a) {
        for (var b = 0, c = 0, f = 0; f < a.length; ++f)
          128 > (c = a.charCodeAt(f))
            ? (b += 1)
            : 2048 > c
            ? (b += 2)
            : 55296 == (64512 & c) && 56320 == (64512 & a.charCodeAt(f + 1))
            ? (++f, (b += 4))
            : (b += 3);
        return b;
      };
      a.read = function (a, c, e) {
        if (1 > e - c) return "";
        for (var b, d = null, k = [], q = 0; c < e; )
          128 > (b = a[c++])
            ? (k[q++] = b)
            : 191 < b && 224 > b
            ? (k[q++] = ((31 & b) << 6) | (63 & a[c++]))
            : 239 < b && 365 > b
            ? ((b =
                (((7 & b) << 18) |
                  ((63 & a[c++]) << 12) |
                  ((63 & a[c++]) << 6) |
                  (63 & a[c++])) -
                65536),
              (k[q++] = 55296 + (b >> 10)),
              (k[q++] = 56320 + (1023 & b)))
            : (k[q++] =
                ((15 & b) << 12) | ((63 & a[c++]) << 6) | (63 & a[c++])),
            8191 < q &&
              ((d || (d = [])).push(String.fromCharCode.apply(String, k)),
              (q = 0));
        return d
          ? (q && d.push(String.fromCharCode.apply(String, k.slice(0, q))),
            d.join(""))
          : String.fromCharCode.apply(String, k.slice(0, q));
      };
      a.write = function (a, c, e) {
        for (var b, d, k = e, q = 0; q < a.length; ++q)
          128 > (b = a.charCodeAt(q))
            ? (c[e++] = b)
            : 2048 > b
            ? ((c[e++] = (b >> 6) | 192), (c[e++] = (63 & b) | 128))
            : 55296 == (64512 & b) &&
              56320 == (64512 & (d = a.charCodeAt(q + 1)))
            ? ((b = 65536 + ((1023 & b) << 10) + (1023 & d)),
              ++q,
              (c[e++] = (b >> 18) | 240),
              (c[e++] = ((b >> 12) & 63) | 128),
              (c[e++] = ((b >> 6) & 63) | 128),
              (c[e++] = (63 & b) | 128))
            : ((c[e++] = (b >> 12) | 224),
              (c[e++] = ((b >> 6) & 63) | 128),
              (c[e++] = (63 & b) | 128));
        return e - k;
      };
    }),
    ap = function (c, a, b) {
      var d = b || 8192,
        e = d >>> 1,
        f = null,
        g = d;
      return function (b) {
        if (1 > b || b > e) return c(b);
        g + b > d && ((f = c(d)), (g = 0));
        b = a.call(f, g, (g += b));
        return 7 & g && (g = 1 + (7 | g)), b;
      };
    },
    pc = (Ca.zero = new Ca(0, 0));
  pc.toNumber = function () {
    return 0;
  };
  pc.zzEncode = pc.zzDecode = function () {
    return this;
  };
  pc.length = function () {
    return 1;
  };
  var bp = (Ca.zeroHash = "\x00\x00\x00\x00\x00\x00\x00\x00");
  Ca.fromNumber = function (c) {
    if (0 === c) return pc;
    var a = 0 > c;
    a && (c = -c);
    var b = c >>> 0;
    c = ((c - b) / 4294967296) >>> 0;
    return (
      a &&
        ((c = ~c >>> 0),
        (b = ~b >>> 0),
        4294967295 < ++b && ((b = 0), 4294967295 < ++c && (c = 0))),
      new Ca(b, c)
    );
  };
  Ca.from = function (c) {
    if ("number" == typeof c) return Ca.fromNumber(c);
    if (Q.isString(c)) {
      if (!Q.Long) return Ca.fromNumber(parseInt(c, 10));
      c = Q.Long.fromString(c);
    }
    return c.low || c.high ? new Ca(c.low >>> 0, c.high >>> 0) : pc;
  };
  Ca.prototype.toNumber = function (c) {
    if (!c && this.hi >>> 31) {
      c = (1 + ~this.lo) >>> 0;
      var a = ~this.hi >>> 0;
      return c || (a = (a + 1) >>> 0), -(c + 4294967296 * a);
    }
    return this.lo + 4294967296 * this.hi;
  };
  Ca.prototype.toLong = function (c) {
    return Q.Long
      ? new Q.Long(0 | this.lo, 0 | this.hi, !!c)
      : { low: 0 | this.lo, high: 0 | this.hi, unsigned: !!c };
  };
  var ac = String.prototype.charCodeAt;
  Ca.fromHash = function (c) {
    return c === bp
      ? pc
      : new Ca(
          (ac.call(c, 0) |
            (ac.call(c, 1) << 8) |
            (ac.call(c, 2) << 16) |
            (ac.call(c, 3) << 24)) >>>
            0,
          (ac.call(c, 4) |
            (ac.call(c, 5) << 8) |
            (ac.call(c, 6) << 16) |
            (ac.call(c, 7) << 24)) >>>
            0
        );
  };
  Ca.prototype.toHash = function () {
    return String.fromCharCode(
      255 & this.lo,
      (this.lo >>> 8) & 255,
      (this.lo >>> 16) & 255,
      this.lo >>> 24,
      255 & this.hi,
      (this.hi >>> 8) & 255,
      (this.hi >>> 16) & 255,
      this.hi >>> 24
    );
  };
  Ca.prototype.zzEncode = function () {
    var c = this.hi >> 31;
    return (
      (this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ c) >>> 0),
      (this.lo = ((this.lo << 1) ^ c) >>> 0),
      this
    );
  };
  Ca.prototype.zzDecode = function () {
    var c = -(1 & this.lo);
    return (
      (this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ c) >>> 0),
      (this.hi = ((this.hi >>> 1) ^ c) >>> 0),
      this
    );
  };
  Ca.prototype.length = function () {
    var c = this.lo,
      a = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
      b = this.hi >>> 24;
    return 0 === b
      ? 0 === a
        ? 16384 > c
          ? 128 > c
            ? 1
            : 2
          : 2097152 > c
          ? 3
          : 4
        : 16384 > a
        ? 128 > a
          ? 5
          : 6
        : 2097152 > a
        ? 7
        : 8
      : 128 > b
      ? 9
      : 10;
  };
  var Q = Oa(function (c, a) {
      function b(a, b, c) {
        for (var d = Object.keys(b), e = 0; e < d.length; ++e)
          (void 0 !== a[d[e]] && c) || (a[d[e]] = b[d[e]]);
        return a;
      }
      function d(a) {
        function c(a, d) {
          if (!(this instanceof c)) return new c(a, d);
          Object.defineProperty(this, "message", {
            get: function () {
              return a;
            },
          });
          Error.captureStackTrace
            ? Error.captureStackTrace(this, c)
            : Object.defineProperty(this, "stack", {
                value: Error().stack || "",
              });
          d && b(this, d);
        }
        return (
          ((c.prototype = Object.create(Error.prototype)).constructor = c),
          Object.defineProperty(c.prototype, "name", {
            get: function () {
              return a;
            },
          }),
          (c.prototype.toString = function () {
            return this.name + ": " + this.message;
          }),
          c
        );
      }
      a.asPromise = Wo;
      a.base64 = Xo;
      a.EventEmitter = Kd;
      a.float = Yo;
      a.inquire = Zo;
      a.utf8 = $o;
      a.pool = ap;
      a.LongBits = Ca;
      a.isNode = !!(
        void 0 !== Pb &&
        Pb &&
        Pb.process &&
        Pb.process.versions &&
        Pb.process.versions.node
      );
      a.global =
        (a.isNode && Pb) ||
        ("undefined" != typeof window && window) ||
        ("undefined" != typeof self && self) ||
        Pb;
      a.emptyArray = Object.freeze ? Object.freeze([]) : [];
      a.emptyObject = Object.freeze ? Object.freeze({}) : {};
      a.isInteger =
        Number.isInteger ||
        function (a) {
          return "number" == typeof a && isFinite(a) && Math.floor(a) === a;
        };
      a.isString = function (a) {
        return "string" == typeof a || a instanceof String;
      };
      a.isObject = function (a) {
        return a && "object" == typeof a;
      };
      a.isset = a.isSet = function (a, b) {
        var c = a[b];
        return (
          !(null == c || !a.hasOwnProperty(b)) &&
          ("object" != typeof c ||
            0 < (Array.isArray(c) ? c.length : Object.keys(c).length))
        );
      };
      a.Buffer = (function () {
        try {
          var b = a.inquire("buffer").Buffer;
          return b.prototype.utf8Write ? b : null;
        } catch (f) {
          return null;
        }
      })();
      a._Buffer_from = null;
      a._Buffer_allocUnsafe = null;
      a.newBuffer = function (b) {
        return "number" == typeof b
          ? a.Buffer
            ? a._Buffer_allocUnsafe(b)
            : new a.Array(b)
          : a.Buffer
          ? a._Buffer_from(b)
          : "undefined" == typeof Uint8Array
          ? b
          : new Uint8Array(b);
      };
      a.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array;
      a.Long =
        (a.global.dcodeIO && a.global.dcodeIO.Long) ||
        a.global.Long ||
        a.inquire("long");
      a.key2Re = /^true|false|0|1$/;
      a.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      a.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      a.longToHash = function (b) {
        return b ? a.LongBits.from(b).toHash() : a.LongBits.zeroHash;
      };
      a.longFromHash = function (b, c) {
        b = a.LongBits.fromHash(b);
        return a.Long ? a.Long.fromBits(b.lo, b.hi, c) : b.toNumber(!!c);
      };
      a.merge = b;
      a.lcFirst = function (a) {
        return a.charAt(0).toLowerCase() + a.substring(1);
      };
      a.newError = d;
      a.ProtocolError = d("ProtocolError");
      a.oneOfGetter = function (a) {
        for (var b = {}, c = 0; c < a.length; ++c) b[a[c]] = 1;
        return function () {
          for (var a = Object.keys(this), c = a.length - 1; -1 < c; --c)
            if (1 === b[a[c]] && void 0 !== this[a[c]] && null !== this[a[c]])
              return a[c];
        };
      };
      a.oneOfSetter = function (a) {
        return function (b) {
          for (var c = 0; c < a.length; ++c) a[c] !== b && delete this[a[c]];
        };
      };
      a.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: !0,
      };
      a._configure = function () {
        var b = a.Buffer;
        b
          ? ((a._Buffer_from =
              (b.from !== Uint8Array.from && b.from) ||
              function (a, c) {
                return new b(a, c);
              }),
            (a._Buffer_allocUnsafe =
              b.allocUnsafe ||
              function (a) {
                return new b(a);
              }))
          : (a._Buffer_from = a._Buffer_allocUnsafe = null);
      };
    }),
    Se = aa,
    eg,
    se = Q.LongBits,
    sk = Q.base64,
    tk = Q.utf8,
    uk = function () {
      return Q.Buffer
        ? function () {
            return (aa.create = function () {
              return new eg();
            })();
          }
        : function () {
            return new aa();
          };
    };
  aa.create = uk();
  aa.alloc = function (c) {
    return new Q.Array(c);
  };
  Q.Array !== Array &&
    (aa.alloc = Q.pool(aa.alloc, Q.Array.prototype.subarray));
  aa.prototype._push = function (c, a, b) {
    return (
      (this.tail = this.tail.next = new Wc(c, a, b)), (this.len += a), this
    );
  };
  Pe.prototype = Object.create(Wc.prototype);
  Pe.prototype.fn = function (c, a, b) {
    for (; 127 < c; ) (a[b++] = (127 & c) | 128), (c >>>= 7);
    a[b] = c;
  };
  aa.prototype.uint32 = function (c) {
    return (
      (this.len += (this.tail = this.tail.next =
        new Pe(
          128 > (c >>>= 0)
            ? 1
            : 16384 > c
            ? 2
            : 2097152 > c
            ? 3
            : 268435456 > c
            ? 4
            : 5,
          c
        )).len),
      this
    );
  };
  aa.prototype.int32 = function (c) {
    return 0 > c ? this._push(Qe, 10, se.fromNumber(c)) : this.uint32(c);
  };
  aa.prototype.sint32 = function (c) {
    return this.uint32(((c << 1) ^ (c >> 31)) >>> 0);
  };
  aa.prototype.uint64 = function (c) {
    c = se.from(c);
    return this._push(Qe, c.length(), c);
  };
  aa.prototype.int64 = aa.prototype.uint64;
  aa.prototype.sint64 = function (c) {
    c = se.from(c).zzEncode();
    return this._push(Qe, c.length(), c);
  };
  aa.prototype.bool = function (c) {
    return this._push(Oe, 1, c ? 1 : 0);
  };
  aa.prototype.fixed32 = function (c) {
    return this._push(Re, 4, c >>> 0);
  };
  aa.prototype.sfixed32 = aa.prototype.fixed32;
  aa.prototype.fixed64 = function (c) {
    c = se.from(c);
    return this._push(Re, 4, c.lo)._push(Re, 4, c.hi);
  };
  aa.prototype.sfixed64 = aa.prototype.fixed64;
  aa.prototype.float = function (c) {
    return this._push(Q.float.writeFloatLE, 4, c);
  };
  aa.prototype.double = function (c) {
    return this._push(Q.float.writeDoubleLE, 8, c);
  };
  var cp = Q.Array.prototype.set
    ? function (c, a, b) {
        a.set(c, b);
      }
    : function (c, a, b) {
        for (var d = 0; d < c.length; ++d) a[b + d] = c[d];
      };
  aa.prototype.bytes = function (c) {
    var a = c.length >>> 0;
    if (!a) return this._push(Oe, 1, 0);
    if (Q.isString(c)) {
      var b = aa.alloc((a = sk.length(c)));
      sk.decode(c, b, 0);
      c = b;
    }
    return this.uint32(a)._push(cp, a, c);
  };
  aa.prototype.string = function (c) {
    var a = tk.length(c);
    return a ? this.uint32(a)._push(tk.write, a, c) : this._push(Oe, 1, 0);
  };
  aa.prototype.fork = function () {
    return (
      (this.states = new yl(this)),
      (this.head = this.tail = new Wc(Ne, 0, 0)),
      (this.len = 0),
      this
    );
  };
  aa.prototype.reset = function () {
    return (
      this.states
        ? ((this.head = this.states.head),
          (this.tail = this.states.tail),
          (this.len = this.states.len),
          (this.states = this.states.next))
        : ((this.head = this.tail = new Wc(Ne, 0, 0)), (this.len = 0)),
      this
    );
  };
  aa.prototype.ldelim = function () {
    var c = this.head,
      a = this.tail,
      b = this.len;
    return (
      this.reset().uint32(b),
      b && ((this.tail.next = c.next), (this.tail = a), (this.len += b)),
      this
    );
  };
  aa.prototype.finish = function () {
    for (
      var c = this.head.next, a = this.constructor.alloc(this.len), b = 0;
      c;

    )
      c.fn(c.val, a, b), (b += c.len), (c = c.next);
    return a;
  };
  aa._configure = function (c) {
    eg = c;
    aa.create = uk();
    eg._configure();
  };
  (Ab.prototype = Object.create(Se.prototype)).constructor = Ab;
  Ab._configure = function () {
    Ab.alloc = Q._Buffer_allocUnsafe;
    Ab.writeBytesBuffer =
      Q.Buffer &&
      Q.Buffer.prototype instanceof Uint8Array &&
      "set" === Q.Buffer.prototype.set.name
        ? function (c, a, b) {
            a.set(c, b);
          }
        : function (c, a, b) {
            if (c.copy) c.copy(a, b, 0, c.length);
            else for (var d = 0; d < c.length; ) a[b++] = c[d++];
          };
  };
  Ab.prototype.bytes = function (c) {
    Q.isString(c) && (c = Q._Buffer_from(c, "base64"));
    var a = c.length >>> 0;
    return this.uint32(a), a && this._push(Ab.writeBytesBuffer, a, c), this;
  };
  Ab.prototype.string = function (c) {
    var a = Q.Buffer.byteLength(c);
    return this.uint32(a), a && this._push(zl, a, c), this;
  };
  Ab._configure();
  var Ue = ua,
    fg,
    Ah = Q.LongBits,
    dp = Q.utf8,
    vk =
      "undefined" != typeof Uint8Array
        ? function (c) {
            if (c instanceof Uint8Array || Array.isArray(c)) return new ua(c);
            throw Error("illegal buffer");
          }
        : function (c) {
            if (Array.isArray(c)) return new ua(c);
            throw Error("illegal buffer");
          },
    wk = function () {
      return Q.Buffer
        ? function (c) {
            return (ua.create = function (a) {
              return Q.Buffer.isBuffer(a) ? new fg(a) : vk(a);
            })(c);
          }
        : vk;
    },
    kb;
  ua.create = wk();
  ua.prototype._slice = Q.Array.prototype.subarray || Q.Array.prototype.slice;
  ua.prototype.uint32 =
    ((kb = 4294967295),
    function () {
      if (
        ((kb = (127 & this.buf[this.pos]) >>> 0), 128 > this.buf[this.pos++]) ||
        ((kb = (kb | ((127 & this.buf[this.pos]) << 7)) >>> 0),
        128 > this.buf[this.pos++]) ||
        ((kb = (kb | ((127 & this.buf[this.pos]) << 14)) >>> 0),
        128 > this.buf[this.pos++]) ||
        ((kb = (kb | ((127 & this.buf[this.pos]) << 21)) >>> 0),
        128 > this.buf[this.pos++]) ||
        ((kb = (kb | ((15 & this.buf[this.pos]) << 28)) >>> 0),
        128 > this.buf[this.pos++])
      )
        return kb;
      if ((this.pos += 5) > this.len)
        throw ((this.pos = this.len), qb(this, 10));
      return kb;
    });
  ua.prototype.int32 = function () {
    return 0 | this.uint32();
  };
  ua.prototype.sint32 = function () {
    var c = this.uint32();
    return ((c >>> 1) ^ -(1 & c)) | 0;
  };
  ua.prototype.bool = function () {
    return 0 !== this.uint32();
  };
  ua.prototype.fixed32 = function () {
    if (this.pos + 4 > this.len) throw qb(this, 4);
    return Ld(this.buf, (this.pos += 4));
  };
  ua.prototype.sfixed32 = function () {
    if (this.pos + 4 > this.len) throw qb(this, 4);
    return 0 | Ld(this.buf, (this.pos += 4));
  };
  ua.prototype.float = function () {
    if (this.pos + 4 > this.len) throw qb(this, 4);
    var c = Q.float.readFloatLE(this.buf, this.pos);
    return (this.pos += 4), c;
  };
  ua.prototype.double = function () {
    if (this.pos + 8 > this.len) throw qb(this, 4);
    var c = Q.float.readDoubleLE(this.buf, this.pos);
    return (this.pos += 8), c;
  };
  ua.prototype.bytes = function () {
    var c = this.uint32(),
      a = this.pos,
      b = this.pos + c;
    if (b > this.len) throw qb(this, c);
    return (
      (this.pos += c),
      Array.isArray(this.buf)
        ? this.buf.slice(a, b)
        : a === b
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, a, b)
    );
  };
  ua.prototype.string = function () {
    var c = this.bytes();
    return dp.read(c, 0, c.length);
  };
  ua.prototype.skip = function (c) {
    if ("number" == typeof c) {
      if (this.pos + c > this.len) throw qb(this, c);
      this.pos += c;
    } else {
      do if (this.pos >= this.len) throw qb(this);
      while (128 & this.buf[this.pos++]);
    }
    return this;
  };
  ua.prototype.skipType = function (c) {
    switch (c) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        for (; 4 != (c = 7 & this.uint32()); ) this.skipType(c);
        break;
      case 5:
        this.skip(4);
        break;
      default:
        throw Error("invalid wire type " + c + " at offset " + this.pos);
    }
    return this;
  };
  ua._configure = function (c) {
    fg = c;
    ua.create = wk();
    fg._configure();
    var a = Q.Long ? "toLong" : "toNumber";
    Q.merge(ua.prototype, {
      int64: function () {
        return Te.call(this)[a](!1);
      },
      uint64: function () {
        return Te.call(this)[a](!0);
      },
      sint64: function () {
        return Te.call(this).zzDecode()[a](!1);
      },
      fixed64: function () {
        return Bh.call(this)[a](!0);
      },
      sfixed64: function () {
        return Bh.call(this)[a](!1);
      },
    });
  };
  (fc.prototype = Object.create(Ue.prototype)).constructor = fc;
  fc._configure = function () {
    Q.Buffer && (fc.prototype._slice = Q.Buffer.prototype.slice);
  };
  fc.prototype.string = function () {
    var c = this.uint32();
    return this.buf.utf8Slice
      ? this.buf.utf8Slice(
          this.pos,
          (this.pos = Math.min(this.pos + c, this.len))
        )
      : this.buf.toString(
          "utf-8",
          this.pos,
          (this.pos = Math.min(this.pos + c, this.len))
        );
  };
  fc._configure();
  (Xc.prototype = Object.create(Q.EventEmitter.prototype)).constructor = Xc;
  Xc.prototype.rpcCall = function g(a, b, d, e, f) {
    if (!e) throw TypeError("request must be specified");
    var k = this;
    if (!f) return Q.asPromise(g, k, a, b, d, e);
    if (k.rpcImpl)
      try {
        return k.rpcImpl(
          a,
          b[k.requestDelimited ? "encodeDelimited" : "encode"](e).finish(),
          function (b, e) {
            if (b) return k.emit("error", b, a), f(b);
            if (null !== e) {
              if (!(e instanceof d))
                try {
                  e = d[k.responseDelimited ? "decodeDelimited" : "decode"](e);
                } catch (L) {
                  return k.emit("error", L, a), f(L);
                }
              return k.emit("data", e, a), f(null, e);
            }
            k.end(!0);
          }
        );
      } catch (q) {
        return (
          k.emit("error", q, a),
          void setTimeout(function () {
            f(q);
          }, 0)
        );
      }
    else
      setTimeout(function () {
        f(Error("already ended"));
      }, 0);
  };
  Xc.prototype.end = function (a) {
    return (
      this.rpcImpl &&
        (a || this.rpcImpl(null, null, null),
        (this.rpcImpl = null),
        this.emit("end").off()),
      this
    );
  };
  var ep = Oa(function (a, b) {
      b.Service = Xc;
    }),
    fp = {},
    Jb = Oa(function (a, b) {
      function d() {
        e.util._configure();
        e.Writer._configure(e.BufferWriter);
        e.Reader._configure(e.BufferReader);
      }
      var e = b;
      e.build = "minimal";
      e.Writer = Se;
      e.BufferWriter = Ab;
      e.Reader = Ue;
      e.BufferReader = fc;
      e.util = Q;
      e.rpc = ep;
      e.roots = fp;
      e.configure = d;
      d();
    }),
    xa = Jb.Reader,
    td = Jb.Writer,
    p = Jb.util,
    oa = Jb.roots.default || (Jb.roots.default = {}),
    qc;
  oa.Events =
    ((qc = {}),
    (qc.Message = (function () {
      function a(a) {
        if (a)
          for (var b = S(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.id = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.msg = p.newBuffer([])),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          return (
            d || (d = td.create()),
            null != a.id &&
              Object.hasOwnProperty.call(a, "id") &&
              d.uint32(8).int64(a.id),
            null != a.msg &&
              Object.hasOwnProperty.call(a, "msg") &&
              d.uint32(18).bytes(a.msg),
            d
          );
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof xa || (a = xa.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new oa.Events.Message(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.id = a.int64();
                break;
              case 2:
                b.msg = a.bytes();
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof xa || (a = new xa(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          return "object" != typeof a || null === a
            ? "object expected"
            : null == a.id ||
              !a.hasOwnProperty("id") ||
              p.isInteger(a.id) ||
              (a.id && p.isInteger(a.id.low) && p.isInteger(a.id.high))
            ? null == a.msg ||
              !a.hasOwnProperty("msg") ||
              (a.msg && "number" == typeof a.msg.length) ||
              p.isString(a.msg)
              ? null
              : "msg: buffer expected"
            : "id: integer|Long expected";
        }),
        (a.fromObject = function (a) {
          if (a instanceof oa.Events.Message) return a;
          var b = new oa.Events.Message();
          return (
            null != a.id &&
              (p.Long
                ? ((b.id = p.Long.fromValue(a.id)).unsigned = !1)
                : "string" == typeof a.id
                ? (b.id = R(a.id, 10))
                : "number" == typeof a.id
                ? (b.id = a.id)
                : "object" == typeof a.id &&
                  (b.id = new p.LongBits(
                    a.id.low >>> 0,
                    a.id.high >>> 0
                  ).toNumber())),
            null != a.msg &&
              ("string" == typeof a.msg
                ? p.base64.decode(
                    a.msg,
                    (b.msg = p.newBuffer(p.base64.length(a.msg))),
                    0
                  )
                : a.msg.length && (b.msg = a.msg)),
            b
          );
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (d.defaults) {
            if (p.Long) {
              var f = new p.Long(0, 0, !1);
              b.id =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.id = d.longs === String ? "0" : 0;
            d.bytes === String
              ? (b.msg = "")
              : ((b.msg = []),
                d.bytes !== Array && (b.msg = p.newBuffer(b.msg)));
          }
          return (
            null != a.id &&
              a.hasOwnProperty("id") &&
              ("number" == typeof a.id
                ? (b.id = d.longs === String ? String(a.id) : a.id)
                : (b.id =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.id)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.id.low >>> 0,
                          a.id.high >>> 0
                        ).toNumber()
                      : a.id)),
            null != a.msg &&
              a.hasOwnProperty("msg") &&
              (b.msg =
                d.bytes === String
                  ? p.base64.encode(a.msg, 0, a.msg.length)
                  : d.bytes === Array
                  ? zb(Array.prototype).call(a.msg)
                  : a.msg),
            b
          );
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Jb.util.toJSONOptions);
        }),
        a
      );
    })()),
    (qc.ProtoRaws = (function () {
      function a(a) {
        if (((this.payloads = []), a))
          for (var b = S(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.sendTs = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.payloads = p.emptyArray),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          if (
            (d || (d = td.create()),
            null != a.sendTs &&
              Object.hasOwnProperty.call(a, "sendTs") &&
              d.uint32(8).int64(a.sendTs),
            null != a.payloads && a.payloads.length)
          )
            for (var b = 0; b < a.payloads.length; ++b)
              oa.Events.Message.encode(
                a.payloads[b],
                d.uint32(18).fork()
              ).ldelim();
          return d;
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof xa || (a = xa.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new oa.Events.ProtoRaws(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.sendTs = a.int64();
                break;
              case 2:
                (b.payloads && b.payloads.length) || (b.payloads = []);
                b.payloads.push(oa.Events.Message.decode(a, a.uint32()));
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof xa || (a = new xa(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          if ("object" != typeof a || null === a) return "object expected";
          if (
            null != a.sendTs &&
            a.hasOwnProperty("sendTs") &&
            !(
              p.isInteger(a.sendTs) ||
              (a.sendTs &&
                p.isInteger(a.sendTs.low) &&
                p.isInteger(a.sendTs.high))
            )
          )
            return "sendTs: integer|Long expected";
          if (null != a.payloads && a.hasOwnProperty("payloads")) {
            if (!ec(a.payloads)) return "payloads: array expected";
            for (var b = 0; b < a.payloads.length; ++b) {
              var e = oa.Events.Message.verify(a.payloads[b]);
              if (e) return "payloads." + e;
            }
          }
          return null;
        }),
        (a.fromObject = function (a) {
          if (a instanceof oa.Events.ProtoRaws) return a;
          var b = new oa.Events.ProtoRaws();
          if (
            (null != a.sendTs &&
              (p.Long
                ? ((b.sendTs = p.Long.fromValue(a.sendTs)).unsigned = !1)
                : "string" == typeof a.sendTs
                ? (b.sendTs = R(a.sendTs, 10))
                : "number" == typeof a.sendTs
                ? (b.sendTs = a.sendTs)
                : "object" == typeof a.sendTs &&
                  (b.sendTs = new p.LongBits(
                    a.sendTs.low >>> 0,
                    a.sendTs.high >>> 0
                  ).toNumber())),
            a.payloads)
          ) {
            if (!ec(a.payloads))
              throw TypeError(".Events.ProtoRaws.payloads: array expected");
            b.payloads = [];
            for (var e = 0; e < a.payloads.length; ++e) {
              if ("object" != typeof a.payloads[e])
                throw TypeError(".Events.ProtoRaws.payloads: object expected");
              b.payloads[e] = oa.Events.Message.fromObject(a.payloads[e]);
            }
          }
          return b;
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (((d.arrays || d.defaults) && (b.payloads = []), d.defaults))
            if (p.Long) {
              var f = new p.Long(0, 0, !1);
              b.sendTs =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.sendTs = d.longs === String ? "0" : 0;
          if (
            (null != a.sendTs &&
              a.hasOwnProperty("sendTs") &&
              ("number" == typeof a.sendTs
                ? (b.sendTs = d.longs === String ? String(a.sendTs) : a.sendTs)
                : (b.sendTs =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.sendTs)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.sendTs.low >>> 0,
                          a.sendTs.high >>> 0
                        ).toNumber()
                      : a.sendTs)),
            a.payloads && a.payloads.length)
          )
            for (b.payloads = [], f = 0; f < a.payloads.length; ++f)
              b.payloads[f] = oa.Events.Message.toObject(a.payloads[f], d);
          return b;
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Jb.util.toJSONOptions);
        }),
        a
      );
    })()),
    (qc.APWorkerEvent = (function () {
      function a(a) {
        if (a)
          for (var b = S(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.sid = ""),
        (a.prototype.cname = ""),
        (a.prototype.cid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.lts = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.ip = ""),
        (a.prototype.uid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.success = !1),
        (a.prototype.elapse = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.peer = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.ec = 0),
        (a.prototype.sc = 0),
        (a.prototype.serverIp = ""),
        (a.prototype.firstSuccess = !1),
        (a.prototype.responseTime = 0),
        (a.prototype.serviceName = ""),
        (a.prototype.responseDetail = ""),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          return (
            d || (d = td.create()),
            null != a.sid &&
              Object.hasOwnProperty.call(a, "sid") &&
              d.uint32(10).string(a.sid),
            null != a.cname &&
              Object.hasOwnProperty.call(a, "cname") &&
              d.uint32(18).string(a.cname),
            null != a.cid &&
              Object.hasOwnProperty.call(a, "cid") &&
              d.uint32(24).int64(a.cid),
            null != a.lts &&
              Object.hasOwnProperty.call(a, "lts") &&
              d.uint32(32).int64(a.lts),
            null != a.ip &&
              Object.hasOwnProperty.call(a, "ip") &&
              d.uint32(42).string(a.ip),
            null != a.uid &&
              Object.hasOwnProperty.call(a, "uid") &&
              d.uint32(48).int64(a.uid),
            null != a.success &&
              Object.hasOwnProperty.call(a, "success") &&
              d.uint32(56).bool(a.success),
            null != a.elapse &&
              Object.hasOwnProperty.call(a, "elapse") &&
              d.uint32(64).int64(a.elapse),
            null != a.peer &&
              Object.hasOwnProperty.call(a, "peer") &&
              d.uint32(72).int64(a.peer),
            null != a.ec &&
              Object.hasOwnProperty.call(a, "ec") &&
              d.uint32(80).int32(a.ec),
            null != a.sc &&
              Object.hasOwnProperty.call(a, "sc") &&
              d.uint32(88).int32(a.sc),
            null != a.serverIp &&
              Object.hasOwnProperty.call(a, "serverIp") &&
              d.uint32(98).string(a.serverIp),
            null != a.firstSuccess &&
              Object.hasOwnProperty.call(a, "firstSuccess") &&
              d.uint32(104).bool(a.firstSuccess),
            null != a.responseTime &&
              Object.hasOwnProperty.call(a, "responseTime") &&
              d.uint32(112).int32(a.responseTime),
            null != a.serviceName &&
              Object.hasOwnProperty.call(a, "serviceName") &&
              d.uint32(122).string(a.serviceName),
            null != a.responseDetail &&
              Object.hasOwnProperty.call(a, "responseDetail") &&
              d.uint32(130).string(a.responseDetail),
            d
          );
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof xa || (a = xa.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new oa.Events.APWorkerEvent(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.sid = a.string();
                break;
              case 2:
                b.cname = a.string();
                break;
              case 3:
                b.cid = a.int64();
                break;
              case 4:
                b.lts = a.int64();
                break;
              case 5:
                b.ip = a.string();
                break;
              case 6:
                b.uid = a.int64();
                break;
              case 7:
                b.success = a.bool();
                break;
              case 8:
                b.elapse = a.int64();
                break;
              case 9:
                b.peer = a.int64();
                break;
              case 10:
                b.ec = a.int32();
                break;
              case 11:
                b.sc = a.int32();
                break;
              case 12:
                b.serverIp = a.string();
                break;
              case 13:
                b.firstSuccess = a.bool();
                break;
              case 14:
                b.responseTime = a.int32();
                break;
              case 15:
                b.serviceName = a.string();
                break;
              case 16:
                b.responseDetail = a.string();
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof xa || (a = new xa(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          return "object" != typeof a || null === a
            ? "object expected"
            : null != a.sid && a.hasOwnProperty("sid") && !p.isString(a.sid)
            ? "sid: string expected"
            : null != a.cname &&
              a.hasOwnProperty("cname") &&
              !p.isString(a.cname)
            ? "cname: string expected"
            : null == a.cid ||
              !a.hasOwnProperty("cid") ||
              p.isInteger(a.cid) ||
              (a.cid && p.isInteger(a.cid.low) && p.isInteger(a.cid.high))
            ? null == a.lts ||
              !a.hasOwnProperty("lts") ||
              p.isInteger(a.lts) ||
              (a.lts && p.isInteger(a.lts.low) && p.isInteger(a.lts.high))
              ? null != a.ip && a.hasOwnProperty("ip") && !p.isString(a.ip)
                ? "ip: string expected"
                : null == a.uid ||
                  !a.hasOwnProperty("uid") ||
                  p.isInteger(a.uid) ||
                  (a.uid && p.isInteger(a.uid.low) && p.isInteger(a.uid.high))
                ? null != a.success &&
                  a.hasOwnProperty("success") &&
                  "boolean" != typeof a.success
                  ? "success: boolean expected"
                  : null == a.elapse ||
                    !a.hasOwnProperty("elapse") ||
                    p.isInteger(a.elapse) ||
                    (a.elapse &&
                      p.isInteger(a.elapse.low) &&
                      p.isInteger(a.elapse.high))
                  ? null == a.peer ||
                    !a.hasOwnProperty("peer") ||
                    p.isInteger(a.peer) ||
                    (a.peer &&
                      p.isInteger(a.peer.low) &&
                      p.isInteger(a.peer.high))
                    ? null != a.ec &&
                      a.hasOwnProperty("ec") &&
                      !p.isInteger(a.ec)
                      ? "ec: integer expected"
                      : null != a.sc &&
                        a.hasOwnProperty("sc") &&
                        !p.isInteger(a.sc)
                      ? "sc: integer expected"
                      : null != a.serverIp &&
                        a.hasOwnProperty("serverIp") &&
                        !p.isString(a.serverIp)
                      ? "serverIp: string expected"
                      : null != a.firstSuccess &&
                        a.hasOwnProperty("firstSuccess") &&
                        "boolean" != typeof a.firstSuccess
                      ? "firstSuccess: boolean expected"
                      : null != a.responseTime &&
                        a.hasOwnProperty("responseTime") &&
                        !p.isInteger(a.responseTime)
                      ? "responseTime: integer expected"
                      : null != a.serviceName &&
                        a.hasOwnProperty("serviceName") &&
                        !p.isString(a.serviceName)
                      ? "serviceName: string expected"
                      : null != a.responseDetail &&
                        a.hasOwnProperty("responseDetail") &&
                        !p.isString(a.responseDetail)
                      ? "responseDetail: string expected"
                      : null
                    : "peer: integer|Long expected"
                  : "elapse: integer|Long expected"
                : "uid: integer|Long expected"
              : "lts: integer|Long expected"
            : "cid: integer|Long expected";
        }),
        (a.fromObject = function (a) {
          if (a instanceof oa.Events.APWorkerEvent) return a;
          var b = new oa.Events.APWorkerEvent();
          return (
            null != a.sid && (b.sid = String(a.sid)),
            null != a.cname && (b.cname = String(a.cname)),
            null != a.cid &&
              (p.Long
                ? ((b.cid = p.Long.fromValue(a.cid)).unsigned = !1)
                : "string" == typeof a.cid
                ? (b.cid = R(a.cid, 10))
                : "number" == typeof a.cid
                ? (b.cid = a.cid)
                : "object" == typeof a.cid &&
                  (b.cid = new p.LongBits(
                    a.cid.low >>> 0,
                    a.cid.high >>> 0
                  ).toNumber())),
            null != a.lts &&
              (p.Long
                ? ((b.lts = p.Long.fromValue(a.lts)).unsigned = !1)
                : "string" == typeof a.lts
                ? (b.lts = R(a.lts, 10))
                : "number" == typeof a.lts
                ? (b.lts = a.lts)
                : "object" == typeof a.lts &&
                  (b.lts = new p.LongBits(
                    a.lts.low >>> 0,
                    a.lts.high >>> 0
                  ).toNumber())),
            null != a.ip && (b.ip = String(a.ip)),
            null != a.uid &&
              (p.Long
                ? ((b.uid = p.Long.fromValue(a.uid)).unsigned = !1)
                : "string" == typeof a.uid
                ? (b.uid = R(a.uid, 10))
                : "number" == typeof a.uid
                ? (b.uid = a.uid)
                : "object" == typeof a.uid &&
                  (b.uid = new p.LongBits(
                    a.uid.low >>> 0,
                    a.uid.high >>> 0
                  ).toNumber())),
            null != a.success && (b.success = !!a.success),
            null != a.elapse &&
              (p.Long
                ? ((b.elapse = p.Long.fromValue(a.elapse)).unsigned = !1)
                : "string" == typeof a.elapse
                ? (b.elapse = R(a.elapse, 10))
                : "number" == typeof a.elapse
                ? (b.elapse = a.elapse)
                : "object" == typeof a.elapse &&
                  (b.elapse = new p.LongBits(
                    a.elapse.low >>> 0,
                    a.elapse.high >>> 0
                  ).toNumber())),
            null != a.peer &&
              (p.Long
                ? ((b.peer = p.Long.fromValue(a.peer)).unsigned = !1)
                : "string" == typeof a.peer
                ? (b.peer = R(a.peer, 10))
                : "number" == typeof a.peer
                ? (b.peer = a.peer)
                : "object" == typeof a.peer &&
                  (b.peer = new p.LongBits(
                    a.peer.low >>> 0,
                    a.peer.high >>> 0
                  ).toNumber())),
            null != a.ec && (b.ec = 0 | a.ec),
            null != a.sc && (b.sc = 0 | a.sc),
            null != a.serverIp && (b.serverIp = String(a.serverIp)),
            null != a.firstSuccess && (b.firstSuccess = !!a.firstSuccess),
            null != a.responseTime && (b.responseTime = 0 | a.responseTime),
            null != a.serviceName && (b.serviceName = String(a.serviceName)),
            null != a.responseDetail &&
              (b.responseDetail = String(a.responseDetail)),
            b
          );
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (d.defaults) {
            if (((b.sid = ""), (b.cname = ""), p.Long)) {
              var f = new p.Long(0, 0, !1);
              b.cid =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.cid = d.longs === String ? "0" : 0;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.lts =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.lts = d.longs === String ? "0" : 0);
            b.ip = "";
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.uid =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.uid = d.longs === String ? "0" : 0);
            b.success = !1;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.elapse =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.elapse = d.longs === String ? "0" : 0);
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.peer =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.peer = d.longs === String ? "0" : 0);
            b.ec = 0;
            b.sc = 0;
            b.serverIp = "";
            b.firstSuccess = !1;
            b.responseTime = 0;
            b.serviceName = "";
            b.responseDetail = "";
          }
          return (
            null != a.sid && a.hasOwnProperty("sid") && (b.sid = a.sid),
            null != a.cname && a.hasOwnProperty("cname") && (b.cname = a.cname),
            null != a.cid &&
              a.hasOwnProperty("cid") &&
              ("number" == typeof a.cid
                ? (b.cid = d.longs === String ? String(a.cid) : a.cid)
                : (b.cid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.cid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.cid.low >>> 0,
                          a.cid.high >>> 0
                        ).toNumber()
                      : a.cid)),
            null != a.lts &&
              a.hasOwnProperty("lts") &&
              ("number" == typeof a.lts
                ? (b.lts = d.longs === String ? String(a.lts) : a.lts)
                : (b.lts =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.lts)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.lts.low >>> 0,
                          a.lts.high >>> 0
                        ).toNumber()
                      : a.lts)),
            null != a.ip && a.hasOwnProperty("ip") && (b.ip = a.ip),
            null != a.uid &&
              a.hasOwnProperty("uid") &&
              ("number" == typeof a.uid
                ? (b.uid = d.longs === String ? String(a.uid) : a.uid)
                : (b.uid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.uid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.uid.low >>> 0,
                          a.uid.high >>> 0
                        ).toNumber()
                      : a.uid)),
            null != a.success &&
              a.hasOwnProperty("success") &&
              (b.success = a.success),
            null != a.elapse &&
              a.hasOwnProperty("elapse") &&
              ("number" == typeof a.elapse
                ? (b.elapse = d.longs === String ? String(a.elapse) : a.elapse)
                : (b.elapse =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.elapse)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.elapse.low >>> 0,
                          a.elapse.high >>> 0
                        ).toNumber()
                      : a.elapse)),
            null != a.peer &&
              a.hasOwnProperty("peer") &&
              ("number" == typeof a.peer
                ? (b.peer = d.longs === String ? String(a.peer) : a.peer)
                : (b.peer =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.peer)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.peer.low >>> 0,
                          a.peer.high >>> 0
                        ).toNumber()
                      : a.peer)),
            null != a.ec && a.hasOwnProperty("ec") && (b.ec = a.ec),
            null != a.sc && a.hasOwnProperty("sc") && (b.sc = a.sc),
            null != a.serverIp &&
              a.hasOwnProperty("serverIp") &&
              (b.serverIp = a.serverIp),
            null != a.firstSuccess &&
              a.hasOwnProperty("firstSuccess") &&
              (b.firstSuccess = a.firstSuccess),
            null != a.responseTime &&
              a.hasOwnProperty("responseTime") &&
              (b.responseTime = a.responseTime),
            null != a.serviceName &&
              a.hasOwnProperty("serviceName") &&
              (b.serviceName = a.serviceName),
            null != a.responseDetail &&
              a.hasOwnProperty("responseDetail") &&
              (b.responseDetail = a.responseDetail),
            b
          );
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Jb.util.toJSONOptions);
        }),
        a
      );
    })()),
    (qc.WorkerEvent = (function () {
      function a(a) {
        if (a)
          for (var b = S(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.sid = ""),
        (a.prototype.cname = ""),
        (a.prototype.cid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.lts = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.ip = ""),
        (a.prototype.uid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.success = !1),
        (a.prototype.elapse = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.peer = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.command = ""),
        (a.prototype.actionType = ""),
        (a.prototype.url = ""),
        (a.prototype.payload = ""),
        (a.prototype.serverCode = 0),
        (a.prototype.code = 0),
        (a.prototype.traceId = ""),
        (a.prototype.workerType = 0),
        (a.prototype.responseTime = 0),
        (a.prototype.requestId = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.packIndex = 0),
        (a.prototype.requestByUser = !1),
        (a.prototype.tid = ""),
        (a.prototype.productType = ""),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          return (
            d || (d = td.create()),
            null != a.sid &&
              Object.hasOwnProperty.call(a, "sid") &&
              d.uint32(10).string(a.sid),
            null != a.cname &&
              Object.hasOwnProperty.call(a, "cname") &&
              d.uint32(18).string(a.cname),
            null != a.cid &&
              Object.hasOwnProperty.call(a, "cid") &&
              d.uint32(24).int64(a.cid),
            null != a.lts &&
              Object.hasOwnProperty.call(a, "lts") &&
              d.uint32(32).int64(a.lts),
            null != a.ip &&
              Object.hasOwnProperty.call(a, "ip") &&
              d.uint32(42).string(a.ip),
            null != a.uid &&
              Object.hasOwnProperty.call(a, "uid") &&
              d.uint32(48).int64(a.uid),
            null != a.success &&
              Object.hasOwnProperty.call(a, "success") &&
              d.uint32(56).bool(a.success),
            null != a.elapse &&
              Object.hasOwnProperty.call(a, "elapse") &&
              d.uint32(64).int64(a.elapse),
            null != a.peer &&
              Object.hasOwnProperty.call(a, "peer") &&
              d.uint32(72).int64(a.peer),
            null != a.command &&
              Object.hasOwnProperty.call(a, "command") &&
              d.uint32(82).string(a.command),
            null != a.actionType &&
              Object.hasOwnProperty.call(a, "actionType") &&
              d.uint32(90).string(a.actionType),
            null != a.url &&
              Object.hasOwnProperty.call(a, "url") &&
              d.uint32(98).string(a.url),
            null != a.payload &&
              Object.hasOwnProperty.call(a, "payload") &&
              d.uint32(106).string(a.payload),
            null != a.serverCode &&
              Object.hasOwnProperty.call(a, "serverCode") &&
              d.uint32(112).int32(a.serverCode),
            null != a.code &&
              Object.hasOwnProperty.call(a, "code") &&
              d.uint32(120).int32(a.code),
            null != a.traceId &&
              Object.hasOwnProperty.call(a, "traceId") &&
              d.uint32(130).string(a.traceId),
            null != a.workerType &&
              Object.hasOwnProperty.call(a, "workerType") &&
              d.uint32(136).int32(a.workerType),
            null != a.responseTime &&
              Object.hasOwnProperty.call(a, "responseTime") &&
              d.uint32(144).int32(a.responseTime),
            null != a.requestId &&
              Object.hasOwnProperty.call(a, "requestId") &&
              d.uint32(152).int64(a.requestId),
            null != a.packIndex &&
              Object.hasOwnProperty.call(a, "packIndex") &&
              d.uint32(160).int32(a.packIndex),
            null != a.requestByUser &&
              Object.hasOwnProperty.call(a, "requestByUser") &&
              d.uint32(168).bool(a.requestByUser),
            null != a.tid &&
              Object.hasOwnProperty.call(a, "tid") &&
              d.uint32(178).string(a.tid),
            null != a.productType &&
              Object.hasOwnProperty.call(a, "productType") &&
              d.uint32(186).string(a.productType),
            d
          );
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof xa || (a = xa.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new oa.Events.WorkerEvent(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.sid = a.string();
                break;
              case 2:
                b.cname = a.string();
                break;
              case 3:
                b.cid = a.int64();
                break;
              case 4:
                b.lts = a.int64();
                break;
              case 5:
                b.ip = a.string();
                break;
              case 6:
                b.uid = a.int64();
                break;
              case 7:
                b.success = a.bool();
                break;
              case 8:
                b.elapse = a.int64();
                break;
              case 9:
                b.peer = a.int64();
                break;
              case 10:
                b.command = a.string();
                break;
              case 11:
                b.actionType = a.string();
                break;
              case 12:
                b.url = a.string();
                break;
              case 13:
                b.payload = a.string();
                break;
              case 14:
                b.serverCode = a.int32();
                break;
              case 15:
                b.code = a.int32();
                break;
              case 16:
                b.traceId = a.string();
                break;
              case 17:
                b.workerType = a.int32();
                break;
              case 18:
                b.responseTime = a.int32();
                break;
              case 19:
                b.requestId = a.int64();
                break;
              case 20:
                b.packIndex = a.int32();
                break;
              case 21:
                b.requestByUser = a.bool();
                break;
              case 22:
                b.tid = a.string();
                break;
              case 23:
                b.productType = a.string();
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof xa || (a = new xa(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          return "object" != typeof a || null === a
            ? "object expected"
            : null != a.sid && a.hasOwnProperty("sid") && !p.isString(a.sid)
            ? "sid: string expected"
            : null != a.cname &&
              a.hasOwnProperty("cname") &&
              !p.isString(a.cname)
            ? "cname: string expected"
            : null == a.cid ||
              !a.hasOwnProperty("cid") ||
              p.isInteger(a.cid) ||
              (a.cid && p.isInteger(a.cid.low) && p.isInteger(a.cid.high))
            ? null == a.lts ||
              !a.hasOwnProperty("lts") ||
              p.isInteger(a.lts) ||
              (a.lts && p.isInteger(a.lts.low) && p.isInteger(a.lts.high))
              ? null != a.ip && a.hasOwnProperty("ip") && !p.isString(a.ip)
                ? "ip: string expected"
                : null == a.uid ||
                  !a.hasOwnProperty("uid") ||
                  p.isInteger(a.uid) ||
                  (a.uid && p.isInteger(a.uid.low) && p.isInteger(a.uid.high))
                ? null != a.success &&
                  a.hasOwnProperty("success") &&
                  "boolean" != typeof a.success
                  ? "success: boolean expected"
                  : null == a.elapse ||
                    !a.hasOwnProperty("elapse") ||
                    p.isInteger(a.elapse) ||
                    (a.elapse &&
                      p.isInteger(a.elapse.low) &&
                      p.isInteger(a.elapse.high))
                  ? null == a.peer ||
                    !a.hasOwnProperty("peer") ||
                    p.isInteger(a.peer) ||
                    (a.peer &&
                      p.isInteger(a.peer.low) &&
                      p.isInteger(a.peer.high))
                    ? null != a.command &&
                      a.hasOwnProperty("command") &&
                      !p.isString(a.command)
                      ? "command: string expected"
                      : null != a.actionType &&
                        a.hasOwnProperty("actionType") &&
                        !p.isString(a.actionType)
                      ? "actionType: string expected"
                      : null != a.url &&
                        a.hasOwnProperty("url") &&
                        !p.isString(a.url)
                      ? "url: string expected"
                      : null != a.payload &&
                        a.hasOwnProperty("payload") &&
                        !p.isString(a.payload)
                      ? "payload: string expected"
                      : null != a.serverCode &&
                        a.hasOwnProperty("serverCode") &&
                        !p.isInteger(a.serverCode)
                      ? "serverCode: integer expected"
                      : null != a.code &&
                        a.hasOwnProperty("code") &&
                        !p.isInteger(a.code)
                      ? "code: integer expected"
                      : null != a.traceId &&
                        a.hasOwnProperty("traceId") &&
                        !p.isString(a.traceId)
                      ? "traceId: string expected"
                      : null != a.workerType &&
                        a.hasOwnProperty("workerType") &&
                        !p.isInteger(a.workerType)
                      ? "workerType: integer expected"
                      : null != a.responseTime &&
                        a.hasOwnProperty("responseTime") &&
                        !p.isInteger(a.responseTime)
                      ? "responseTime: integer expected"
                      : null == a.requestId ||
                        !a.hasOwnProperty("requestId") ||
                        p.isInteger(a.requestId) ||
                        (a.requestId &&
                          p.isInteger(a.requestId.low) &&
                          p.isInteger(a.requestId.high))
                      ? null != a.packIndex &&
                        a.hasOwnProperty("packIndex") &&
                        !p.isInteger(a.packIndex)
                        ? "packIndex: integer expected"
                        : null != a.requestByUser &&
                          a.hasOwnProperty("requestByUser") &&
                          "boolean" != typeof a.requestByUser
                        ? "requestByUser: boolean expected"
                        : null != a.tid &&
                          a.hasOwnProperty("tid") &&
                          !p.isString(a.tid)
                        ? "tid: string expected"
                        : null != a.productType &&
                          a.hasOwnProperty("productType") &&
                          !p.isString(a.productType)
                        ? "productType: string expected"
                        : null
                      : "requestId: integer|Long expected"
                    : "peer: integer|Long expected"
                  : "elapse: integer|Long expected"
                : "uid: integer|Long expected"
              : "lts: integer|Long expected"
            : "cid: integer|Long expected";
        }),
        (a.fromObject = function (a) {
          if (a instanceof oa.Events.WorkerEvent) return a;
          var b = new oa.Events.WorkerEvent();
          return (
            null != a.sid && (b.sid = String(a.sid)),
            null != a.cname && (b.cname = String(a.cname)),
            null != a.cid &&
              (p.Long
                ? ((b.cid = p.Long.fromValue(a.cid)).unsigned = !1)
                : "string" == typeof a.cid
                ? (b.cid = R(a.cid, 10))
                : "number" == typeof a.cid
                ? (b.cid = a.cid)
                : "object" == typeof a.cid &&
                  (b.cid = new p.LongBits(
                    a.cid.low >>> 0,
                    a.cid.high >>> 0
                  ).toNumber())),
            null != a.lts &&
              (p.Long
                ? ((b.lts = p.Long.fromValue(a.lts)).unsigned = !1)
                : "string" == typeof a.lts
                ? (b.lts = R(a.lts, 10))
                : "number" == typeof a.lts
                ? (b.lts = a.lts)
                : "object" == typeof a.lts &&
                  (b.lts = new p.LongBits(
                    a.lts.low >>> 0,
                    a.lts.high >>> 0
                  ).toNumber())),
            null != a.ip && (b.ip = String(a.ip)),
            null != a.uid &&
              (p.Long
                ? ((b.uid = p.Long.fromValue(a.uid)).unsigned = !1)
                : "string" == typeof a.uid
                ? (b.uid = R(a.uid, 10))
                : "number" == typeof a.uid
                ? (b.uid = a.uid)
                : "object" == typeof a.uid &&
                  (b.uid = new p.LongBits(
                    a.uid.low >>> 0,
                    a.uid.high >>> 0
                  ).toNumber())),
            null != a.success && (b.success = !!a.success),
            null != a.elapse &&
              (p.Long
                ? ((b.elapse = p.Long.fromValue(a.elapse)).unsigned = !1)
                : "string" == typeof a.elapse
                ? (b.elapse = R(a.elapse, 10))
                : "number" == typeof a.elapse
                ? (b.elapse = a.elapse)
                : "object" == typeof a.elapse &&
                  (b.elapse = new p.LongBits(
                    a.elapse.low >>> 0,
                    a.elapse.high >>> 0
                  ).toNumber())),
            null != a.peer &&
              (p.Long
                ? ((b.peer = p.Long.fromValue(a.peer)).unsigned = !1)
                : "string" == typeof a.peer
                ? (b.peer = R(a.peer, 10))
                : "number" == typeof a.peer
                ? (b.peer = a.peer)
                : "object" == typeof a.peer &&
                  (b.peer = new p.LongBits(
                    a.peer.low >>> 0,
                    a.peer.high >>> 0
                  ).toNumber())),
            null != a.command && (b.command = String(a.command)),
            null != a.actionType && (b.actionType = String(a.actionType)),
            null != a.url && (b.url = String(a.url)),
            null != a.payload && (b.payload = String(a.payload)),
            null != a.serverCode && (b.serverCode = 0 | a.serverCode),
            null != a.code && (b.code = 0 | a.code),
            null != a.traceId && (b.traceId = String(a.traceId)),
            null != a.workerType && (b.workerType = 0 | a.workerType),
            null != a.responseTime && (b.responseTime = 0 | a.responseTime),
            null != a.requestId &&
              (p.Long
                ? ((b.requestId = p.Long.fromValue(a.requestId)).unsigned = !1)
                : "string" == typeof a.requestId
                ? (b.requestId = R(a.requestId, 10))
                : "number" == typeof a.requestId
                ? (b.requestId = a.requestId)
                : "object" == typeof a.requestId &&
                  (b.requestId = new p.LongBits(
                    a.requestId.low >>> 0,
                    a.requestId.high >>> 0
                  ).toNumber())),
            null != a.packIndex && (b.packIndex = 0 | a.packIndex),
            null != a.requestByUser && (b.requestByUser = !!a.requestByUser),
            null != a.tid && (b.tid = String(a.tid)),
            null != a.productType && (b.productType = String(a.productType)),
            b
          );
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (d.defaults) {
            if (((b.sid = ""), (b.cname = ""), p.Long)) {
              var f = new p.Long(0, 0, !1);
              b.cid =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.cid = d.longs === String ? "0" : 0;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.lts =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.lts = d.longs === String ? "0" : 0);
            b.ip = "";
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.uid =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.uid = d.longs === String ? "0" : 0);
            b.success = !1;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.elapse =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.elapse = d.longs === String ? "0" : 0);
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.peer =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.peer = d.longs === String ? "0" : 0);
            b.command = "";
            b.actionType = "";
            b.url = "";
            b.payload = "";
            b.serverCode = 0;
            b.code = 0;
            b.traceId = "";
            b.workerType = 0;
            b.responseTime = 0;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.requestId =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.requestId = d.longs === String ? "0" : 0);
            b.packIndex = 0;
            b.requestByUser = !1;
            b.tid = "";
            b.productType = "";
          }
          return (
            null != a.sid && a.hasOwnProperty("sid") && (b.sid = a.sid),
            null != a.cname && a.hasOwnProperty("cname") && (b.cname = a.cname),
            null != a.cid &&
              a.hasOwnProperty("cid") &&
              ("number" == typeof a.cid
                ? (b.cid = d.longs === String ? String(a.cid) : a.cid)
                : (b.cid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.cid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.cid.low >>> 0,
                          a.cid.high >>> 0
                        ).toNumber()
                      : a.cid)),
            null != a.lts &&
              a.hasOwnProperty("lts") &&
              ("number" == typeof a.lts
                ? (b.lts = d.longs === String ? String(a.lts) : a.lts)
                : (b.lts =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.lts)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.lts.low >>> 0,
                          a.lts.high >>> 0
                        ).toNumber()
                      : a.lts)),
            null != a.ip && a.hasOwnProperty("ip") && (b.ip = a.ip),
            null != a.uid &&
              a.hasOwnProperty("uid") &&
              ("number" == typeof a.uid
                ? (b.uid = d.longs === String ? String(a.uid) : a.uid)
                : (b.uid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.uid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.uid.low >>> 0,
                          a.uid.high >>> 0
                        ).toNumber()
                      : a.uid)),
            null != a.success &&
              a.hasOwnProperty("success") &&
              (b.success = a.success),
            null != a.elapse &&
              a.hasOwnProperty("elapse") &&
              ("number" == typeof a.elapse
                ? (b.elapse = d.longs === String ? String(a.elapse) : a.elapse)
                : (b.elapse =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.elapse)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.elapse.low >>> 0,
                          a.elapse.high >>> 0
                        ).toNumber()
                      : a.elapse)),
            null != a.peer &&
              a.hasOwnProperty("peer") &&
              ("number" == typeof a.peer
                ? (b.peer = d.longs === String ? String(a.peer) : a.peer)
                : (b.peer =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.peer)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.peer.low >>> 0,
                          a.peer.high >>> 0
                        ).toNumber()
                      : a.peer)),
            null != a.command &&
              a.hasOwnProperty("command") &&
              (b.command = a.command),
            null != a.actionType &&
              a.hasOwnProperty("actionType") &&
              (b.actionType = a.actionType),
            null != a.url && a.hasOwnProperty("url") && (b.url = a.url),
            null != a.payload &&
              a.hasOwnProperty("payload") &&
              (b.payload = a.payload),
            null != a.serverCode &&
              a.hasOwnProperty("serverCode") &&
              (b.serverCode = a.serverCode),
            null != a.code && a.hasOwnProperty("code") && (b.code = a.code),
            null != a.traceId &&
              a.hasOwnProperty("traceId") &&
              (b.traceId = a.traceId),
            null != a.workerType &&
              a.hasOwnProperty("workerType") &&
              (b.workerType = a.workerType),
            null != a.responseTime &&
              a.hasOwnProperty("responseTime") &&
              (b.responseTime = a.responseTime),
            null != a.requestId &&
              a.hasOwnProperty("requestId") &&
              ("number" == typeof a.requestId
                ? (b.requestId =
                    d.longs === String ? String(a.requestId) : a.requestId)
                : (b.requestId =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.requestId)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.requestId.low >>> 0,
                          a.requestId.high >>> 0
                        ).toNumber()
                      : a.requestId)),
            null != a.packIndex &&
              a.hasOwnProperty("packIndex") &&
              (b.packIndex = a.packIndex),
            null != a.requestByUser &&
              a.hasOwnProperty("requestByUser") &&
              (b.requestByUser = a.requestByUser),
            null != a.tid && a.hasOwnProperty("tid") && (b.tid = a.tid),
            null != a.productType &&
              a.hasOwnProperty("productType") &&
              (b.productType = a.productType),
            b
          );
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Jb.util.toJSONOptions);
        }),
        a
      );
    })()),
    (qc.JoinWebProxyAP = (function () {
      function a(a) {
        if (a)
          for (var b = S(a), e = 0; e < b.length; ++e)
            null != a[b[e]] && (this[b[e]] = a[b[e]]);
      }
      return (
        (a.prototype.lts = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.sid = ""),
        (a.prototype.cname = ""),
        (a.prototype.cid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.ip = ""),
        (a.prototype.uid = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.sucess = 0),
        (a.prototype.elapse = p.Long ? p.Long.fromBits(0, 0, !1) : 0),
        (a.prototype.eventType = ""),
        (a.prototype.apServerAddr = ""),
        (a.prototype.turnServerAddrList = ""),
        (a.prototype.errorCode = ""),
        (a.create = function (b) {
          return new a(b);
        }),
        (a.encode = function (a, d) {
          return (
            d || (d = td.create()),
            null != a.lts &&
              Object.hasOwnProperty.call(a, "lts") &&
              d.uint32(8).int64(a.lts),
            null != a.sid &&
              Object.hasOwnProperty.call(a, "sid") &&
              d.uint32(18).string(a.sid),
            null != a.cname &&
              Object.hasOwnProperty.call(a, "cname") &&
              d.uint32(26).string(a.cname),
            null != a.cid &&
              Object.hasOwnProperty.call(a, "cid") &&
              d.uint32(32).int64(a.cid),
            null != a.ip &&
              Object.hasOwnProperty.call(a, "ip") &&
              d.uint32(42).string(a.ip),
            null != a.uid &&
              Object.hasOwnProperty.call(a, "uid") &&
              d.uint32(48).int64(a.uid),
            null != a.sucess &&
              Object.hasOwnProperty.call(a, "sucess") &&
              d.uint32(56).int32(a.sucess),
            null != a.elapse &&
              Object.hasOwnProperty.call(a, "elapse") &&
              d.uint32(64).int64(a.elapse),
            null != a.eventType &&
              Object.hasOwnProperty.call(a, "eventType") &&
              d.uint32(74).string(a.eventType),
            null != a.apServerAddr &&
              Object.hasOwnProperty.call(a, "apServerAddr") &&
              d.uint32(82).string(a.apServerAddr),
            null != a.turnServerAddrList &&
              Object.hasOwnProperty.call(a, "turnServerAddrList") &&
              d.uint32(90).string(a.turnServerAddrList),
            null != a.errorCode &&
              Object.hasOwnProperty.call(a, "errorCode") &&
              d.uint32(98).string(a.errorCode),
            d
          );
        }),
        (a.encodeDelimited = function (a, d) {
          return this.encode(a, d).ldelim();
        }),
        (a.decode = function (a, d) {
          a instanceof xa || (a = xa.create(a));
          d = void 0 === d ? a.len : a.pos + d;
          for (var b = new oa.Events.JoinWebProxyAP(); a.pos < d; ) {
            var f = a.uint32();
            switch (f >>> 3) {
              case 1:
                b.lts = a.int64();
                break;
              case 2:
                b.sid = a.string();
                break;
              case 3:
                b.cname = a.string();
                break;
              case 4:
                b.cid = a.int64();
                break;
              case 5:
                b.ip = a.string();
                break;
              case 6:
                b.uid = a.int64();
                break;
              case 7:
                b.sucess = a.int32();
                break;
              case 8:
                b.elapse = a.int64();
                break;
              case 9:
                b.eventType = a.string();
                break;
              case 10:
                b.apServerAddr = a.string();
                break;
              case 11:
                b.turnServerAddrList = a.string();
                break;
              case 12:
                b.errorCode = a.string();
                break;
              default:
                a.skipType(7 & f);
            }
          }
          return b;
        }),
        (a.decodeDelimited = function (a) {
          return a instanceof xa || (a = new xa(a)), this.decode(a, a.uint32());
        }),
        (a.verify = function (a) {
          return "object" != typeof a || null === a
            ? "object expected"
            : null == a.lts ||
              !a.hasOwnProperty("lts") ||
              p.isInteger(a.lts) ||
              (a.lts && p.isInteger(a.lts.low) && p.isInteger(a.lts.high))
            ? null != a.sid && a.hasOwnProperty("sid") && !p.isString(a.sid)
              ? "sid: string expected"
              : null != a.cname &&
                a.hasOwnProperty("cname") &&
                !p.isString(a.cname)
              ? "cname: string expected"
              : null == a.cid ||
                !a.hasOwnProperty("cid") ||
                p.isInteger(a.cid) ||
                (a.cid && p.isInteger(a.cid.low) && p.isInteger(a.cid.high))
              ? null != a.ip && a.hasOwnProperty("ip") && !p.isString(a.ip)
                ? "ip: string expected"
                : null == a.uid ||
                  !a.hasOwnProperty("uid") ||
                  p.isInteger(a.uid) ||
                  (a.uid && p.isInteger(a.uid.low) && p.isInteger(a.uid.high))
                ? null != a.sucess &&
                  a.hasOwnProperty("sucess") &&
                  !p.isInteger(a.sucess)
                  ? "sucess: integer expected"
                  : null == a.elapse ||
                    !a.hasOwnProperty("elapse") ||
                    p.isInteger(a.elapse) ||
                    (a.elapse &&
                      p.isInteger(a.elapse.low) &&
                      p.isInteger(a.elapse.high))
                  ? null != a.eventType &&
                    a.hasOwnProperty("eventType") &&
                    !p.isString(a.eventType)
                    ? "eventType: string expected"
                    : null != a.apServerAddr &&
                      a.hasOwnProperty("apServerAddr") &&
                      !p.isString(a.apServerAddr)
                    ? "apServerAddr: string expected"
                    : null != a.turnServerAddrList &&
                      a.hasOwnProperty("turnServerAddrList") &&
                      !p.isString(a.turnServerAddrList)
                    ? "turnServerAddrList: string expected"
                    : null != a.errorCode &&
                      a.hasOwnProperty("errorCode") &&
                      !p.isString(a.errorCode)
                    ? "errorCode: string expected"
                    : null
                  : "elapse: integer|Long expected"
                : "uid: integer|Long expected"
              : "cid: integer|Long expected"
            : "lts: integer|Long expected";
        }),
        (a.fromObject = function (a) {
          if (a instanceof oa.Events.JoinWebProxyAP) return a;
          var b = new oa.Events.JoinWebProxyAP();
          return (
            null != a.lts &&
              (p.Long
                ? ((b.lts = p.Long.fromValue(a.lts)).unsigned = !1)
                : "string" == typeof a.lts
                ? (b.lts = R(a.lts, 10))
                : "number" == typeof a.lts
                ? (b.lts = a.lts)
                : "object" == typeof a.lts &&
                  (b.lts = new p.LongBits(
                    a.lts.low >>> 0,
                    a.lts.high >>> 0
                  ).toNumber())),
            null != a.sid && (b.sid = String(a.sid)),
            null != a.cname && (b.cname = String(a.cname)),
            null != a.cid &&
              (p.Long
                ? ((b.cid = p.Long.fromValue(a.cid)).unsigned = !1)
                : "string" == typeof a.cid
                ? (b.cid = R(a.cid, 10))
                : "number" == typeof a.cid
                ? (b.cid = a.cid)
                : "object" == typeof a.cid &&
                  (b.cid = new p.LongBits(
                    a.cid.low >>> 0,
                    a.cid.high >>> 0
                  ).toNumber())),
            null != a.ip && (b.ip = String(a.ip)),
            null != a.uid &&
              (p.Long
                ? ((b.uid = p.Long.fromValue(a.uid)).unsigned = !1)
                : "string" == typeof a.uid
                ? (b.uid = R(a.uid, 10))
                : "number" == typeof a.uid
                ? (b.uid = a.uid)
                : "object" == typeof a.uid &&
                  (b.uid = new p.LongBits(
                    a.uid.low >>> 0,
                    a.uid.high >>> 0
                  ).toNumber())),
            null != a.sucess && (b.sucess = 0 | a.sucess),
            null != a.elapse &&
              (p.Long
                ? ((b.elapse = p.Long.fromValue(a.elapse)).unsigned = !1)
                : "string" == typeof a.elapse
                ? (b.elapse = R(a.elapse, 10))
                : "number" == typeof a.elapse
                ? (b.elapse = a.elapse)
                : "object" == typeof a.elapse &&
                  (b.elapse = new p.LongBits(
                    a.elapse.low >>> 0,
                    a.elapse.high >>> 0
                  ).toNumber())),
            null != a.eventType && (b.eventType = String(a.eventType)),
            null != a.apServerAddr && (b.apServerAddr = String(a.apServerAddr)),
            null != a.turnServerAddrList &&
              (b.turnServerAddrList = String(a.turnServerAddrList)),
            null != a.errorCode && (b.errorCode = String(a.errorCode)),
            b
          );
        }),
        (a.toObject = function (a, d) {
          d || (d = {});
          var b = {};
          if (d.defaults) {
            if (p.Long) {
              var f = new p.Long(0, 0, !1);
              b.lts =
                d.longs === String
                  ? f.toString()
                  : d.longs === Number
                  ? f.toNumber()
                  : f;
            } else b.lts = d.longs === String ? "0" : 0;
            b.sid = "";
            b.cname = "";
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.cid =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.cid = d.longs === String ? "0" : 0);
            b.ip = "";
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.uid =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.uid = d.longs === String ? "0" : 0);
            b.sucess = 0;
            p.Long
              ? ((f = new p.Long(0, 0, !1)),
                (b.elapse =
                  d.longs === String
                    ? f.toString()
                    : d.longs === Number
                    ? f.toNumber()
                    : f))
              : (b.elapse = d.longs === String ? "0" : 0);
            b.eventType = "";
            b.apServerAddr = "";
            b.turnServerAddrList = "";
            b.errorCode = "";
          }
          return (
            null != a.lts &&
              a.hasOwnProperty("lts") &&
              ("number" == typeof a.lts
                ? (b.lts = d.longs === String ? String(a.lts) : a.lts)
                : (b.lts =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.lts)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.lts.low >>> 0,
                          a.lts.high >>> 0
                        ).toNumber()
                      : a.lts)),
            null != a.sid && a.hasOwnProperty("sid") && (b.sid = a.sid),
            null != a.cname && a.hasOwnProperty("cname") && (b.cname = a.cname),
            null != a.cid &&
              a.hasOwnProperty("cid") &&
              ("number" == typeof a.cid
                ? (b.cid = d.longs === String ? String(a.cid) : a.cid)
                : (b.cid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.cid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.cid.low >>> 0,
                          a.cid.high >>> 0
                        ).toNumber()
                      : a.cid)),
            null != a.ip && a.hasOwnProperty("ip") && (b.ip = a.ip),
            null != a.uid &&
              a.hasOwnProperty("uid") &&
              ("number" == typeof a.uid
                ? (b.uid = d.longs === String ? String(a.uid) : a.uid)
                : (b.uid =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.uid)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.uid.low >>> 0,
                          a.uid.high >>> 0
                        ).toNumber()
                      : a.uid)),
            null != a.sucess &&
              a.hasOwnProperty("sucess") &&
              (b.sucess = a.sucess),
            null != a.elapse &&
              a.hasOwnProperty("elapse") &&
              ("number" == typeof a.elapse
                ? (b.elapse = d.longs === String ? String(a.elapse) : a.elapse)
                : (b.elapse =
                    d.longs === String
                      ? p.Long.prototype.toString.call(a.elapse)
                      : d.longs === Number
                      ? new p.LongBits(
                          a.elapse.low >>> 0,
                          a.elapse.high >>> 0
                        ).toNumber()
                      : a.elapse)),
            null != a.eventType &&
              a.hasOwnProperty("eventType") &&
              (b.eventType = a.eventType),
            null != a.apServerAddr &&
              a.hasOwnProperty("apServerAddr") &&
              (b.apServerAddr = a.apServerAddr),
            null != a.turnServerAddrList &&
              a.hasOwnProperty("turnServerAddrList") &&
              (b.turnServerAddrList = a.turnServerAddrList),
            null != a.errorCode &&
              a.hasOwnProperty("errorCode") &&
              (b.errorCode = a.errorCode),
            b
          );
        }),
        (a.prototype.toJSON = function () {
          return this.constructor.toObject(this, Jb.util.toJSONOptions);
        }),
        a
      );
    })()),
    qc);
  let gp = {
    sid: "",
    lts: 0,
    success: null,
    cname: null,
    uid: null,
    peer: null,
    cid: null,
    elapse: null,
    extend: null,
    vid: 0,
  };
  var Ea, sa, xk;
  !(function (a) {
    a.PUBLISH = "publish";
    a.SUBSCRIBE = "subscribe";
    a.SESSION_INIT = "session_init";
    a.JOIN_CHOOSE_SERVER = "join_choose_server";
    a.REQ_USER_ACCOUNT = "req_user_account";
    a.JOIN_GATEWAY = "join_gateway";
    a.STREAM_SWITCH = "stream_switch";
    a.REQUEST_PROXY_WORKER_MANAGER = "request_proxy_worker_manager";
    a.REQUEST_PROXY_APPCENTER = "request_proxy_appcenter";
    a.FIRST_VIDEO_RECEIVED = "first_video_received";
    a.FIRST_AUDIO_RECEIVED = "first_audio_received";
    a.FIRST_VIDEO_DECODE = "first_video_decode";
    a.FIRST_AUDIO_DECODE = "first_audio_decode";
    a.ON_ADD_AUDIO_STREAM = "on_add_audio_stream";
    a.ON_ADD_VIDEO_STREAM = "on_add_video_stream";
    a.ON_UPDATE_STREAM = "on_update_stream";
    a.ON_REMOVE_STREAM = "on_remove_stream";
    a.USER_ANALYTICS = "req_user_analytics";
  })(Ea || (Ea = {}));
  (function (a) {
    a.SESSION = "io.agora.pb.Wrtc.Session";
    a.JOIN_CHOOSE_SERVER = "io.agora.pb.Wrtc.JoinChooseServer";
    a.REQ_USER_ACCOUNT = "io.agora.pb.Wrtc.ReqUserAccount";
    a.JOIN_GATEWAT = "io.agora.pb.Wrtc.JoinGateway";
    a.PUBLISH = "io.agora.pb.Wrtc.Publish";
    a.SUBSCRIBE = "io.agora.pb.Wrtc.Subscribe";
    a.STREAM_SWITCH = "io.agora.pb.Wrtc.StreamSwitch";
    a.AUDIO_SENDING_STOPPED = "io.agora.pb.Wrtc.AudioSendingStopped";
    a.VIDEO_SENDING_STOPPED = "io.agora.pb.Wrtc.VideoSendingStopped";
    a.REQUEST_PROXY_APPCENTER = "io.agora.pb.Wrtc.RequestProxyAppCenter";
    a.REQUEST_PROXY_WORKER_MANAGER =
      "io.agora.pb.Wrtc.RequestProxyWorkerManager";
    a.API_INVOKE = "io.agora.pb.Wrtc.ApiInvoke";
    a.FIRST_VIDEO_RECEIVED = "io.agora.pb.Wrtc.FirstVideoReceived";
    a.FIRST_AUDIO_RECEIVED = "io.agora.pb.Wrtc.FirstAudioReceived";
    a.FIRST_VIDEO_DECODE = "io.agora.pb.Wrtc.FirstVideoDecode";
    a.FIRST_AUDIO_DECODE = "io.agora.pb.Wrtc.FirstAudioDecode";
    a.ON_ADD_AUDIO_STREAM = "io.agora.pb.Wrtc.OnAddAudioStream";
    a.ON_ADD_VIDEO_STREAM = "io.agora.pb.Wrtc.OnAddVideoStream";
    a.ON_UPDATE_STREAM = "io.agora.pb.Wrtc.OnUpdateStream";
    a.ON_REMOVE_STREAM = "io.agora.pb.Wrtc.OnRemoveStream";
    a.JOIN_CHANNEL_TIMEOUT = "io.agora.pb.Wrtc.JoinChannelTimeout";
    a.PEER_PUBLISH_STATUS = "io.agora.pb.Wrtc.PeerPublishStatus";
    a.USER_ANALYTICS = "io.agora.pb.Wrtc.UserAnalytics";
  })(sa || (sa = {}));
  (function (a) {
    a[(a.WORKER_EVENT = 156)] = "WORKER_EVENT";
    a[(a.AP_WORKER_EVENT = 160)] = "AP_WORKER_EVENT";
  })(xk || (xk = {}));
  let hp = (a) => {
    const b = S(oa.Events);
    return !!Aa(b).call(b, a.type);
  };
  var y, D, rc, Ub, Bc, ud, Va, Fa, C, P, ta, N, ca, wb, Y, G, lb;
  !(function (a) {
    a.CREATE_CLIENT = "createClient";
    a.CHECK_SYSTEM_REQUIREMENTS = "checkSystemRequirements";
    a.CHECK_VIDEO_TRACK_IS_ACTIVE = "checkVideoTrackIsActive";
    a.CHECK_AUDIO_TRACK_IS_ACTIVE = "checkAudioTrackIsActive";
    a.CREATE_MIC_AUDIO_TRACK = "createMicrophoneAudioTrack";
    a.CREATE_CUSTOM_AUDIO_TRACK = "createCustomAudioTrack";
    a.CREATE_BUFFER_AUDIO_TRACK = "createBufferSourceAudioTrack";
    a.CREATE_CAM_VIDEO_TRACK = "createCameraVideoTrack";
    a.CREATE_CUSTOM_VIDEO_TRACK = "createCustomVideoTrack";
    a.CREATE_MIC_AND_CAM_TRACKS = "createMicrophoneAndCameraTracks";
    a.CREATE_SCREEN_VIDEO_TRACK = "createScreenVideoTrack";
    a.SET_ENCRYPTION_CONFIG = "Client.setEncryptionConfig";
    a.START_PROXY_SERVER = "Client.startProxyServer";
    a.STOP_PROXY_SERVER = "Client.stopProxyServer";
    a.SET_PROXY_SERVER = "Client.setProxyServer";
    a.SET_TURN_SERVER = "Client.setTurnServer";
    a.SET_CLIENT_ROLE = "Client.setClientRole";
    a.SET_LOW_STREAM_PARAMETER = "Client.setLowStreamParameter";
    a.ENABLE_DUAL_STREAM = "Client.enableDualStream";
    a.DISABLE_DUAL_STREAM = "Client.disableDualStream";
    a.JOIN = "Client.join";
    a.LEAVE = "Client.leave";
    a.PUBLISH = "Client.publish";
    a.UNPUBLISH = "Client.unpublish";
    a.SUBSCRIBE = "Client.subscribe";
    a.UNSUBSCRIBE = "Client.unsubscribe";
    a.RENEW_TOKEN = "Client.renewToken";
    a.SET_REMOTE_VIDEO_STREAM_TYPE = "Client.setRemoteVideoStreamType";
    a.SET_STREAM_FALLBACK_OPTION = "Client.setStreamFallbackOption";
    a.ENABLE_AUDIO_VOLUME_INDICATOR = "Client.enableAudioVolumeIndicator";
    a.SEND_CUSTOM_REPORT_MESSAGE = "Client.sendCustomReportMessage";
    a.ON_LIVE_STREAM_WARNING = "Client.onLiveStreamWarning";
    a.ON_LIVE_STREAM_ERROR = "Client.onLiveStreamingError";
    a.START_LIVE_STREAMING = "Client.startLiveStreaming";
    a.SET_LIVE_TRANSCODING = "Client.setLiveTranscoding";
    a.STOP_LIVE_STREAMING = "Client.stopLiveStreaming";
    a.ADD_INJECT_STREAM_URL = "Client.addInjectStreamUrl";
    a.REMOVE_INJECT_STREAM_URL = "Client.removeInjectStreamUrl";
    a.START_CHANNEL_MEDIA_RELAY = "Client.startChannelMediaRelay";
    a.UPDATE_CHANNEL_MEDIA_RELAY = "Client.updateChannelMediaRelay";
    a.STOP_CHANNEL_MEDIA_RELAY = "Client.stopChannelMediaRelay";
    a.REQUEST_CONFIG_DISTRIBUTE = "_config-distribute-request";
    a.SET_CONFIG_DISTRIBUTE = "_configDistribute";
    a.LOCAL_TRACK_SET_MUTED = "LocalTrack.setMute";
    a.LOCAL_AUDIO_TRACK_PLAY = "LocalAudioTrack.play";
    a.LOCAL_AUDIO_TRACK_PLAY_IN_ELEMENT = "LocalAudioTrack.playInElement";
    a.LOCAL_AUDIO_TRACK_STOP = "LocalAudioTrack.stop";
    a.LOCAL_AUDIO_TRACK_SET_VOLUME = "LocalAudioTrack.setVolume";
    a.MIC_AUDIO_TRACK_SET_DEVICE = "MicrophoneAudioTrack.setDevice";
    a.BUFFER_AUDIO_TRACK_START =
      "BufferSourceAudioTrack.startProcessAudioBuffer";
    a.BUFFER_AUDIO_TRACK_STOP = "BufferSourceAudioTrack.stopProcessAudioBuffer";
    a.BUFFER_AUDIO_TRACK_PAUSE =
      "BufferSourceAudioTrack.pauseProcessAudioBuffer";
    a.BUFFER_AUDIO_TRACK_RESUME =
      "BufferSourceAudioTrack.resumeProcessAudioBuffer";
    a.BUFFER_AUDIO_TRACK_SEEK = "BufferSourceAudioTrack.seekAudioBuffer";
    a.LOCAL_VIDEO_TRACK_PLAY = "LocalVideoTrack.play";
    a.LOCAL_VIDEO_TRACK_STOP = "LocalVideoTrack.stop";
    a.LOCAL_VIDEO_TRACK_BEAUTY = "LocalVideoTrack.setBeautyEffect";
    a.CAM_VIDEO_TRACK_SET_DEVICE = "CameraVideoTrack.setDevice";
    a.CAM_VIDEO_TRACK_SET_ENCODER_CONFIG =
      "CameraVideoTrack.setEncoderConfiguration";
    a.REMOTE_VIDEO_TRACK_PLAY = "RemoteVideoTrack.play";
    a.REMOTE_VIDEO_TRACK_STOP = "RemoteVideoTrack.stop";
    a.REMOTE_AUDIO_TRACK_PLAY = "RemoteAudioTrack.play";
    a.REMOTE_AUDIO_TRACK_STOP = "RemoteAudioTrack.stop";
    a.REMOTE_AUDIO_SET_VOLUME = "RemoteAudioTrack.setVolume";
    a.REMOTE_AUDIO_SET_OUTPUT_DEVICE = "RemoteAudioTrack.setOutputDevice";
    a.STREAM_TYPE_CHANGE = "streamTypeChange";
  })(y || (y = {}));
  (D || (D = {})).TRACER = "tracer";
  (function (a) {
    a.IDLE = "IDLE";
    a.INITING = "INITING";
    a.INITEND = "INITEND";
  })(rc || (rc = {}));
  (function (a) {
    a.STATE_CHANGE = "state_change";
    a.RECORDING_DEVICE_CHANGED = "recordingDeviceChanged";
    a.PLAYOUT_DEVICE_CHANGED = "playoutDeviceChanged";
    a.CAMERA_DEVICE_CHANGED = "cameraDeviceChanged";
  })(Ub || (Ub = {}));
  (function (a) {
    a[(a.ACCESS_POINT = 101)] = "ACCESS_POINT";
    a[(a.UNILBS = 201)] = "UNILBS";
    a[(a.STRING_UID_ALLOCATOR = 901)] = "STRING_UID_ALLOCATOR";
  })(Bc || (Bc = {}));
  (function (a) {
    a[(a.IIIEGAL_APPID = 1)] = "IIIEGAL_APPID";
    a[(a.IIIEGAL_UID = 2)] = "IIIEGAL_UID";
    a[(a.INTERNAL_ERROR = 3)] = "INTERNAL_ERROR";
  })(ud || (ud = {}));
  (function (a) {
    a[(a.INVALID_VENDOR_KEY = 5)] = "INVALID_VENDOR_KEY";
    a[(a.INVALID_CHANNEL_NAME = 7)] = "INVALID_CHANNEL_NAME";
    a[(a.INTERNAL_ERROR = 8)] = "INTERNAL_ERROR";
    a[(a.NO_AUTHORIZED = 9)] = "NO_AUTHORIZED";
    a[(a.DYNAMIC_KEY_TIMEOUT = 10)] = "DYNAMIC_KEY_TIMEOUT";
    a[(a.NO_ACTIVE_STATUS = 11)] = "NO_ACTIVE_STATUS";
    a[(a.DYNAMIC_KEY_EXPIRED = 13)] = "DYNAMIC_KEY_EXPIRED";
    a[(a.STATIC_USE_DYNAMIC_KEY = 14)] = "STATIC_USE_DYNAMIC_KEY";
    a[(a.DYNAMIC_USE_STATIC_KEY = 15)] = "DYNAMIC_USE_STATIC_KEY";
    a[(a.USER_OVERLOAD = 16)] = "USER_OVERLOAD";
    a[(a.FORBIDDEN_REGION = 18)] = "FORBIDDEN_REGION";
    a[(a.CANNOT_MEET_AREA_DEMAND = 19)] = "CANNOT_MEET_AREA_DEMAND";
  })(Va || (Va = {}));
  (function (a) {
    a[(a.NO_FLAG_SET = 100)] = "NO_FLAG_SET";
    a[(a.FLAG_SET_BUT_EMPTY = 101)] = "FLAG_SET_BUT_EMPTY";
    a[(a.INVALID_FALG_SET = 102)] = "INVALID_FALG_SET";
    a[(a.NO_SERVICE_AVAILABLE = 200)] = "NO_SERVICE_AVAILABLE";
    a[(a.NO_SERVICE_AVAILABLE_P2P = 201)] = "NO_SERVICE_AVAILABLE_P2P";
    a[(a.NO_SERVICE_AVAILABLE_VOICE = 202)] = "NO_SERVICE_AVAILABLE_VOICE";
    a[(a.NO_SERVICE_AVAILABLE_WEBRTC = 203)] = "NO_SERVICE_AVAILABLE_WEBRTC";
    a[(a.NO_SERVICE_AVAILABLE_CDS = 204)] = "NO_SERVICE_AVAILABLE_CDS";
    a[(a.NO_SERVICE_AVAILABLE_CDN = 205)] = "NO_SERVICE_AVAILABLE_CDN";
    a[(a.NO_SERVICE_AVAILABLE_TDS = 206)] = "NO_SERVICE_AVAILABLE_TDS";
    a[(a.NO_SERVICE_AVAILABLE_REPORT = 207)] = "NO_SERVICE_AVAILABLE_REPORT";
    a[(a.NO_SERVICE_AVAILABLE_APP_CENTER = 208)] =
      "NO_SERVICE_AVAILABLE_APP_CENTER";
    a[(a.NO_SERVICE_AVAILABLE_ENV0 = 209)] = "NO_SERVICE_AVAILABLE_ENV0";
    a[(a.NO_SERVICE_AVAILABLE_VOET = 210)] = "NO_SERVICE_AVAILABLE_VOET";
    a[(a.NO_SERVICE_AVAILABLE_STRING_UID = 211)] =
      "NO_SERVICE_AVAILABLE_STRING_UID";
    a[(a.NO_SERVICE_AVAILABLE_WEBRTC_UNILBS = 212)] =
      "NO_SERVICE_AVAILABLE_WEBRTC_UNILBS";
    a[(a.NO_SERVICE_AVAILABLE_UNILBS_FLV = 213)] =
      "NO_SERVICE_AVAILABLE_UNILBS_FLV";
  })(Fa || (Fa = {}));
  (function (a) {
    a[(a.K_TIMESTAMP_EXPIRED = 2)] = "K_TIMESTAMP_EXPIRED";
    a[(a.K_CHANNEL_PERMISSION_INVALID = 3)] = "K_CHANNEL_PERMISSION_INVALID";
    a[(a.K_CERTIFICATE_INVALID = 4)] = "K_CERTIFICATE_INVALID";
    a[(a.K_CHANNEL_NAME_EMPTY = 5)] = "K_CHANNEL_NAME_EMPTY";
    a[(a.K_CHANNEL_NOT_FOUND = 6)] = "K_CHANNEL_NOT_FOUND";
    a[(a.K_TICKET_INVALID = 7)] = "K_TICKET_INVALID";
    a[(a.K_CHANNEL_CONFLICTED = 8)] = "K_CHANNEL_CONFLICTED";
    a[(a.K_SERVICE_NOT_READY = 9)] = "K_SERVICE_NOT_READY";
    a[(a.K_SERVICE_TOO_HEAVY = 10)] = "K_SERVICE_TOO_HEAVY";
    a[(a.K_UID_BANNED = 14)] = "K_UID_BANNED";
    a[(a.K_IP_BANNED = 15)] = "K_IP_BANNED";
    a[(a.K_CHANNEL_BANNED = 16)] = "K_CHANNEL_BANNED";
    a[(a.WARN_NO_AVAILABLE_CHANNEL = 103)] = "WARN_NO_AVAILABLE_CHANNEL";
    a[(a.WARN_LOOKUP_CHANNEL_TIMEOUT = 104)] = "WARN_LOOKUP_CHANNEL_TIMEOUT";
    a[(a.WARN_LOOKUP_CHANNEL_REJECTED = 105)] = "WARN_LOOKUP_CHANNEL_REJECTED";
    a[(a.WARN_OPEN_CHANNEL_TIMEOUT = 106)] = "WARN_OPEN_CHANNEL_TIMEOUT";
    a[(a.WARN_OPEN_CHANNEL_REJECTED = 107)] = "WARN_OPEN_CHANNEL_REJECTED";
    a[(a.WARN_REQUEST_DEFERRED = 108)] = "WARN_REQUEST_DEFERRED";
    a[(a.ERR_DYNAMIC_KEY_TIMEOUT = 109)] = "ERR_DYNAMIC_KEY_TIMEOUT";
    a[(a.ERR_NO_AUTHORIZED = 110)] = "ERR_NO_AUTHORIZED";
    a[(a.ERR_VOM_SERVICE_UNAVAILABLE = 111)] = "ERR_VOM_SERVICE_UNAVAILABLE";
    a[(a.ERR_NO_CHANNEL_AVAILABLE_CODE = 112)] =
      "ERR_NO_CHANNEL_AVAILABLE_CODE";
    a[(a.ERR_MASTER_VOCS_UNAVAILABLE = 114)] = "ERR_MASTER_VOCS_UNAVAILABLE";
    a[(a.ERR_INTERNAL_ERROR = 115)] = "ERR_INTERNAL_ERROR";
    a[(a.ERR_NO_ACTIVE_STATUS = 116)] = "ERR_NO_ACTIVE_STATUS";
    a[(a.ERR_INVALID_UID = 117)] = "ERR_INVALID_UID";
    a[(a.ERR_DYNAMIC_KEY_EXPIRED = 118)] = "ERR_DYNAMIC_KEY_EXPIRED";
    a[(a.ERR_STATIC_USE_DYANMIC_KE = 119)] = "ERR_STATIC_USE_DYANMIC_KE";
    a[(a.ERR_DYNAMIC_USE_STATIC_KE = 120)] = "ERR_DYNAMIC_USE_STATIC_KE";
    a[(a.ERR_NO_VOCS_AVAILABLE = 2e3)] = "ERR_NO_VOCS_AVAILABLE";
    a[(a.ERR_NO_VOS_AVAILABLE = 2001)] = "ERR_NO_VOS_AVAILABLE";
    a[(a.ERR_JOIN_CHANNEL_TIMEOUT = 2002)] = "ERR_JOIN_CHANNEL_TIMEOUT";
    a[(a.ERR_REPEAT_JOIN_CHANNEL = 2003)] = "ERR_REPEAT_JOIN_CHANNEL";
    a[(a.ERR_JOIN_BY_MULTI_IP = 2004)] = "ERR_JOIN_BY_MULTI_IP";
    a[(a.ERR_NOT_JOINED = 2011)] = "ERR_NOT_JOINED";
    a[(a.ERR_REPEAT_JOIN_REQUEST = 2012)] = "ERR_REPEAT_JOIN_REQUEST";
    a[(a.ERR_INVALID_VENDOR_KEY = 2013)] = "ERR_INVALID_VENDOR_KEY";
    a[(a.ERR_INVALID_CHANNEL_NAME = 2014)] = "ERR_INVALID_CHANNEL_NAME";
    a[(a.ERR_INVALID_STRINGUID = 2015)] = "ERR_INVALID_STRINGUID";
    a[(a.ERR_TOO_MANY_USERS = 2016)] = "ERR_TOO_MANY_USERS";
    a[(a.ERR_SET_CLIENT_ROLE_TIMEOUT = 2017)] = "ERR_SET_CLIENT_ROLE_TIMEOUT";
    a[(a.ERR_SET_CLIENT_ROLE_NO_PERMISSION = 2018)] =
      "ERR_SET_CLIENT_ROLE_NO_PERMISSION";
    a[(a.ERR_SET_CLIENT_ROLE_ALREADY_IN_USE = 2019)] =
      "ERR_SET_CLIENT_ROLE_ALREADY_IN_USE";
    a[(a.ERR_PUBLISH_REQUEST_INVALID = 2020)] = "ERR_PUBLISH_REQUEST_INVALID";
    a[(a.ERR_SUBSCRIBE_REQUEST_INVALID = 2021)] =
      "ERR_SUBSCRIBE_REQUEST_INVALID";
    a[(a.ERR_NOT_SUPPORTED_MESSAGE = 2022)] = "ERR_NOT_SUPPORTED_MESSAGE";
    a[(a.ERR_ILLEAGAL_PLUGIN = 2023)] = "ERR_ILLEAGAL_PLUGIN";
    a[(a.ERR_REJOIN_TOKEN_INVALID = 2024)] = "ERR_REJOIN_TOKEN_INVALID";
    a[(a.ERR_REJOIN_USER_NOT_JOINED = 2025)] = "ERR_REJOIN_USER_NOT_JOINED";
    a[(a.ERR_INVALID_OPTIONAL_INFO = 2027)] = "ERR_INVALID_OPTIONAL_INFO";
    a[(a.ILLEGAL_AES_PASSWORD = 2028)] = "ILLEGAL_AES_PASSWORD";
    a[(a.ERR_TEST_RECOVER = 9e3)] = "ERR_TEST_RECOVER";
    a[(a.ERR_TEST_TRYNEXT = 9001)] = "ERR_TEST_TRYNEXT";
    a[(a.ERR_TEST_RETRY = 9002)] = "ERR_TEST_RETRY";
  })(C || (C = {}));
  (function (a) {
    a.CONNECTION_STATE_CHANGE = "connection-state-change";
    a.MEDIA_RECONNECT_START = "media-reconnect-start";
    a.MEDIA_RECONNECT_END = "media-reconnect-end";
    a.USER_JOINED = "user-joined";
    a.USER_LEAVED = "user-left";
    a.USER_PUBLISHED = "user-published";
    a.USER_UNPUBLISHED = "user-unpublished";
    a.USER_INFO_UPDATED = "user-info-updated";
    a.CLIENT_BANNED = "client-banned";
    a.CHANNEL_MEDIA_RELAY_STATE = "channel-media-relay-state";
    a.CHANNEL_MEDIA_RELAY_EVENT = "channel-media-relay-event";
    a.VOLUME_INDICATOR = "volume-indicator";
    a.CRYPT_ERROR = "crypt-error";
    a.ON_TOKEN_PRIVILEGE_WILL_EXPIRE = "token-privilege-will-expire";
    a.ON_TOKEN_PRIVILEGE_DID_EXPIRE = "token-privilege-did-expire";
    a.NETWORK_QUALITY = "network-quality";
    a.STREAM_TYPE_CHANGED = "stream-type-changed";
    a.STREAM_FALLBACK = "stream-fallback";
    a.RECEIVE_METADATA = "receive-metadata";
    a.STREAM_MESSAGE = "stream-message";
    a.LIVE_STREAMING_ERROR = "live-streaming-error";
    a.LIVE_STREAMING_WARNING = "live-streaming-warning";
    a.INJECT_STREAM_STATUS = "stream-inject-status";
    a.EXCEPTION = "exception";
    a.ERROR = "error";
  })(P || (P = {}));
  (function (a) {
    a.CONNECTING = "connecting";
    a.CONNECTED = "connected";
    a.RECONNECTING = "reconnecting";
    a.CLOSED = "closed";
  })(ta || (ta = {}));
  (function (a) {
    a.WS_CONNECTED = "ws_connected";
    a.WS_RECONNECTING = "ws_reconnecting";
    a.WS_CLOSED = "ws_closed";
    a.ON_BINARY_DATA = "on_binary_data";
    a.REQUEST_RECOVER = "request_recover";
    a.REQUEST_JOIN_INFO = "request_join_info";
    a.REQUEST_REJOIN_INFO = "req_rejoin_info";
    a.IS_P2P_DISCONNECTED = "is_p2p_dis";
    a.DISCONNECT_P2P = "dis_p2p";
    a.NEED_RENEW_SESSION = "need-sid";
    a.REPORT_JOIN_GATEWAY = "report_join_gateway";
    a.REQUEST_TIMEOUT = "request_timeout";
    a.REQUEST_SUCCESS = "request_success";
  })(N || (N = {}));
  (function (a) {
    a.PING = "ping";
    a.PING_BACK = "ping_back";
    a.JOIN = "join_v2";
    a.REJOIN = "rejoin";
    a.LEAVE = "leave";
    a.SET_CLIENT_ROLE = "set_client_role";
    a.PUBLISH = "publish";
    a.UNPUBLISH = "unpublish";
    a.SUBSCRIBE = "subscribe";
    a.UNSUBSCRIBE = "unsubscribe";
    a.SUBSCRIBE_CHANGE = "subscribe_change";
    a.TRAFFIC_STATS = "traffic_stats";
    a.RENEW_TOKEN = "renew_token";
    a.SWITCH_VIDEO_STREAM = "switch_video_stream";
    a.SET_FALLBACK_OPTION = "set_fallback_option";
    a.GATEWAY_INFO = "gateway_info";
    a.CONTROL = "control";
    a.SEND_METADATA = "send_metadata";
    a.DATA_STREAM = "data_stream";
  })(ca || (ca = {}));
  (function (a) {
    a.PUBLISH_STATS = "publish_stats";
    a.PUBLISH_RELATED_STATS = "publish_related_stats";
    a.SUBSCRIBE_STATS = "subscribe_stats";
    a.SUBSCRIBE_RELATED_STATS = "subscribe_related_stats";
  })(wb || (wb = {}));
  (function (a) {
    a.ON_USER_ONLINE = "on_user_online";
    a.ON_USER_OFFLINE = "on_user_offline";
    a.ON_STREAM_FALLBACK_UPDATE = "on_stream_fallback_update";
    a.ON_PUBLISH_STREAM = "on_publish_stream";
    a.ON_UPLINK_STATS = "on_uplink_stats";
    a.ON_P2P_LOST = "on_p2p_lost";
    a.ON_REMOVE_STREAM = "on_remove_stream";
    a.ON_ADD_AUDIO_STREAM = "on_add_audio_stream";
    a.ON_ADD_VIDEO_STREAM = "on_add_video_stream";
    a.ON_TOKEN_PRIVILEGE_WILL_EXPIRE = "on_token_privilege_will_expire";
    a.ON_TOKEN_PRIVILEGE_DID_EXPIRE = "on_token_privilege_did_expire";
    a.ON_USER_BANNED = "on_user_banned";
    a.ON_NOTIFICATION = "on_notification";
    a.ON_CRYPT_ERROR = "on_crypt_error";
    a.MUTE_AUDIO = "mute_audio";
    a.MUTE_VIDEO = "mute_video";
    a.UNMUTE_AUDIO = "unmute_audio";
    a.UNMUTE_VIDEO = "unmute_video";
    a.RECEIVE_METADATA = "receive_metadata";
    a.ON_DATA_STREAM = "on_data_stream";
    a.ENABLE_LOCAL_VIDEO = "enable_local_video";
    a.DISABLE_LOCAL_VIDEO = "disable_local_video";
    a.ENABLE_LOCAL_AUDIO = "enable_local_audio";
    a.DISABLE_LOCAL_AUDIO = "disable_local_audio";
  })(Y || (Y = {}));
  (function (a) {
    a.CONNECTION_STATE_CHANGE = "CONNECTION_STATE_CHANGE";
    a.NEED_ANSWER = "NEED_ANSWER";
    a.NEED_RENEGOTIATE = "NEED_RENEGOTIATE";
    a.P2P_LOST = "P2P_LOST";
    a.GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST";
    a.NEED_UNPUB = "NEED_UNPUB";
    a.NEED_UNSUB = "NEED_UNSUB";
    a.NEED_UPLOAD = "NEED_UPLOAD";
    a.START_RECONNECT = "START_RECONNECT";
    a.END_RECONNECT = "END_RECONNECT";
    a.NEED_SIGNAL_RTT = "NEED_SIGNAL_RTT";
  })(G || (G = {}));
  (function (a) {
    a.AUDIO_SOURCE_STATE_CHANGE = "audio_source_state_change";
    a.RECEIVE_TRACK_BUFFER = "receive_track_buffer";
    a.ON_AUDIO_BUFFER = "on_audio_buffer";
  })(lb || (lb = {}));
  let te = {
      sendVolumeLevel: 0,
      sendBitrate: 0,
      sendBytes: 0,
      sendPackets: 0,
      sendPacketsLost: 0,
    },
    ue = {
      sendBytes: 0,
      sendBitrate: 0,
      sendPackets: 0,
      sendPacketsLost: 0,
      sendResolutionHeight: 0,
      sendResolutionWidth: 0,
      captureResolutionHeight: 0,
      captureResolutionWidth: 0,
      targetSendBitrate: 0,
      totalDuration: 0,
      totalFreezeTime: 0,
    },
    gg = {
      transportDelay: 0,
      end2EndDelay: 0,
      receiveBitrate: 0,
      receiveLevel: 0,
      receiveBytes: 0,
      receiveDelay: 0,
      receivePackets: 0,
      receivePacketsLost: 0,
      totalDuration: 0,
      totalFreezeTime: 0,
      freezeRate: 0,
      packetLossRate: 0,
      publishDuration: -1,
    },
    yk = { uplinkNetworkQuality: 0, downlinkNetworkQuality: 0 },
    hg = {
      transportDelay: 0,
      end2EndDelay: 0,
      receiveBitrate: 0,
      receiveBytes: 0,
      receiveDelay: 0,
      receivePackets: 0,
      receivePacketsLost: 0,
      receiveResolutionHeight: 0,
      receiveResolutionWidth: 0,
      totalDuration: 0,
      totalFreezeTime: 0,
      freezeRate: 0,
      packetLossRate: 0,
      publishDuration: -1,
    };
  var T, na;
  !(function (a) {
    a.CONNECTED = "websocket:connected";
    a.RECONNECTING = "websocket:reconnecting";
    a.WILL_RECONNECT = "websocket:will_reconnect";
    a.CLOSED = "websocket:closed";
    a.FAILED = "websocket:failed";
    a.ON_MESSAGE = "websocket:on_message";
    a.REQUEST_NEW_URLS = "websocket:request_new_urls";
  })(T || (T = {}));
  (function (a) {
    a.TRANSCODE = "mix_streaming";
    a.RAW = "raw_streaming";
    a.INJECT = "inject_streaming";
  })(na || (na = {}));
  let ip = {
      alpha: 1,
      height: 640,
      width: 360,
      x: 0,
      y: 0,
      zOrder: 0,
      audioChannel: 0,
    },
    ig = { x: 0, y: 0, width: 160, height: 160, zOrder: 255, alpha: 1 },
    jp = {
      audioBitrate: 48,
      audioChannels: 1,
      audioSampleRate: 48e3,
      backgroundColor: 0,
      height: 360,
      lowLatency: !1,
      videoBitrate: 400,
      videoCodecProfile: 100,
      videoCodecType: 1,
      videoFrameRate: 15,
      videoGop: 30,
      width: 640,
      images: [],
      userConfigs: [],
      userConfigExtraInfo: "",
    },
    kp = {
      audioBitrate: 48,
      audioChannels: 2,
      audioVolume: 100,
      audioSampleRate: 48e3,
      height: 0,
      width: 0,
      videoBitrate: 400,
      videoFramerate: 15,
      videoGop: 30,
    };
  var mb, Rc, ka, zk, Ga, ya, K, nb, vd, ve;
  !(function (a) {
    a.WARNING = "@live_uap-warning";
    a.ERROR = "@line_uap-error";
    a.PUBLISH_STREAM_STATUS = "@live_uap-publish-status";
    a.INJECT_STREAM_STATUS = "@live_uap-inject-status";
    a.WORKER_STATUS = "@live_uap-worker-status";
    a.REQUEST_NEW_ADDRESS = "@live_uap-request-address";
  })(mb || (mb = {}));
  (Rc || (Rc = {})).REQUEST_WORKER_MANAGER_LIST = "@live_req_worker_manager";
  (function (a) {
    a[(a.LIVE_STREAM_RESPONSE_SUCCEED = 200)] = "LIVE_STREAM_RESPONSE_SUCCEED";
    a[(a.LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM = 454)] =
      "LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM";
    a[(a.LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR = 450)] =
      "LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR";
    a[(a.LIVE_STREAM_RESPONSE_BAD_STREAM = 451)] =
      "LIVE_STREAM_RESPONSE_BAD_STREAM";
    a[(a.LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR = 400)] =
      "LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR";
    a[(a.LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST = 404)] =
      "LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST";
    a[(a.LIVE_STREAM_RESPONSE_NOT_AUTHORIZED = 456)] =
      "LIVE_STREAM_RESPONSE_NOT_AUTHORIZED";
    a[(a.LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE = 457)] =
      "LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE";
    a[(a.LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN = 429)] =
      "LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN";
    a[(a.LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH = 452)] =
      "LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH";
    a[(a.LIVE_STREAM_RESPONSE_NOT_SUPPORTED = 453)] =
      "LIVE_STREAM_RESPONSE_NOT_SUPPORTED";
    a[(a.LIVE_STREAM_RESPONSE_MAX_STREAM_NUM = 455)] =
      "LIVE_STREAM_RESPONSE_MAX_STREAM_NUM";
    a[(a.LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR = 500)] =
      "LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR";
    a[(a.LIVE_STREAM_RESPONSE_WORKER_LOST = 501)] =
      "LIVE_STREAM_RESPONSE_WORKER_LOST";
    a[(a.LIVE_STREAM_RESPONSE_RESOURCE_LIMIT = 502)] =
      "LIVE_STREAM_RESPONSE_RESOURCE_LIMIT";
    a[(a.LIVE_STREAM_RESPONSE_WORKER_QUIT = 503)] =
      "LIVE_STREAM_RESPONSE_WORKER_QUIT";
    a[(a.ERROR_FAIL_SEND_MESSAGE = 504)] = "ERROR_FAIL_SEND_MESSAGE";
    a[(a.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE = 30)] =
      "PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE";
    a[(a.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT = 31)] =
      "PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT";
    a[(a.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH = 32)] =
      "PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH";
    a[(a.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN = 33)] =
      "PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN";
  })(ka || (ka = {}));
  (function (a) {
    a.CONNECT_FAILED = "connect failed";
    a.CONNECT_TIMEOUT = "connect timeout";
    a.WS_DISCONNECTED = "websocket disconnected";
    a.REQUEST_TIMEOUT = "request timeout";
    a.REQUEST_FAILED = "request failed";
    a.WAIT_STATUS_TIMEOUT = "wait status timeout";
    a.WAIT_STATUS_ERROR = "wait status error";
    a.BAD_STATE = "bad state";
    a.WS_ABORT = "ws abort";
    a.AP_REQUEST_TIMEOUT = "AP request timeout";
    a.AP_JSON_PARSE_ERROR = "AP json parse error";
    a.AP_REQUEST_ERROR = "AP request error";
    a.AP_REQUEST_ABORT = "AP request abort";
  })(zk || (zk = {}));
  (function (a) {
    a[(a.SetSdkProfile = 0)] = "SetSdkProfile";
    a[(a.SetSourceChannel = 1)] = "SetSourceChannel";
    a[(a.SetSourceUserId = 2)] = "SetSourceUserId";
    a[(a.SetDestChannel = 3)] = "SetDestChannel";
    a[(a.StartPacketTransfer = 4)] = "StartPacketTransfer";
    a[(a.StopPacketTransfer = 5)] = "StopPacketTransfer";
    a[(a.UpdateDestChannel = 6)] = "UpdateDestChannel";
    a[(a.Reconnect = 7)] = "Reconnect";
    a[(a.SetVideoProfile = 8)] = "SetVideoProfile";
  })(Ga || (Ga = {}));
  (function (a) {
    a.DISCONNECT = "disconnect";
    a.CONNECTION_STATE_CHANGE = "connection-state-change";
    a.NETWORK_QUALITY = "network-quality";
    a.STREAM_TYPE_CHANGE = "stream-type-change";
    a.IS_P2P_DISCONNECTED = "is-p2p-dis";
    a.DISCONNECT_P2P = "dis-p2p";
    a.REQUEST_NEW_GATEWAY_LIST = "req-gate-url";
    a.NEED_RENEW_SESSION = "need-sid";
  })(ya || (ya = {}));
  (function (a) {
    a.NEED_RENEGOTIATE = "@need_renegotiate";
    a.NEED_REPLACE_TRACK = "@need_replace_track";
    a.NEED_CLOSE = "@need_close";
    a.NEED_ADD_TRACK = "@need_add_track";
    a.NEED_REMOVE_TRACK = "@need_remove_track";
    a.NEED_SESSION_ID = "@need_sid";
    a.SET_OPTIMIZATION_MODE = "@set_optimization_mode";
    a.GET_STATS = "@get_stats";
    a.GET_LOW_VIDEO_TRACK = "@get_low_video_track";
  })(K || (K = {}));
  (function (a) {
    a.SCREEN_TRACK = "screen_track";
    a.LOW_STREAM = "low_stream";
  })(nb || (nb = {}));
  (function (a) {
    a.SOURCE_STATE_CHANGE = "source-state-change";
    a.TRACK_ENDED = "track-ended";
    a.BEAUTY_EFFECT_OVERLOAD = "beauty-effect-overload";
  })(vd || (vd = {}));
  (ve || (ve = {})).FIRST_FRAME_DECODED = "first-frame-decoded";
  let Ak =
      "AFRICA ASIA CHINA EUROPE GLOBAL INDIA JAPAN NORTH_AMERICA OCEANIA OVERSEA SOUTH_AMERICA".split(
        " "
      ),
    we = {
      CHINA: {},
      ASIA: {
        CODE: "AS",
        WEBCS_DOMAIN: ["ap-web-1-asia.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-asia.agora.io"],
        PROXY_CS: ["proxy-ap-web-asia.agora.io"],
        CDS_AP: ["cds-ap-web-asia.agora.io", "cds-ap-web-asia2.agora.io"],
        ACCOUNT_REGISTER: [
          "sua-ap-web-asia.agora.io",
          "sua-ap-web-asia2.agora.io",
        ],
        UAP_AP: ["uap-ap-web-asia.agora.io", "uap-ap-web-asia2.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1-asia.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-asia.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-asia.agora.io"],
      },
      NORTH_AMERICA: {
        CODE: "NA",
        WEBCS_DOMAIN: ["ap-web-1-north-america.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-north-america.agora.io"],
        PROXY_CS: ["proxy-ap-web-america.agora.io"],
        CDS_AP: ["cds-ap-web-america.agora.io", "cds-ap-web-america2.agora.io"],
        ACCOUNT_REGISTER: [
          "sua-ap-web-america.agora.io",
          "sua-ap-web-america2.agora.io",
        ],
        UAP_AP: ["uap-ap-web-america.agora.io", "uap-ap-web-america2.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1-north-america.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-north-america.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-north-america.agora.io"],
      },
      EUROPE: {
        CODE: "EU",
        WEBCS_DOMAIN: ["ap-web-1-europe.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-europe.agora.io"],
        PROXY_CS: ["proxy-ap-web-europe.agora.io"],
        CDS_AP: ["cds-ap-web-europe.agora.io", "cds-ap-web-europe2.agora.io"],
        ACCOUNT_REGISTER: [
          "sua-ap-web-europe.agora.io",
          "sua-ap-web-europe.agora.io",
        ],
        UAP_AP: ["uap-ap-web-europe.agora.io", "uap-ap-web-europe2.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1-europe.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-europe.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-europe.agora.io"],
      },
      JAPAN: {
        CODE: "JP",
        WEBCS_DOMAIN: ["ap-web-1-japan.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-japan.agora.io"],
        PROXY_CS: ["proxy-ap-web-japan.agora.io"],
        CDS_AP: ["cds-ap-web-japan.agora.io", "cds-ap-web-japan2.agora.io"],
        ACCOUNT_REGISTER: [
          "sua-ap-web-japan.agora.io",
          "sua-ap-web-japan2.agora.io",
        ],
        UAP_AP: ["uap-ap-web-japan.agora.io", "\tuap-ap-web-japan2.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1-japan.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-japan.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-japan.agora.io"],
      },
      INDIA: {
        CODE: "IN",
        WEBCS_DOMAIN: ["ap-web-1-india.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-india.agora.io"],
        PROXY_CS: ["proxy-ap-web-india.agora.io"],
        CDS_AP: ["cds-ap-web-india.agora.io", "cds-ap-web-india2.agora.io"],
        ACCOUNT_REGISTER: [
          "sua-ap-web-india.agora.io",
          "sua-ap-web-india2.agora.io",
        ],
        UAP_AP: ["uap-ap-web-india.agora.io", "uap-ap-web-india2.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1-india.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-india.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-india.agora.io"],
      },
      OVERSEA: {
        CODE: "OVERSEA",
        WEBCS_DOMAIN: ["ap-web-1-oversea.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-oversea.agora.io"],
        PROXY_CS: ["proxy-ap-web-oversea.agora.io"],
        CDS_AP: ["cds-ap-web-oversea.agora.io"],
        ACCOUNT_REGISTER: ["sua-ap-web-oversea.agora.io"],
        UAP_AP: ["uap-ap-web-oversea.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1-oversea.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-oversea.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-oversea.agora.io"],
      },
      GLOBAL: {
        CODE: "GLOBAL",
        WEBCS_DOMAIN: ["webrtc2-ap-web-1.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["webrtc2-ap-web-3.agora.io"],
        PROXY_CS: ["ap-proxy-1.agora.io", "ap-proxy-2.agora.io"],
        CDS_AP: ["cds-ap-web-1.agora.io", "cds-ap-web-3.agora.io"],
        ACCOUNT_REGISTER: ["sua-ap-web-1.agora.io", "sua-ap-web-3.agora.io"],
        UAP_AP: ["uap-ap-web-1.agora.io", "uap-ap-web-3.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice.agora.io"],
      },
      OCEANIA: {
        CODE: "OC",
        WEBCS_DOMAIN: ["ap-web-1-oceania.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-oceania.agora.io"],
        PROXY_CS: ["proxy-ap-web-oceania.agora.io"],
        CDS_AP: ["cds-ap-web-oceania.agora.io", "cds-ap-web-oceania2.agora.io"],
        ACCOUNT_REGISTER: [
          "sua-ap-web-oceania.agora.io",
          "sua-ap-web-oceania2.agora.io",
        ],
        UAP_AP: ["uap-ap-web-oceania.agora.io", "uap-ap-web-oceania2.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1-oceania.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-oceania.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-oceania.agora.io"],
      },
      SOUTH_AMERICA: {
        CODE: "SA",
        WEBCS_DOMAIN: ["ap-web-1-south-america.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-south-america.agora.io"],
        PROXY_CS: ["proxy-ap-web-south-america.agora.io"],
        CDS_AP: [
          "cds-ap-web-south-america.agora.io",
          "cds-ap-web-south-america2.agora.io",
        ],
        ACCOUNT_REGISTER: [
          "sua-ap-web-south-america.agora.io",
          "sua-ap-web-south-america2.agora.io",
        ],
        UAP_AP: [
          "uap-ap-web-south-america.agora.io",
          "uap-ap-web-south-america2.agora.io",
        ],
        EVENT_REPORT_DOMAIN: ["statscollector-1-south-america.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-south-america.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-south-america.agora.io"],
      },
      AFRICA: {
        CODE: "AF",
        WEBCS_DOMAIN: ["ap-web-1-africa.agora.io"],
        WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-africa.agora.io"],
        PROXY_CS: ["proxy-ap-web-africa.agora.io"],
        CDS_AP: ["cds-ap-web-africa.agora.io", "cds-ap-web-africa2.agora.io"],
        ACCOUNT_REGISTER: [
          "sua-ap-web-africa.agora.io",
          "sua-ap-web-africa2.agora.io",
        ],
        UAP_AP: ["uap-ap-web-africa.agora.io", "uap-ap-web-africa2.agora.io"],
        EVENT_REPORT_DOMAIN: ["statscollector-1-africa.agora.io"],
        EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-africa.agora.io"],
        LOG_UPLOAD_SERVER: ["logservice-south-africa.agora.io"],
      },
    };
  yc &&
    (we.CHINA = {
      CODE: "CN",
      WEBCS_DOMAIN: ["webrtc2-ap-web-2.agoraio.cn"],
      WEBCS_DOMAIN_BACKUP_LIST: ["webrtc2-ap-web-4.agoraio.cn"],
      PROXY_CS: ["proxy-ap-web.agoraio.cn"],
      CDS_AP: ["cds-ap-web-2.agoraio.cn", "cds-ap-web-4.agoraio.cn"],
      ACCOUNT_REGISTER: ["sua-ap-web-2.agoraio.cn", "sua-ap-web-4.agoraio.cn"],
      UAP_AP: ["uap-ap-web-2.agoraio.cn", "uap-ap-web-4.agoraio.cn"],
      EVENT_REPORT_DOMAIN: ["statscollector-3.agoraio.cn"],
      EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-4.agoraio.cn"],
      LOG_UPLOAD_SERVER: ["logservice-china.agora.io"],
    });
  let fa = {
    getDisplayMedia: !1,
    getStreamFromExtension: !1,
    supportUnifiedPlan: !1,
    supportMinBitrate: !1,
    supportSetRtpSenderParameters: !1,
    supportDualStream: !0,
    webAudioMediaStreamDest: !1,
    supportReplaceTrack: !1,
    supportWebGL: !1,
    webAudioWithAEC: !1,
    supportRequestFrame: !1,
    supportShareAudio: !1,
  };
  M(
    { target: "Object", stat: !0, forced: !ma, sham: !ma },
    { defineProperties: Pi }
  );
  var Sa = Oa(function (a) {
      var b = ha.Object;
      a = a.exports = function (a, e) {
        return b.defineProperties(a, e);
      };
      b.defineProperties.sham && (a.sham = !0);
    }),
    lp = ce.concat("length", "prototype"),
    jg = {
      f:
        Object.getOwnPropertyNames ||
        function (a) {
          return Oi(a, lp);
        },
    },
    mp =
      Qb("Reflect", "ownKeys") ||
      function (a) {
        var b = jg.f(Qa(a)),
          d = ld.f;
        return d ? b.concat(d(a)) : b;
      };
  M(
    { target: "Object", stat: !0, sham: !ma },
    {
      getOwnPropertyDescriptors: function (a) {
        var b, d;
        a = ib(a);
        for (var e = Hc, f = mp(a), g = {}, k = 0; f.length > k; )
          void 0 !== (d = e(a, (b = f[k++]))) && nc(g, b, d);
        return g;
      },
    }
  );
  var ja = ha.Object.getOwnPropertyDescriptors,
    Bk = jg.f,
    np = {}.toString,
    Ck =
      "object" == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : [],
    Dk = function (a) {
      if (Ck && "[object Window]" == np.call(a))
        try {
          var b = Bk(a);
        } catch (d) {
          b = Ck.slice();
        }
      else b = Bk(ib(a));
      return b;
    },
    Ek = { f: va },
    op = jb.f,
    Wa = $d("hidden"),
    Fk = va("toPrimitive"),
    pp = fb.set,
    Gk = fb.getterFor("Symbol"),
    xb = Object.prototype,
    Xa = J.Symbol,
    wd = Qb("JSON", "stringify"),
    Hk = Hc,
    bc = jb.f,
    Ik = Dk,
    qp = Sd,
    Vb = Rb("symbols"),
    xd = Rb("op-symbols"),
    kg = Rb("string-to-symbol-registry"),
    lg = Rb("symbol-to-string-registry"),
    rp = Rb("wks"),
    mg = J.QObject,
    ng = !mg || !mg.prototype || !mg.prototype.findChild,
    og =
      ma &&
      ra(function () {
        return (
          7 !=
          mc(
            bc({}, "a", {
              get: function () {
                return bc(this, "a", { value: 7 }).a;
              },
            })
          ).a
        );
      })
        ? function (a, b, d) {
            var e = Hk(xb, b);
            e && delete xb[b];
            bc(a, b, d);
            e && a !== xb && bc(xb, b, e);
          }
        : bc,
    Jk = function (a, b) {
      var d = (Vb[a] = mc(Xa.prototype));
      return (
        pp(d, { type: "Symbol", tag: a, description: b }),
        ma || (d.description = b),
        d
      );
    },
    pg =
      Hb && "symbol" == typeof Xa.iterator
        ? function (a) {
            return "symbol" == typeof a;
          }
        : function (a) {
            return Object(a) instanceof Xa;
          },
    xe = function (a, b, d) {
      a === xb && xe(xd, b, d);
      Qa(a);
      b = Fc(b, !0);
      return (
        Qa(d),
        V(Vb, b)
          ? (d.enumerable
              ? (V(a, Wa) && a[Wa][b] && (a[Wa][b] = !1),
                (d = mc(d, { enumerable: hc(0, !1) })))
              : (V(a, Wa) || bc(a, Wa, hc(1, {})), (a[Wa][b] = !0)),
            og(a, b, d))
          : bc(a, b, d)
      );
    },
    Lk = function (a, b) {
      Qa(a);
      var d = ib(b);
      b = $b(d).concat(qg(d));
      return (
        Kc(b, function (b) {
          (ma && !Kk.call(d, b)) || xe(a, b, d[b]);
        }),
        a
      );
    },
    Kk = function (a) {
      a = Fc(a, !0);
      var b = qp.call(this, a);
      return (
        !(this === xb && V(Vb, a) && !V(xd, a)) &&
        (!(b || !V(this, a) || !V(Vb, a) || (V(this, Wa) && this[Wa][a])) || b)
      );
    },
    Mk = function (a, b) {
      a = ib(a);
      b = Fc(b, !0);
      if (a !== xb || !V(Vb, b) || V(xd, b)) {
        var d = Hk(a, b);
        return (
          !d || !V(Vb, b) || (V(a, Wa) && a[Wa][b]) || (d.enumerable = !0), d
        );
      }
    },
    Nk = function (a) {
      a = Ik(ib(a));
      var b = [];
      return (
        Kc(a, function (a) {
          V(Vb, a) || V(Jc, a) || b.push(a);
        }),
        b
      );
    },
    qg = function (a) {
      var b = a === xb;
      a = Ik(b ? xd : ib(a));
      var d = [];
      return (
        Kc(a, function (a) {
          !V(Vb, a) || (b && !V(xb, a)) || d.push(Vb[a]);
        }),
        d
      );
    };
  if (
    (Hb ||
      ((Xa = function () {
        if (this instanceof Xa) throw TypeError("Symbol is not a constructor");
        var a =
            arguments.length && void 0 !== arguments[0]
              ? String(arguments[0])
              : void 0,
          b = Wd(a),
          d = function (a) {
            this === xb && d.call(xd, a);
            V(this, Wa) && V(this[Wa], b) && (this[Wa][b] = !1);
            og(this, b, hc(1, a));
          };
        return ma && ng && og(xb, b, { configurable: !0, set: d }), Jk(b, a);
      }),
      yf(Xa.prototype, "toString", function () {
        return Gk(this).tag;
      }),
      (Sd = Kk),
      (jb.f = xe),
      (Hc = Mk),
      (jg.f = Dk = Nk),
      (ld.f = qg),
      ma &&
        bc(Xa.prototype, "description", {
          configurable: !0,
          get: function () {
            return Gk(this).description;
          },
        })),
    Ei ||
      (Ek.f = function (a) {
        return Jk(va(a), a);
      }),
    M({ global: !0, wrap: !0, forced: !Hb, sham: !Hb }, { Symbol: Xa }),
    Kc($b(rp), function (a) {
      var b = ha.Symbol || (ha.Symbol = {});
      V(b, a) || op(b, a, { value: Ek.f(a) });
    }),
    M(
      { target: "Symbol", stat: !0, forced: !Hb },
      {
        for: function (a) {
          a = String(a);
          if (V(kg, a)) return kg[a];
          var b = Xa(a);
          return (kg[a] = b), (lg[b] = a), b;
        },
        keyFor: function (a) {
          if (!pg(a)) throw TypeError(a + " is not a symbol");
          if (V(lg, a)) return lg[a];
        },
        useSetter: function () {
          ng = !0;
        },
        useSimple: function () {
          ng = !1;
        },
      }
    ),
    M(
      { target: "Object", stat: !0, forced: !Hb, sham: !ma },
      {
        create: function (a, b) {
          return void 0 === b ? mc(a) : Lk(mc(a), b);
        },
        defineProperty: xe,
        defineProperties: Lk,
        getOwnPropertyDescriptor: Mk,
      }
    ),
    M(
      { target: "Object", stat: !0, forced: !Hb },
      { getOwnPropertyNames: Nk, getOwnPropertySymbols: qg }
    ),
    M(
      {
        target: "Object",
        stat: !0,
        forced: ra(function () {
          ld.f(1);
        }),
      },
      {
        getOwnPropertySymbols: function (a) {
          return ld.f(ub(a));
        },
      }
    ),
    wd)
  ) {
    var sp =
      !Hb ||
      ra(function () {
        var a = Xa();
        return (
          "[null]" != wd([a]) || "{}" != wd({ a }) || "{}" != wd(Object(a))
        );
      });
    M(
      { target: "JSON", stat: !0, forced: sp },
      {
        stringify: function (a, b, d) {
          for (var e, f = [a], g = 1; arguments.length > g; )
            f.push(arguments[g++]);
          if (((e = b), (za(b) || void 0 !== a) && !pg(a)))
            return (
              kc(b) ||
                (b = function (a, b) {
                  if (
                    ("function" == typeof e && (b = e.call(this, a, b)), !pg(b))
                  )
                    return b;
                }),
              (f[1] = b),
              wd.apply(null, f)
            );
        },
      }
    );
  }
  Xa.prototype[Fk] || sb(Xa.prototype, Fk, Xa.prototype.valueOf);
  id(Xa, "Symbol");
  Jc[Wa] = !0;
  var ia = ha.Object.getOwnPropertySymbols,
    Ra = function (a, b, d) {
      return (
        b in a
          ? hj(a, b, {
              value: d,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (a[b] = d),
        a
      );
    },
    tp = Da("Array").values,
    Ok = Array.prototype,
    up = { DOMTokenList: !0, NodeList: !0 },
    sc = function (a) {
      var b = a.values;
      return a === Ok ||
        (a instanceof Array && b === Ok.values) ||
        up.hasOwnProperty(Zd(a))
        ? tp
        : b;
    },
    vp = !uj(function (a) {
      Array.from(a);
    });
  M(
    { target: "Array", stat: !0, forced: vp },
    {
      from: function (a) {
        var b = ub(a);
        var d = "function" == typeof this ? this : Array;
        var e = arguments.length;
        var f = 1 < e ? arguments[1] : void 0,
          g = void 0 !== f,
          k = 0;
        var q = Hi(b);
        if (
          (g && (f = jc(f, 2 < e ? arguments[2] : void 0, 2)),
          null == q || (d == Array && Fi(q)))
        )
          for (d = new d((e = tb(b.length))); e > k; k++)
            nc(d, k, g ? f(b[k], k) : b[k]);
        else
          for (
            e = (b = q.call(b)).next, d = new d();
            !(q = e.call(b)).done;
            k++
          )
            nc(d, k, g ? Ii(b, f, [q.value, k], !0) : q.value);
        return (d.length = k), d;
      },
    }
  );
  var Ob = ha.Array.from;
  M(
    { target: "Date", stat: !0 },
    {
      now: function () {
        return new Date().getTime();
      },
    }
  );
  var v = ha.Date.now;
  class Ya {
    constructor() {
      this._events = {};
      this.addListener = this.on;
    }
    getListeners(a) {
      var b;
      return this._events[a]
        ? A((b = this._events[a])).call(b, (a) => a.listener)
        : [];
    }
    on(a, b) {
      this._events[a] || (this._events[a] = []);
      a = this._events[a];
      -1 === this._indexOfListener(a, b) && a.push({ listener: b, once: !1 });
    }
    once(a, b) {
      this._events[a] || (this._events[a] = []);
      a = this._events[a];
      -1 === this._indexOfListener(a, b) && a.push({ listener: b, once: !0 });
    }
    off(a, b) {
      if (this._events[a]) {
        var d = this._events[a];
        b = this._indexOfListener(d, b);
        -1 !== b && Ja(d).call(d, b, 1);
        0 === this._events[a].length && delete this._events[a];
      }
    }
    removeAllListeners(a) {
      a ? delete this._events[a] : (this._events = {});
    }
    emit(a, ...b) {
      var d;
      this._events[a] || (this._events[a] = []);
      let e = A((d = this._events[a])).call(d, (a) => a);
      for (d = 0; d < e.length; d += 1) {
        let f = e[d];
        f.once && this.off(a, f.listener);
        f.listener.apply(this, b || []);
      }
    }
    _indexOfListener(a, b) {
      let d = a.length;
      for (; d--; ) if (a[d].listener === b) return d;
      return -1;
    }
  }
  class wp extends Ya {
    constructor() {
      super(...arguments);
      this.resultStorage = new Z();
    }
    setLocalAudioStats(a, b, d) {
      this.record("AUDIO_INPUT_LEVEL_TOO_LOW", a, this.checkAudioInputLevel(d));
      this.record(
        "SEND_AUDIO_BITRATE_TOO_LOW",
        a,
        this.checkSendAudioBitrate(d)
      );
    }
    setLocalVideoStats(a, b, d) {
      this.record(
        "SEND_VIDEO_BITRATE_TOO_LOW",
        a,
        this.checkSendVideoBitrate(d)
      );
      this.record("FRAMERATE_INPUT_TOO_LOW", a, this.checkFramerateInput(d, b));
      this.record("FRAMERATE_SENT_TOO_LOW", a, this.checkFramerateSent(d));
    }
    setRemoteAudioStats(a, b) {
      a = a.getUserId();
      this.record(
        "AUDIO_OUTPUT_LEVEL_TOO_LOW",
        a,
        this.checkAudioOutputLevel(b)
      );
    }
    setRemoteVideoStats(a, b) {
      a = a.getUserId();
      this.record("RECV_VIDEO_DECODE_FAILED", a, this.checkVideoDecode(b));
    }
    record(a, b, d) {
      this.resultStorage.has(a) ||
        this.resultStorage.set(a, { result: [], isPrevNormal: !0 });
      let e = this.resultStorage.get(a);
      if (e && (e.result.push(d), 5 <= e.result.length)) {
        var f;
        d = Aa((f = e.result)).call(f, !0);
        e.isPrevNormal && !d && this.emit("exception", Pk[a], a, b);
        !e.isPrevNormal &&
          d &&
          this.emit("exception", Pk[a] + 2e3, a + "_RECOVER", b);
        e.isPrevNormal = d;
        e.result = [];
      }
    }
    checkAudioOutputLevel(a) {
      return !(0 < a.receiveBitrate && 0 === a.receiveLevel);
    }
    checkAudioInputLevel(a) {
      return 0 !== a.sendVolumeLevel;
    }
    checkFramerateInput(a, b) {
      let d = null;
      b._encoderConfig &&
        b._encoderConfig.frameRate &&
        (d = Cb(b._encoderConfig.frameRate));
      a = a.captureFrameRate;
      return !d || !a || !((10 < d && 5 > a) || (10 > d && 5 <= d && 1 >= a));
    }
    checkFramerateSent(a) {
      return !(
        a.captureFrameRate &&
        a.sendFrameRate &&
        5 < a.captureFrameRate &&
        1 >= a.sendFrameRate
      );
    }
    checkSendVideoBitrate(a) {
      return 0 !== a.sendBitrate;
    }
    checkSendAudioBitrate(a) {
      return 0 !== a.sendBitrate;
    }
    checkVideoDecode(a) {
      return 0 === a.receiveBitrate || 0 !== a.decodeFrameRate;
    }
  }
  let Pk = {
    FRAMERATE_INPUT_TOO_LOW: 1001,
    FRAMERATE_SENT_TOO_LOW: 1002,
    SEND_VIDEO_BITRATE_TOO_LOW: 1003,
    RECV_VIDEO_DECODE_FAILED: 1005,
    AUDIO_INPUT_LEVEL_TOO_LOW: 2001,
    AUDIO_OUTPUT_LEVEL_TOO_LOW: 2002,
    SEND_AUDIO_BITRATE_TOO_LOW: 2003,
  };
  class Zc {
    constructor(a) {
      this.localConnectionsMap = new Z();
      this.remoteConnectionsMap = new Z();
      this.trafficStatsPeerList = [];
      this.updateStats = () => {
        var a, d;
        r((a = this.remoteConnectionsMap)).call(a, (a) => {
          var b;
          let d = a.audioStats;
          var e = a.videoStats,
            q = a.pcStats;
          let h = Bb({}, gg),
            l = Bb({}, hg),
            n = Bb({}, yk),
            m = a.connection.pc.getStats(),
            p = m.audioRecv[0],
            r = m.videoRecv[0];
          q = q ? q.videoRecv[0] : void 0;
          let t = !0 === a.connection.pc._statsFilter.videoIsReady,
            u =
              this.trafficStats &&
              U((b = this.trafficStats.peer_delay)).call(
                b,
                (b) => b.peer_uid === a.connection.getUserId()
              );
          p &&
            (("opus" !== p.codec && "aac" !== p.codec) ||
              (h.codecType = p.codec),
            p.outputLevel
              ? (h.receiveLevel = Math.round(32767 * p.outputLevel))
              : a.connection.user.audioTrack &&
                (h.receiveLevel = Math.round(
                  32767 * a.connection.user.audioTrack.getVolumeLevel()
                )),
            (h.receiveBytes = p.bytes),
            (h.receivePackets = p.packets),
            (h.receivePacketsLost = p.packetsLost),
            (h.packetLossRate = h.receivePacketsLost / h.receivePackets),
            (h.receiveBitrate = d
              ? 8 * Math.max(0, h.receiveBytes - d.receiveBytes)
              : 0),
            (h.totalDuration = d ? d.totalDuration + 1 : 1),
            (h.totalFreezeTime = d ? d.totalFreezeTime : 0),
            (h.freezeRate = h.totalFreezeTime / h.totalDuration),
            (h.receiveDelay = p.jitterBufferMs),
            (b = a.connection.user.audioTrack),
            10 < h.totalDuration &&
              Zc.isRemoteAudioFreeze(b) &&
              (h.totalFreezeTime += 1));
          r &&
            (("H264" !== r.codec && "VP8" !== r.codec) ||
              (l.codecType = r.codec),
            (l.receiveBytes = r.bytes),
            (l.receiveBitrate = e
              ? 8 * Math.max(0, l.receiveBytes - e.receiveBytes)
              : 0),
            (l.decodeFrameRate = r.decodeFrameRate),
            (l.renderFrameRate = r.decodeFrameRate),
            r.outputFrame && (l.renderFrameRate = r.outputFrame.frameRate),
            r.receivedFrame
              ? ((l.receiveFrameRate = r.receivedFrame.frameRate),
                (l.receiveResolutionHeight = r.receivedFrame.height),
                (l.receiveResolutionWidth = r.receivedFrame.width))
              : a.connection.user.videoTrack &&
                ((l.receiveResolutionHeight =
                  a.connection.user.videoTrack._videoHeight || 0),
                (l.receiveResolutionHeight =
                  a.connection.user.videoTrack._videoWidth || 0)),
            void 0 !== r.framesRateFirefox &&
              (l.receiveFrameRate = Math.round(r.framesRateFirefox)),
            (l.receivePackets = r.packets),
            (l.receivePacketsLost = r.packetsLost),
            (l.packetLossRate = l.receivePacketsLost / l.receivePackets),
            (l.totalDuration = e ? e.totalDuration + 1 : 1),
            (l.totalFreezeTime = e ? e.totalFreezeTime : 0),
            (l.receiveDelay = r.jitterBufferMs || 0),
            (e = a.connection.user.videoTrack),
            a.connection.subscribeOptions.video &&
              t &&
              Zc.isRemoteVideoFreeze(e, r, q) &&
              (l.totalFreezeTime += 1),
            (l.freezeRate = l.totalFreezeTime / l.totalDuration));
          u &&
            ((h.end2EndDelay = u.B_ad),
            (l.end2EndDelay = u.B_vd),
            (h.transportDelay = u.B_ed),
            (l.transportDelay = u.B_ed),
            (n.uplinkNetworkQuality = u.B_punq ? u.B_punq : 0),
            (n.downlinkNetworkQuality = u.B_pdnq ? u.B_punq : 0));
          a.audioStats = h;
          a.videoStats = l;
          a.pcStats = m;
          a.networkStats = n;
          a.connection.user.audioTrack &&
            this.exceptionMonitor.setRemoteAudioStats(
              a.connection.user.audioTrack,
              h
            );
          a.connection.user.videoTrack &&
            this.exceptionMonitor.setRemoteVideoStats(
              a.connection.user.videoTrack,
              l
            );
        });
        r((d = this.localConnectionsMap)).call(d, (a) => {
          let b = a.audioStats,
            d = a.videoStats,
            e = Bb({}, te),
            h = Bb({}, ue);
          var l = a.connection.pc.getStats();
          let n = l.audioSend[0];
          l = l.videoSend[0];
          let m = a.connection.getUserId();
          n &&
            (("opus" !== n.codec && "aac" !== n.codec) ||
              (e.codecType = n.codec),
            n.inputLevel
              ? (e.sendVolumeLevel = Math.round(32767 * n.inputLevel))
              : a.connection.audioTrack &&
                (e.sendVolumeLevel = Math.round(
                  32767 * a.connection.audioTrack.getVolumeLevel()
                )),
            (e.sendBytes = n.bytes),
            (e.sendPackets = n.packets),
            (e.sendPacketsLost = n.packetsLost),
            (e.sendBitrate = b
              ? 8 * Math.max(0, e.sendBytes - b.sendBytes)
              : 0));
          l &&
            (("H264" !== l.codec && "VP8" !== l.codec) ||
              (h.codecType = l.codec),
            (h.sendBytes = l.bytes),
            (h.sendBitrate = d
              ? 8 * Math.max(0, h.sendBytes - d.sendBytes)
              : 0),
            l.inputFrame
              ? ((h.captureFrameRate = l.inputFrame.frameRate),
                (h.captureResolutionHeight = l.inputFrame.height),
                (h.captureResolutionWidth = l.inputFrame.width))
              : a.connection.videoTrack &&
                ((h.captureResolutionWidth =
                  a.connection.videoTrack._videoWidth || 0),
                (h.captureResolutionHeight =
                  a.connection.videoTrack._videoHeight || 0)),
            l.sentFrame
              ? ((h.sendFrameRate = l.sentFrame.frameRate),
                (h.sendResolutionHeight = l.sentFrame.height),
                (h.sendResolutionWidth = l.sentFrame.width))
              : a.connection.videoTrack &&
                ((h.sendResolutionWidth =
                  a.connection.videoTrack._videoWidth || 0),
                (h.sendResolutionHeight =
                  a.connection.videoTrack._videoHeight || 0)),
            l.avgEncodeMs && (h.encodeDelay = l.avgEncodeMs),
            a.connection.videoTrack &&
              a.connection.videoTrack._encoderConfig &&
              a.connection.videoTrack._encoderConfig.bitrateMax &&
              (h.targetSendBitrate =
                1e3 * a.connection.videoTrack._encoderConfig.bitrateMax),
            (h.sendPackets = l.packets),
            (h.sendPacketsLost = l.packetsLost),
            (h.totalDuration = d ? d.totalDuration + 1 : 1),
            (h.totalFreezeTime = d ? d.totalFreezeTime : 0),
            this.isLocalVideoFreeze(l) && (h.totalFreezeTime += 1));
          a.audioStats = e;
          a.videoStats = h;
          a.audioStats &&
            a.connection.audioTrack &&
            this.exceptionMonitor.setLocalAudioStats(
              m,
              a.connection.audioTrack,
              a.audioStats
            );
          a.videoStats &&
            a.connection.videoTrack &&
            this.exceptionMonitor.setLocalVideoStats(
              m,
              a.connection.videoTrack,
              a.videoStats
            );
        });
      };
      this.clientId = a;
      this.updateStatsInterval = window.setInterval(this.updateStats, 1e3);
      this.exceptionMonitor = new wp();
      this.exceptionMonitor.on("exception", (a, d, e) => {
        this.onStatsException && this.onStatsException(a, d, e);
      });
    }
    reset() {
      this.localConnectionsMap = new Z();
      this.remoteConnectionsMap = new Z();
      this.trafficStats = void 0;
      this.trafficStatsPeerList = [];
      this.uplinkStats = void 0;
    }
    getLocalAudioTrackStats(a) {
      return (a = this.localConnectionsMap.get(a)) && a.audioStats
        ? a.audioStats
        : Bb({}, te);
    }
    getLocalVideoTrackStats(a) {
      return (a = this.localConnectionsMap.get(a)) && a.videoStats
        ? a.videoStats
        : Bb({}, ue);
    }
    getRemoteAudioTrackStats(a) {
      var b;
      let d = this.remoteConnectionsMap.get(a);
      if (!d || !d.audioStats) return Bb({}, gg);
      if (!this.trafficStats) return d.audioStats;
      a = U((b = this.trafficStats.peer_delay)).call(
        b,
        (a) => a.peer_uid === d.connection.user.uid
      );
      return (
        a &&
          (d.audioStats.publishDuration =
            a.B_ppad + (v() - this.trafficStats.timestamp)),
        d.audioStats
      );
    }
    getRemoteNetworkQualityStats(a) {
      return (a = this.remoteConnectionsMap.get(a)) && a.networkStats
        ? a.networkStats
        : Bb({}, yk);
    }
    getRemoteVideoTrackStats(a) {
      var b;
      let d = this.remoteConnectionsMap.get(a);
      if (!d || !d.videoStats) return Bb({}, hg);
      if (!this.trafficStats) return d.videoStats;
      a = U((b = this.trafficStats.peer_delay)).call(
        b,
        (a) => a.peer_uid === d.connection.user.uid
      );
      return (
        a &&
          (d.videoStats.publishDuration =
            a.B_ppvd + (v() - this.trafficStats.timestamp)),
        d.videoStats
      );
    }
    getRTCStats() {
      var a, b;
      let d = 0,
        e = 0,
        f = 0,
        g = 0;
      r((a = this.localConnectionsMap)).call(a, (a) => {
        a.audioStats &&
          ((d += a.audioStats.sendBytes), (e += a.audioStats.sendBitrate));
        a.videoStats &&
          ((d += a.videoStats.sendBytes), (e += a.videoStats.sendBitrate));
      });
      r((b = this.remoteConnectionsMap)).call(b, (a) => {
        a.audioStats &&
          ((f += a.audioStats.receiveBytes),
          (g += a.audioStats.receiveBitrate));
        a.videoStats &&
          ((f += a.videoStats.receiveBytes),
          (g += a.videoStats.receiveBitrate));
      });
      a = 1;
      return (
        this.trafficStats && (a += this.trafficStats.peer_delay.length),
        {
          Duration: 0,
          UserCount: a,
          SendBitrate: e,
          SendBytes: d,
          RecvBytes: f,
          RecvBitrate: g,
          OutgoingAvailableBandwidth: this.uplinkStats
            ? this.uplinkStats.B_uab / 1e3
            : 0,
          RTT: this.trafficStats ? 2 * this.trafficStats.B_acd : 0,
        }
      );
    }
    removeConnection(a) {
      this.localConnectionsMap.delete(a);
      this.remoteConnectionsMap.delete(a);
    }
    addLocalConnection(a) {
      let b = a.connectionId;
      this.localConnectionsMap.has(b) ||
        this.localConnectionsMap.set(b, { connection: a });
    }
    addRemoteConnection(a) {
      let b = a.connectionId;
      this.remoteConnectionsMap.has(b) ||
        this.remoteConnectionsMap.set(b, { connection: a });
    }
    updateTrafficStats(a) {
      var b;
      let d = O((b = a.peer_delay)).call(b, (a) => {
        var b;
        return -1 === E((b = this.trafficStatsPeerList)).call(b, a.peer_uid);
      });
      r(d).call(d, (a) => {
        var b, d;
        let e = U((b = Ob(sc((d = this.remoteConnectionsMap)).call(d)))).call(
          b,
          (b) => b.connection._userId === a.peer_uid
        );
        void 0 !== a.B_ppad &&
          void 0 !== a.B_ppvd &&
          (this.onUploadPublishDuration &&
            this.onUploadPublishDuration(
              a.peer_uid,
              a.B_ppad,
              a.B_ppvd,
              e ? v() - e.connection.startTime : 0
            ),
          this.trafficStatsPeerList.push(a.peer_uid));
      });
      this.trafficStats = a;
    }
    updateUplinkStats(a) {
      var b;
      this.uplinkStats &&
        this.uplinkStats.B_fir !== a.B_fir &&
        h.debug(
          n((b = "[".concat(this.clientId, "]: Period fir changes to "))).call(
            b,
            a.B_fir
          )
        );
      this.uplinkStats = a;
    }
    static isRemoteVideoFreeze(a, b, d) {
      if (!a) return !1;
      a = !d || b.framesDecodeCount > d.framesDecodeCount;
      return (!!d && b.framesDecodeFreezeTime > d.framesDecodeFreezeTime) || !a;
    }
    static isRemoteAudioFreeze(a) {
      return !!a && a._isFreeze();
    }
    isLocalVideoFreeze(a) {
      return (
        !(!a.inputFrame || !a.sentFrame) &&
        5 < a.inputFrame.frameRate &&
        3 > a.sentFrame.frameRate
      );
    }
  }
  var Qk;
  let rg = () => {},
    Mh = {},
    dd = [
      [
        [100, 0.00520833333333333],
        [66.6666666666666, 0.00434027777777778],
        [66.6666666666667, 0.00173611111111111],
      ],
      [
        [233.333333333333, 0.00347222222222222],
        [266.666666666667],
        [0.00173611111111111],
        [183.333333333333, 2.17013888888889e-4],
      ],
      [
        [700, 0.001953125],
        [200, 0.001953125],
        [175, 2.44140625e-4],
      ],
      [
        [899.999999999998, 0.00173611111111111],
        [1200, 8.68055555555556e-4],
        [160, 2.60416666666667e-4],
      ],
      [
        [2666.66666666667, 8.84130658436214e-4],
        [1166.66666666667, 8.84130658436214e-4],
        [600, 4.82253e-5],
      ],
    ];
  class xp {
    constructor() {
      this.fnMap = new Z();
    }
    throttleByKey(a, b, d, e, ...f) {
      if (this.fnMap.has(b)) {
        var g = this.fnMap.get(b);
        g.threshold !== d
          ? (g.fn(...g.args),
            clearTimeout(g.timer),
            (g = window.setTimeout(() => {
              const a = this.fnMap.get(b);
              a && a.fn(...a.args);
              this.fnMap.delete(b);
            }, d)),
            this.fnMap.set(b, {
              fn: a,
              threshold: d,
              timer: g,
              args: f,
              skipFn: e,
            }))
          : (g.skipFn && g.skipFn(...g.args),
            this.fnMap.set(b, Xe({}, g, { fn: a, args: f, skipFn: e })));
      } else
        (g = window.setTimeout(() => {
          const a = this.fnMap.get(b);
          a && a.fn(...a.args);
          this.fnMap.delete(b);
        }, d)),
          this.fnMap.set(b, {
            fn: a,
            threshold: d,
            timer: g,
            args: f,
            skipFn: e,
          });
    }
  }
  let Rk = new xp(),
    Sk = Ba((Qk = Rk.throttleByKey)).call(Qk, Rk),
    Nd = null,
    yp = 1;
  class cc {
    constructor(a) {
      var b;
      this.lockingPromise = u.resolve();
      this.locks = 0;
      this.name = "";
      this.lockId = yp++;
      a && (this.name = a);
      h.debug(
        n((b = "[lock-".concat(this.name, "-"))).call(
          b,
          this.lockId,
          "] is created."
        )
      );
    }
    get isLocked() {
      return 0 < this.locks;
    }
    lock() {
      var a, b;
      let d;
      this.locks += 1;
      h.debug(
        n(
          (a = n((b = "[lock-".concat(this.name, "-"))).call(
            b,
            this.lockId,
            "] is locked, current queue "
          ))
        ).call(a, this.locks, ".")
      );
      let e = new u((a) => {
        d = () => {
          var b, d;
          --this.locks;
          h.debug(
            n(
              (b = n((d = "[lock-".concat(this.name, "-"))).call(
                d,
                this.lockId,
                "] is not locked, current queue "
              ))
            ).call(b, this.locks, ".")
          );
          a();
        };
      });
      a = this.lockingPromise.then(() => d);
      return (this.lockingPromise = this.lockingPromise.then(() => e)), a;
    }
  }
  let Ze = new cc("safari"),
    Rh = !1,
    Sh = !1;
  class zp extends Ya {
    constructor() {
      super();
      this._state = rc.IDLE;
      this.lastAccessCameraPermission =
        this.lastAccessMicrophonePermission =
        this.isAccessCameraPermission =
        this.isAccessMicrophonePermission =
          !1;
      this.deviceInfoMap = new Z();
      this.init()
        .then(() => {
          var a, b;
          navigator.mediaDevices &&
            navigator.mediaDevices.addEventListener &&
            navigator.mediaDevices.addEventListener(
              "devicechange",
              Ba((b = this.updateDevicesInfo)).call(b, this)
            );
          window.setInterval(
            Ba((a = this.updateDevicesInfo)).call(a, this),
            2500
          );
        })
        .catch((a) => h.error(a.toString()));
    }
    get state() {
      return this._state;
    }
    set state(a) {
      a !== this._state && (this.emit(Ub.STATE_CHANGE, a), (this._state = a));
    }
    async enumerateDevices(a, b, d = !1) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices)
        return new m(
          l.NOT_SUPPORTED,
          "enumerateDevices() not supported."
        ).throw();
      var e = await navigator.mediaDevices.enumerateDevices();
      e = this.checkMediaDeviceInfoIsOk(e);
      let f = !this.isAccessMicrophonePermission && a,
        g = !this.isAccessCameraPermission && b;
      e.audio && (f = !1);
      e.video && (g = !1);
      let k = (e = null),
        q = null;
      if (!d && (f || g)) {
        Ze.isLocked &&
          (h.debug("[device manager] wait GUM lock"),
          (await Ze.lock())(),
          h.debug("[device manager] GUM unlock"));
        if (
          (Rh && ((f = !1), (this.isAccessMicrophonePermission = !0)),
          Sh && ((g = !1), (this.isAccessCameraPermission = !0)),
          h.debug(
            "[device manager] check media device permissions",
            a,
            b,
            f,
            g
          ),
          f && g)
        ) {
          try {
            q = await navigator.mediaDevices.getUserMedia({
              audio: !0,
              video: !0,
            });
          } catch (la) {
            d = Od(la.name || la.code || la, la.message);
            if (d.code === l.PERMISSION_DENIED) throw d;
            h.warning("getUserMedia failed in getDevices", d);
          }
          this.isAccessMicrophonePermission = this.isAccessCameraPermission =
            !0;
        } else if (f) {
          try {
            e = await navigator.mediaDevices.getUserMedia({ audio: a });
          } catch (la) {
            d = Od(la.name || la.code || la, la.message);
            if (d.code === l.PERMISSION_DENIED) throw d;
            h.warning("getUserMedia failed in getDevices", d);
          }
          this.isAccessMicrophonePermission = !0;
        } else if (g) {
          try {
            k = await navigator.mediaDevices.getUserMedia({ video: b });
          } catch (la) {
            d = Od(la.name || la.code || la, la.message);
            if (d.code === l.PERMISSION_DENIED) throw d;
            h.warning("getUserMedia failed in getDevices", d);
          }
          this.isAccessCameraPermission = !0;
        }
        h.debug("[device manager] mic permission", a, "cam permission", b);
      }
      try {
        var n, p, t;
        let a = await navigator.mediaDevices.enumerateDevices();
        return (
          e && r((n = e.getTracks())).call(n, (a) => a.stop()),
          k && r((p = k.getTracks())).call(p, (a) => a.stop()),
          q && r((t = q.getTracks())).call(t, (a) => a.stop()),
          (e = null),
          (k = null),
          (q = null),
          a
        );
      } catch (la) {
        var x, u, Ha;
        e && r((x = e.getTracks())).call(x, (a) => a.stop());
        k && r((u = k.getTracks())).call(u, (a) => a.stop());
        q && r((Ha = q.getTracks())).call(Ha, (a) => a.stop());
        q = k = e = null;
        return new m(l.ENUMERATE_DEVICES_FAILED, la.toString()).throw();
      }
    }
    async getRecordingDevices(a = !1) {
      a = await this.enumerateDevices(!0, !1, a);
      return O(a).call(a, (a) => "audioinput" === a.kind);
    }
    async getCamerasDevices(a = !1) {
      a = await this.enumerateDevices(!1, !0, a);
      return O(a).call(a, (a) => "videoinput" === a.kind);
    }
    async getSpeakers(a = !1) {
      a = await this.enumerateDevices(!0, !1, a);
      return O(a).call(a, (a) => "audiooutput" === a.kind);
    }
    searchDeviceNameById(a) {
      return (a = this.deviceInfoMap.get(a))
        ? a.device.label || a.device.deviceId
        : null;
    }
    searchDeviceIdByName(a) {
      var b;
      let d = null;
      return (
        r((b = this.deviceInfoMap)).call(b, (b) => {
          b.device.label === a && (d = b.device.deviceId);
        }),
        d
      );
    }
    async getDeviceById(a) {
      var b = await this.enumerateDevices(!0, !0, !0);
      b = U(b).call(b, (b) => b.deviceId === a);
      if (!b) throw new m(l.DEVICE_NOT_FOUND, "deviceId: ".concat(a));
      return b;
    }
    async init() {
      this.state = rc.INITING;
      try {
        await this.updateDevicesInfo(), (this.state = rc.INITEND);
      } catch (a) {
        throw (
          ((h.warning(
            "Device Detection functionality cannot start properly.",
            a.toString()
          ),
          (this.state = rc.IDLE),
          "boolean" == typeof isSecureContext
            ? isSecureContext
            : "https:" === location.protocol ||
              "file:" === location.protocol ||
              "localhost" === location.hostname ||
              "127.0.0.1" === location.hostname ||
              "::1" === location.hostname) ||
            new m(
              l.WEB_SECURITY_RESTRICT,
              "Your context is limited by web security, please try using https protocol or localhost."
            ).throw(),
          a)
        );
      }
    }
    async updateDevicesInfo() {
      var a;
      let b = await this.enumerateDevices(!0, !0, !0),
        d = v(),
        e = [],
        f = this.checkMediaDeviceInfoIsOk(b);
      if (
        (r(b).call(b, (a) => {
          if (a.deviceId) {
            var b = this.deviceInfoMap.get(a.deviceId);
            if ("ACTIVE" !== (b ? b.state : "INACTIVE")) {
              let b = { initAt: d, updateAt: d, device: a, state: "ACTIVE" };
              this.deviceInfoMap.set(a.deviceId, b);
              e.push(b);
            }
            b && (b.updateAt = d);
          }
        }),
        r((a = this.deviceInfoMap)).call(a, (a, b) => {
          "ACTIVE" === a.state &&
            a.updateAt !== d &&
            ((a.state = "INACTIVE"), e.push(a));
        }),
        this.state !== rc.INITEND)
      )
        return (
          f.audio &&
            ((this.lastAccessMicrophonePermission = !0),
            (this.isAccessMicrophonePermission = !0)),
          void (
            f.video &&
            ((this.lastAccessCameraPermission = !0),
            (this.isAccessCameraPermission = !0))
          )
        );
      r(e).call(e, (a) => {
        switch (a.device.kind) {
          case "audioinput":
            this.lastAccessMicrophonePermission &&
              this.isAccessMicrophonePermission &&
              this.emit(Ub.RECORDING_DEVICE_CHANGED, a);
            break;
          case "videoinput":
            this.lastAccessCameraPermission &&
              this.isAccessCameraPermission &&
              this.emit(Ub.CAMERA_DEVICE_CHANGED, a);
            break;
          case "audiooutput":
            this.lastAccessMicrophonePermission &&
              this.isAccessMicrophonePermission &&
              this.emit(Ub.PLAYOUT_DEVICE_CHANGED, a);
        }
      });
      f.audio &&
        ((this.lastAccessMicrophonePermission = !0),
        (this.isAccessMicrophonePermission = !0));
      f.video &&
        ((this.lastAccessCameraPermission = !0),
        (this.isAccessCameraPermission = !0));
    }
    checkMediaDeviceInfoIsOk(a) {
      let b = O(a).call(a, (a) => "audioinput" === a.kind);
      a = O(a).call(a, (a) => "videoinput" === a.kind);
      let d = { audio: !1, video: !1 };
      for (let a of b)
        if (a.label && a.deviceId) {
          d.audio = !0;
          break;
        }
      for (let b of a)
        if (b.label && b.deviceId) {
          d.video = !0;
          break;
        }
      return d;
    }
  }
  let gb = new zp();
  var Ap = [].slice,
    Bp = /MSIE .\./.test(md),
    Tk = function (a) {
      return function (b, d) {
        var e = 2 < arguments.length,
          f = e ? Ap.call(arguments, 2) : void 0;
        return a(
          e
            ? function () {
                ("function" == typeof b ? b : Function(b)).apply(this, f);
              }
            : b,
          d
        );
      };
    };
  M(
    { global: !0, bind: !0, forced: Bp },
    { setTimeout: Tk(J.setTimeout), setInterval: Tk(J.setInterval) }
  );
  var Ec = ha.setTimeout;
  let Uh = 0,
    $e = 0,
    Uk = (a, b) => {
      b = oa.Events[a].create(b);
      return oa.Events[a].encode(b).finish();
    };
  class Cp {
    constructor() {
      var a, b;
      this.baseInfoMap = new Z();
      this.clientList = kk;
      this.keyEventUploadPendingItems = [];
      this.normalEventUploadPendingItems = [];
      this.apiInvokeUploadPendingItems = [];
      this.apiInvokeCount = 0;
      this.ltsList = [];
      this.lastSendNormalEventTime = v();
      this.customReportCount = 0;
      this.eventUploadTimer = window.setInterval(
        Ba((a = this.doSend)).call(a, this),
        w.EVENT_REPORT_SEND_INTERVAL
      );
      this.setSessionIdTimer = window.setInterval(
        Ba((b = this.appendSessionId)).call(b, this),
        w.EVENT_REPORT_SEND_INTERVAL
      );
    }
    reportApiInvoke(a, b, d) {
      b.timeout = b.timeout || 6e4;
      b.reportResult = void 0 === b.reportResult || b.reportResult;
      let e = v(),
        f = (this.apiInvokeCount += 1),
        g = () => ({
          tag: b.tag,
          invokeId: f,
          sid: a,
          name: b.name,
          apiInvokeTime: e,
          options: b.options,
        }),
        k = !!w.SHOW_REPORT_INVOKER_LOG;
      k && h.info("".concat(b.name, " start"), b.options);
      let q = !1;
      Db(b.timeout).then(() => {
        q ||
          (this.sendApiInvoke(
            wa({}, g(), { error: l.API_INVOKE_TIMEOUT, success: !1 })
          ),
          h.debug("".concat(b.name, " timeout")));
      });
      let n = new m(
        l.UNEXPECTED_ERROR,
        "".concat(b.name, ": this api invoke is end")
      );
      return {
        onSuccess: (a) => {
          let e = () => {
            if (q) throw n;
            return (
              (q = !0),
              this.sendApiInvoke(
                wa({}, g(), { success: !0 }, b.reportResult && { result: a })
              ),
              k && h.info("".concat(b.name, " onSuccess")),
              a
            );
          };
          return d ? Sk(e, b.name + "Success", d, () => (q = !0)) : e();
        },
        onError: (a) => {
          let e = () => {
            if (q) throw a;
            q = !0;
            this.sendApiInvoke(
              wa({}, g(), { success: !1, error: a.toString() })
            );
            k && h.info("".concat(b.name, " onFailure"), a.toString());
          };
          return d ? Sk(e, b.name + "Error", d, () => (q = !0)) : e();
        },
      };
    }
    sessionInit(a, b) {
      if (!this.baseInfoMap.has(a)) {
        var d = v();
        a = this.createBaseInfo(a, d);
        a.cname = b.cname;
        var e = ab(
            {},
            {
              willUploadConsoleLog: w.UPLOAD_LOG,
              areaVersion: yc ? "global" : "oversea",
              areas: w.AREAS && w.AREAS.join(","),
            },
            b.extend
          ),
          f = v();
        b = wa({}, a, {
          eventType: Ea.SESSION_INIT,
          appid: b.appid,
          browser: navigator.userAgent,
          build: "v4.2.1-0-gf505b57(2020/12/25 \u4e0a\u534810:21:56)",
          lts: f,
          elapse: f - d,
          extend: z(e),
          mode: b.mode,
          process: w.PROCESS_ID,
          success: !0,
          version: db,
        });
        this.send({ type: sa.SESSION, data: b }, !0);
      }
    }
    joinChooseServer(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ea.JOIN_CHOOSE_SERVER,
          lts: e,
          eventElapse: e - b.lts,
          chooseServerAddr: b.csAddr,
          errorCode: b.ec,
          elapse: e - a.startTime,
          success: b.succ,
          chooseServerAddrList: z(b.serverList),
          uid: b.uid ? R(b.uid) : null,
          cid: b.cid ? R(b.cid) : null,
        });
        this.send({ type: sa.JOIN_CHOOSE_SERVER, data: b }, !0);
      }
    }
    reqUserAccount(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ea.REQ_USER_ACCOUNT,
          lts: e,
          success: b.success,
          serverAddress: b.serverAddr,
          stringUid: b.stringUid,
          uid: b.uid,
          errorCode: b.errorCode,
          elapse: e - a.startTime,
          eventElapse: e - b.lts,
          extend: z(b.extend),
        });
        this.send({ type: sa.REQ_USER_ACCOUNT, data: b }, !0);
      }
    }
    joinGateway(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info;
        b.vid && (d.vid = b.vid);
        d.uid = b.uid;
        d.cid = b.cid;
        var e = v();
        d = wa({}, d, {
          eventType: Ea.JOIN_GATEWAY,
          lts: e,
          gatewayAddr: b.addr,
          success: b.succ,
          errorCode: b.ec,
          elapse: e - a.startTime,
          eventElapse: e - b.lts,
        });
        b.succ && (a.lastJoinSuccessTime = e);
        this.send({ type: sa.JOIN_GATEWAT, data: d }, !0);
      }
    }
    joinChannelTimeout(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = v();
        b = wa({}, a.info, { lts: d, timeout: b, elapse: d - a.startTime });
        this.send({ type: sa.JOIN_CHANNEL_TIMEOUT, data: b }, !0);
      }
    }
    publish(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ea.PUBLISH,
          lts: e,
          eventElapse: e - b.lts,
          elapse: e - a.startTime,
          success: b.succ,
          errorCode: b.ec,
          videoName: b.videoName,
          audioName: b.audioName,
          screenName: b.screenName,
          screenshare: b.screenshare,
          audio: b.audio,
          video: b.video,
          p2pid: b.p2pid,
          publishRequestid: b.publishRequestid,
        });
        this.send({ type: sa.PUBLISH, data: b }, !0);
      }
    }
    subscribe(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        a = wa({}, d, {
          eventType: Ea.SUBSCRIBE,
          lts: e,
          eventElapse: e - b.lts,
          elapse: e - a.startTime,
          success: b.succ,
          errorCode: b.ec,
          video: b.video,
          audio: b.audio,
          subscribeRequestid: b.subscribeRequestid,
          p2pid: b.p2pid,
        });
        "string" == typeof b.peerid
          ? (a.peerSuid = b.peerid)
          : (a.peer = b.peerid);
        this.send({ type: sa.SUBSCRIBE, data: a }, !0);
      }
    }
    firstRemoteFrame(a, b, d, e) {
      if ((a = this.baseInfoMap.get(a))) {
        var f = a.info,
          g = v();
        b = wa({}, f, {}, e, { elapse: g - a.startTime, eventType: b, lts: g });
        this.send({ type: d, data: b }, !0);
      }
    }
    onGatewayStream(a, b, d, e) {
      if ((a = this.baseInfoMap.get(a)))
        (b = wa({}, a.info, {}, e, { eventType: b, lts: v() })),
          this.send({ type: d, data: b }, !0);
    }
    streamSwitch(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ea.STREAM_SWITCH,
          lts: e,
          isDual: b.isdual,
          elapse: e - a.startTime,
          success: b.succ,
        });
        this.send({ type: sa.STREAM_SWITCH, data: b }, !0);
      }
    }
    requestProxyAppCenter(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ea.REQUEST_PROXY_APPCENTER,
          lts: e,
          eventElapse: e - b.lts,
          elapse: e - a.startTime,
          APAddr: b.APAddr,
          workerManagerList: b.workerManagerList,
          response: b.response,
          errorCode: b.ec,
          success: b.succ,
        });
        this.send({ type: sa.REQUEST_PROXY_APPCENTER, data: b }, !0);
      }
    }
    requestProxyWorkerManager(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          eventType: Ea.REQUEST_PROXY_WORKER_MANAGER,
          lts: e,
          eventElapse: e - b.lts,
          elapse: e - a.startTime,
          workerManagerAddr: b.workerManagerAddr,
          response: b.response,
          errorCode: b.ec,
          success: b.succ,
        });
        this.send({ type: sa.REQUEST_PROXY_WORKER_MANAGER, data: b }, !0);
      }
    }
    setProxyServer(a) {
      (this.proxyServer = a)
        ? h.debug("reportProxyServerurl: ".concat(a))
        : h.debug("disable reportProxyServerurl: ".concat(a));
    }
    peerPublishStatus(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {
          subscribeElapse: b.subscribeElapse,
          peer: b.peer,
          peerPublishDuration: Math.max(
            b.audioPublishDuration,
            b.videoPublishDuration
          ),
          audiotag: 0 < b.audioPublishDuration ? 1 : -1,
          videotag: 0 < b.videoPublishDuration ? 1 : -1,
          lts: e,
          elapse: e - a.startTime,
          joinChannelSuccessElapse: e - (a.lastJoinSuccessTime || e),
        });
        this.send({ type: sa.PEER_PUBLISH_STATUS, data: b }, !0);
      }
    }
    workerEvent(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = Ol(
          wa({}, d, {}, b, {
            elapse: e - a.startTime,
            lts: e,
            productType: "WebRTC",
          }),
          "payload",
          1300
        );
        r(b).call(b, (a) =>
          this.send({ type: "WorkerEvent", data: a, isPb: !0, id: 156 }, !0)
        );
      }
    }
    apworkerEvent(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {}, b, { elapse: e - a.startTime, lts: e });
        this.send({ type: "APWorkerEvent", data: b, isPb: !0, id: 160 }, !0);
      }
    }
    joinWebProxyAP(a, b) {
      if ((a = this.baseInfoMap.get(a))) {
        var d = a.info,
          e = v();
        b = wa({}, d, {}, b, { elapse: e - a.startTime, lts: e });
        this.send({ type: "JoinWebProxyAP", data: b, isPb: !0, id: 700 }, !0);
      }
    }
    async sendCustomReportMessage(a, b) {
      if (
        ((this.customReportCount += b.length),
        this.customReportCount > w.CUSTOM_REPORT_LIMIT)
      )
        throw new m(l.CUSTOM_REPORT_FREQUENCY_TOO_HIGH);
      this.customReportCounterTimer ||
        (this.customReportCounterTimer = window.setInterval(() => {
          this.customReportCount = 0;
        }, 5e3));
      b = A(b).call(b, (b) => ({
        type: sa.USER_ANALYTICS,
        data: wa({ sid: a }, b),
      }));
      b = {
        msgType: "EventMessages",
        sentTs: Math.round(v() / 1e3),
        payloads: A(b).call(b, (a) => z(a)),
      };
      try {
        await this.postDataToStatsCollector(b);
      } catch (d) {
        throw (
          (h.error("send custom report message failed", d.toString()),
          new m(l.CUSTOM_REPORT_SEND_FAILED, d.message))
        );
      }
    }
    sendApiInvoke(a) {
      var b = w.NOT_REPORT_EVENT;
      if (a.tag && Aa(b) && Aa(b).call(b, a.tag)) return !1;
      if (null === a.sid) return this.apiInvokeUploadPendingItems.push(a), !1;
      b = this.baseInfoMap.get(a.sid);
      if (!b) return this.apiInvokeUploadPendingItems.push(a), !1;
      let { cname: d, uid: e, cid: f } = b.info;
      a.lts = a.lts || v();
      a = {
        invokeId: a.invokeId,
        sid: a.sid,
        cname: d,
        cid: f,
        uid: e,
        lts: a.lts,
        success: a.success,
        elapse: a.lts - b.startTime,
        execElapse: a.lts - a.apiInvokeTime,
        apiName: a.name,
        options: a.options ? z(a.options) : void 0,
        execStates: a.states ? z(a.states) : void 0,
        execResult: a.result ? z(a.result) : void 0,
        errorCode: a.error ? z(a.error) : void 0,
      };
      return this.send({ type: sa.API_INVOKE, data: a }, !1), !0;
    }
    appendSessionId() {
      var a;
      r((a = this.clientList)).call(a, (a) => {
        if (a._sessionId) {
          let b = this.apiInvokeUploadPendingItems.length;
          for (let d = 0; d < b; d++) {
            let b = this.apiInvokeUploadPendingItems.shift();
            b && ((b.sid = a._sessionId), this.sendApiInvoke(ab({}, b)));
          }
        }
      });
    }
    send(a, b) {
      if (b)
        return (
          this.keyEventUploadPendingItems.push(a),
          void this.sendItems(this.keyEventUploadPendingItems, !0)
        );
      var d;
      (this.normalEventUploadPendingItems.push(a),
      this.normalEventUploadPendingItems.length >
        w.NORMAL_EVENT_QUEUE_CAPACITY) &&
        Ja((d = this.normalEventUploadPendingItems)).call(d, 0, 1);
      10 <= this.normalEventUploadPendingItems.length &&
        this.sendItems(this.normalEventUploadPendingItems, !1);
    }
    doSend() {
      0 < this.keyEventUploadPendingItems.length &&
        this.sendItems(this.keyEventUploadPendingItems, !0);
      0 < this.normalEventUploadPendingItems.length &&
        5e3 <= v() - this.lastSendNormalEventTime &&
        this.sendItems(this.normalEventUploadPendingItems, !1);
    }
    sendItems(a, b) {
      let d = [],
        e = [];
      for (var f = []; a.length; ) {
        let b = a.shift();
        hp(b)
          ? 20 > e.length
            ? e.push(b)
            : f.push(b)
          : 20 > d.length
          ? d.push(b)
          : f.push(b);
      }
      a.push(...f);
      for (let a of [...d, ...e]) {
        var g, k;
        -1 !== E((g = this.ltsList)).call(g, a.data.lts)
          ? ((a.data.lts = this.ltsList[this.ltsList.length - 1] + 1),
            this.ltsList.push(a.data.lts))
          : (this.ltsList.push(a.data.lts),
            sd((k = this.ltsList)).call(k, (a, b) => a - b));
      }
      b || (this.lastSendNormalEventTime = v());
      f = {
        msgType: "EventMessages",
        sentTs: Math.round(v() / 1e3),
        payloads: A(d).call(d, (a) => z(a)),
      };
      g = Uk("ProtoRaws", {
        sentTs: Math.round(v() / 1e3),
        payloads: A(e).call(e, (a) => ({ id: a.id, msg: Uk(a.type, a.data) })),
      });
      k = (a) => (d) => {
        var e, f, g;
        b
          ? (this.keyEventUploadPendingItems = n(
              (e = this.keyEventUploadPendingItems)
            ).call(e, a))
          : ((this.normalEventUploadPendingItems = n(
              (f = this.normalEventUploadPendingItems)
            ).call(f, a)),
            this.normalEventUploadPendingItems.length >
              w.NORMAL_EVENT_QUEUE_CAPACITY &&
              (Ja((g = this.normalEventUploadPendingItems)).call(
                g,
                0,
                this.normalEventUploadPendingItems.length -
                  w.NORMAL_EVENT_QUEUE_CAPACITY
              ),
              h.warning("report: drop normal events")));
      };
      return (
        e.length && this.postDataToStatsCollector(g, !0).catch(k(e)),
        d.length && this.postDataToStatsCollector(f).catch(k(d)),
        a
      );
    }
    async postDataToStatsCollector(a, b = !1) {
      var d, e, f;
      let g = b ? "/events/proto-raws" : "/events/messages",
        k =
          this.url ||
          (this.proxyServer
            ? n(
                (d = n(
                  (e = "https://".concat(this.proxyServer, "/rs/?h="))
                ).call(e, w.EVENT_REPORT_DOMAIN, "&p=6443&d="))
              ).call(d, g)
            : n((f = "https://".concat(w.EVENT_REPORT_DOMAIN, ":6443"))).call(
                f,
                g
              ));
      for (d = 0; 2 > d; d += 1) {
        var h, l, m;
        1 === d &&
          (k =
            this.backupUrl ||
            (this.proxyServer
              ? n(
                  (h = n(
                    (l = "https://".concat(this.proxyServer, "/rs/?h="))
                  ).call(l, w.EVENT_REPORT_BACKUP_DOMAIN, "&p=6443&d="))
                ).call(h, g)
              : n(
                  (m = "https://".concat(w.EVENT_REPORT_BACKUP_DOMAIN, ":6443"))
                ).call(m, g)));
        try {
          b
            ? await Yl(k, { timeout: 1e4, data: a })
            : await Nb(k, { timeout: 1e4, data: a });
        } catch (Ia) {
          if (1 === d) throw Ia;
          continue;
        }
        break;
      }
    }
    createBaseInfo(a, b) {
      let d = ab({}, gp);
      return (d.sid = a), this.baseInfoMap.set(a, { info: d, startTime: b }), d;
    }
  }
  let t = new Cp(),
    Zl = {
      [Bc.ACCESS_POINT]: {
        [Fa.NO_FLAG_SET]: { desc: "flag is zero", retry: !1 },
        [Fa.FLAG_SET_BUT_EMPTY]: { desc: "flag is empty", retry: !1 },
        [Fa.INVALID_FALG_SET]: { desc: "invalid flag", retry: !1 },
        [Fa.NO_SERVICE_AVAILABLE]: { desc: "no service available", retry: !0 },
        [Fa.NO_SERVICE_AVAILABLE_P2P]: {
          desc: "no unilbs p2p service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_VOET]: {
          desc: "no unilbs voice service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_WEBRTC]: {
          desc: "no unilbs webrtc service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_CDS]: {
          desc: "no cds service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_CDN]: {
          desc: "no cdn dispatcher service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_TDS]: {
          desc: "no tds service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_REPORT]: {
          desc: "no unilbs report service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_APP_CENTER]: {
          desc: "no app center service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_ENV0]: {
          desc: "no unilbs sig env0 service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_VOET]: {
          desc: "no unilbs voet service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_STRING_UID]: {
          desc: "no string uid service available",
          retry: !0,
        },
        [Fa.NO_SERVICE_AVAILABLE_WEBRTC_UNILBS]: {
          desc: "no webrtc unilbs service available",
          retry: !0,
        },
      },
      [Bc.UNILBS]: {
        [Va.INVALID_VENDOR_KEY]: {
          desc: "invalid vendor key, can not find appid",
          retry: !1,
        },
        [Va.INVALID_CHANNEL_NAME]: { desc: "invalid channel name", retry: !1 },
        [Va.INTERNAL_ERROR]: { desc: "unilbs internal error", retry: !1 },
        [Va.NO_AUTHORIZED]: {
          desc: "invalid token, authorized failed",
          retry: !1,
        },
        [Va.DYNAMIC_KEY_TIMEOUT]: {
          desc: "dynamic key or token timeout",
          retry: !1,
        },
        [Va.NO_ACTIVE_STATUS]: { desc: "no active status", retry: !1 },
        [Va.DYNAMIC_KEY_EXPIRED]: { desc: "dynamic key expired", retry: !1 },
        [Va.STATIC_USE_DYNAMIC_KEY]: {
          desc: "static use dynamic key",
          retry: !1,
        },
        [Va.DYNAMIC_USE_STATIC_KEY]: {
          desc: "dynamic use static key",
          retry: !1,
        },
        [Va.USER_OVERLOAD]: { desc: "amount of users over load", retry: !1 },
        [Va.FORBIDDEN_REGION]: {
          desc: "the request is forbidden in this area",
          retry: !1,
        },
        [Va.CANNOT_MEET_AREA_DEMAND]: {
          desc: "unable to allocate services in this area",
          retry: !1,
        },
      },
      [Bc.STRING_UID_ALLOCATOR]: {
        [ud.IIIEGAL_APPID]: { desc: "invalid appid", retry: !1 },
        [ud.IIIEGAL_UID]: { desc: "invalid string uid", retry: !1 },
        [ud.INTERNAL_ERROR]: {
          desc: "string uid allocator internal error",
          retry: !0,
        },
      },
    },
    $l = {
      [C.K_TIMESTAMP_EXPIRED]: {
        desc: "K_TIMESTAMP_EXPIRED",
        action: "failed",
      },
      [C.K_CHANNEL_PERMISSION_INVALID]: {
        desc: "K_CHANNEL_PERMISSION_INVALID",
        action: "failed",
      },
      [C.K_CERTIFICATE_INVALID]: {
        desc: "K_CERTIFICATE_INVALID",
        action: "failed",
      },
      [C.K_CHANNEL_NAME_EMPTY]: {
        desc: "K_CHANNEL_NAME_EMPTY",
        action: "failed",
      },
      [C.K_CHANNEL_NOT_FOUND]: {
        desc: "K_CHANNEL_NOT_FOUND",
        action: "failed",
      },
      [C.K_TICKET_INVALID]: { desc: "K_TICKET_INVALID", action: "failed" },
      [C.K_CHANNEL_CONFLICTED]: {
        desc: "K_CHANNEL_CONFLICTED",
        action: "failed",
      },
      [C.K_SERVICE_NOT_READY]: {
        desc: "K_SERVICE_NOT_READY",
        action: "recover",
      },
      [C.K_SERVICE_TOO_HEAVY]: {
        desc: "K_SERVICE_TOO_HEAVY",
        action: "tryNext",
      },
      [C.K_UID_BANNED]: { desc: "K_UID_BANNED", action: "failed" },
      [C.K_IP_BANNED]: { desc: "K_IP_BANNED", action: "failed" },
      [C.ERR_INVALID_VENDOR_KEY]: {
        desc: "ERR_INVALID_VENDOR_KEY",
        action: "failed",
      },
      [C.ERR_INVALID_CHANNEL_NAME]: {
        desc: "ERR_INVALID_CHANNEL_NAME",
        action: "failed",
      },
      [C.WARN_NO_AVAILABLE_CHANNEL]: {
        desc: "WARN_NO_AVAILABLE_CHANNEL",
        action: "failed",
      },
      [C.WARN_LOOKUP_CHANNEL_TIMEOUT]: {
        desc: "WARN_LOOKUP_CHANNEL_TIMEOUT",
        action: "tryNext",
      },
      [C.WARN_LOOKUP_CHANNEL_REJECTED]: {
        desc: "WARN_LOOKUP_CHANNEL_REJECTED",
        action: "failed",
      },
      [C.WARN_OPEN_CHANNEL_TIMEOUT]: {
        desc: "WARN_OPEN_CHANNEL_TIMEOUT",
        action: "tryNext",
      },
      [C.WARN_OPEN_CHANNEL_REJECTED]: {
        desc: "WARN_OPEN_CHANNEL_REJECTED",
        action: "failed",
      },
      [C.WARN_REQUEST_DEFERRED]: {
        desc: "WARN_REQUEST_DEFERRED",
        action: "failed",
      },
      [C.ERR_DYNAMIC_KEY_TIMEOUT]: {
        desc: "ERR_DYNAMIC_KEY_TIMEOUT",
        action: "failed",
      },
      [C.ERR_NO_AUTHORIZED]: { desc: "ERR_NO_AUTHORIZED", action: "failed" },
      [C.ERR_VOM_SERVICE_UNAVAILABLE]: {
        desc: "ERR_VOM_SERVICE_UNAVAILABLE",
        action: "tryNext",
      },
      [C.ERR_NO_CHANNEL_AVAILABLE_CODE]: {
        desc: "ERR_NO_CHANNEL_AVAILABLE_CODE",
        action: "failed",
      },
      [C.ERR_MASTER_VOCS_UNAVAILABLE]: {
        desc: "ERR_MASTER_VOCS_UNAVAILABLE",
        action: "tryNext",
      },
      [C.ERR_INTERNAL_ERROR]: { desc: "ERR_INTERNAL_ERROR", action: "tryNext" },
      [C.ERR_NO_ACTIVE_STATUS]: {
        desc: "ERR_NO_ACTIVE_STATUS",
        action: "failed",
      },
      [C.ERR_INVALID_UID]: { desc: "ERR_INVALID_UID", action: "failed" },
      [C.ERR_DYNAMIC_KEY_EXPIRED]: {
        desc: "ERR_DYNAMIC_KEY_EXPIRED",
        action: "failed",
      },
      [C.ERR_STATIC_USE_DYANMIC_KE]: {
        desc: "ERR_STATIC_USE_DYANMIC_KE",
        action: "failed",
      },
      [C.ERR_DYNAMIC_USE_STATIC_KE]: {
        desc: "ERR_DYNAMIC_USE_STATIC_KE",
        action: "failed",
      },
      [C.ERR_NO_VOCS_AVAILABLE]: {
        desc: "ERR_NO_VOCS_AVAILABLE",
        action: "tryNext",
      },
      [C.ERR_NO_VOS_AVAILABLE]: {
        desc: "ERR_NO_VOS_AVAILABLE",
        action: "tryNext",
      },
      [C.ERR_JOIN_CHANNEL_TIMEOUT]: {
        desc: "ERR_JOIN_CHANNEL_TIMEOUT",
        action: "tryNext",
      },
      [C.ERR_JOIN_BY_MULTI_IP]: {
        desc: "ERR_JOIN_BY_MULTI_IP",
        action: "recover",
      },
      [C.ERR_NOT_JOINED]: { desc: "ERR_NOT_JOINED", action: "failed" },
      [C.ERR_REPEAT_JOIN_REQUEST]: {
        desc: "ERR_REPEAT_JOIN_REQUEST",
        action: "quit",
      },
      [C.ERR_REPEAT_JOIN_CHANNEL]: {
        desc: "ERR_REPEAT_JOIN_CHANNEL",
        action: "quit",
      },
      [C.ERR_INVALID_VENDOR_KEY]: {
        desc: "ERR_INVALID_VENDOR_KEY",
        action: "failed",
      },
      [C.ERR_INVALID_CHANNEL_NAME]: {
        desc: "ERR_INVALID_CHANNEL_NAME",
        action: "failed",
      },
      [C.ERR_INVALID_STRINGUID]: {
        desc: "ERR_INVALID_STRINGUID",
        action: "failed",
      },
      [C.ERR_TOO_MANY_USERS]: { desc: "ERR_TOO_MANY_USERS", action: "tryNext" },
      [C.ERR_SET_CLIENT_ROLE_TIMEOUT]: {
        desc: "ERR_SET_CLIENT_ROLE_TIMEOUT",
        action: "failed",
      },
      [C.ERR_SET_CLIENT_ROLE_NO_PERMISSION]: {
        desc: "ERR_SET_CLIENT_ROLE_TIMEOUT",
        action: "failed",
      },
      [C.ERR_SET_CLIENT_ROLE_ALREADY_IN_USE]: {
        desc: "ERR_SET_CLIENT_ROLE_ALREADY_IN_USE",
        action: "success",
      },
      [C.ERR_PUBLISH_REQUEST_INVALID]: {
        desc: "ERR_PUBLISH_REQUEST_INVALID",
        action: "failed",
      },
      [C.ERR_SUBSCRIBE_REQUEST_INVALID]: {
        desc: "ERR_SUBSCRIBE_REQUEST_INVALID",
        action: "failed",
      },
      [C.ERR_NOT_SUPPORTED_MESSAGE]: {
        desc: "ERR_NOT_SUPPORTED_MESSAGE",
        action: "failed",
      },
      [C.ERR_ILLEAGAL_PLUGIN]: {
        desc: "ERR_ILLEAGAL_PLUGIN",
        action: "failed",
      },
      [C.ERR_REJOIN_TOKEN_INVALID]: {
        desc: "ERR_REJOIN_TOKEN_INVALID",
        action: "failed",
      },
      [C.ERR_REJOIN_USER_NOT_JOINED]: {
        desc: "ERR_REJOIN_NOT_JOINED",
        action: "failed",
      },
      [C.ERR_INVALID_OPTIONAL_INFO]: {
        desc: "ERR_INVALID_OPTIONAL_INFO",
        action: "quit",
      },
      [C.ERR_TEST_RECOVER]: { desc: "ERR_TEST_RECOVER", action: "recover" },
      [C.ERR_TEST_TRYNEXT]: { desc: "ERR_TEST_TRYNEXT", action: "recover" },
      [C.ERR_TEST_RETRY]: { desc: "ERR_TEST_RETRY", action: "recover" },
      [C.ILLEGAL_AES_PASSWORD]: { desc: "ERR_TEST_RETRY", action: "failed" },
    },
    Pa = {
      timeout: 500,
      timeoutFactor: 1.5,
      maxRetryCount: 1 / 0,
      maxRetryTimeout: 1e4,
    };
  class sg extends Ya {
    constructor(a, b) {
      super();
      this.currentURLIndex = this.connectionID = 0;
      this.reconnectMode = "tryNext";
      this._state = "closed";
      this.reconnectCount = 0;
      this.name = a;
      this.retryConfig = b;
    }
    get url() {
      return this.websocket ? this.websocket.url : null;
    }
    get state() {
      return this._state;
    }
    set state(a) {
      a !== this._state &&
        ((this._state = a),
        "reconnecting" === this._state
          ? this.emit(T.RECONNECTING, this.reconnectMode)
          : "connected" === this._state
          ? this.emit(T.CONNECTED)
          : "closed" === this._state
          ? this.emit(T.CLOSED)
          : "failed" === this._state && this.emit(T.FAILED));
    }
    init(a) {
      return new u((b, d) => {
        this.urls = a;
        let e = this.urls[this.currentURLIndex];
        this.state = "connecting";
        this.createWebSocketConnection(e).then(b).catch(d);
        this.once(T.CLOSED, () => d(new m(l.WS_DISCONNECT)));
        this.once(T.CONNECTED, () => b());
      });
    }
    close(a, b) {
      if (
        ((this.currentURLIndex = 0), (this.reconnectCount = 0), this.websocket)
      ) {
        this.websocket.onclose = null;
        this.websocket.onopen = null;
        this.websocket.onmessage = null;
        let a = this.websocket;
        b ? Ec(() => a.close(), 500) : a.close();
        this.websocket = void 0;
      }
      this.state = a ? "failed" : "closed";
    }
    reconnect(a, b) {
      if (!this.websocket)
        return void h.warning(
          "[".concat(this.name, "] can not reconnect, no websocket")
        );
      void 0 !== a && (this.reconnectMode = a);
      h.debug("[".concat(this.name, "] reconnect is triggered initiative"));
      a = this.websocket.onclose;
      this.websocket.onclose = null;
      this.websocket.close();
      a && Ba(a).call(a, this.websocket)({ code: 9999, reason: b });
    }
    sendMessage(a) {
      if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN)
        throw new m(l.WS_ABORT, "websocket is not ready");
      a = z(a);
      try {
        this.websocket.send(a);
      } catch (b) {
        throw new m(l.WS_ERR, "send websocket message error" + b.toString());
      }
    }
    async createWebSocketConnection(a) {
      let b = (this.connectionID += 1);
      return new u((d, e) => {
        var f, g;
        this.websocket &&
          ((this.websocket.onclose = null), this.websocket.close());
        w.GATEWAY_WSS_ADDRESS &&
          Cd((f = this.name)).call(f, "gateway") &&
          (a = w.GATEWAY_WSS_ADDRESS);
        h.debug(
          n((g = "[".concat(this.name, "] start connect, url: "))).call(g, a)
        );
        try {
          (this.websocket = new WebSocket(a)),
            (this.websocket.binaryType = "arraybuffer");
        } catch (q) {
          var k;
          f = new m(
            l.WS_ERR,
            "init websocket failed! Error: ".concat(q.toString())
          );
          return (
            h.error(n((k = "[".concat(this.name, "]"))).call(k, f)), void e(f)
          );
        }
        Db(5e3).then(() => {
          b === this.connectionID &&
            this.websocket &&
            this.websocket.readyState !== WebSocket.OPEN &&
            this.websocket &&
            this.websocket.close();
        });
        this.websocket.onopen = () => {
          h.debug("[".concat(this.name, "] websocket opened:"), a);
          this.reconnectMode = "retry";
          this.state = "connected";
          this.reconnectCount = 0;
          d();
        };
        this.websocket.onclose = async (a) => {
          var b, f, g, k;
          if (
            (h.debug(
              n(
                (b = n(
                  (f = n(
                    (g = n(
                      (k = "[".concat(this.name, "] websocket close "))
                    ).call(k, this.websocket && this.websocket.url, ", code: "))
                  ).call(g, a.code, ", reason: "))
                ).call(f, a.reason, ", current mode: "))
              ).call(b, this.reconnectMode)
            ),
            this.reconnectCount < this.retryConfig.maxRetryCount)
          ) {
            "connected" === this.state && (this.state = "reconnecting");
            b =
              gc(this, T.WILL_RECONNECT, this.reconnectMode) ||
              this.reconnectMode;
            b = await this.reconnectWithAction(b);
            if ("closed" === this.state)
              return void h.debug(
                "[".concat(
                  this.connectionID,
                  "] ws is closed, no need to reconnect"
                )
              );
            if (!b)
              return (
                e(
                  new m(
                    l.WS_DISCONNECT,
                    "websocket reconnect failed: ".concat(a.code)
                  )
                ),
                void this.close(!0)
              );
            d();
          } else
            e(new m(l.WS_DISCONNECT, "websocket close: ".concat(a.code))),
              this.close();
        };
        this.websocket.onmessage = (a) => {
          this.emit(T.ON_MESSAGE, a);
        };
      });
    }
    async reconnectWithAction(a, b) {
      var d, e;
      if (
        (!b && this.reconnectCount >= this.retryConfig.maxRetryCount) ||
        !this.urls ||
        "closed" === this.state
      )
        return !1;
      this.onlineReconnectListener ||
        !navigator ||
        void 0 === navigator.onLine ||
        navigator.onLine ||
        (this.onlineReconnectListener = new u((a) => {
          let b = () => {
            this.onlineReconnectListener = void 0;
            window.removeEventListener("online", b);
            a();
          };
          window.addEventListener("online", b);
        }));
      b = am(this.reconnectCount, this.retryConfig);
      if (
        (h.debug(
          n(
            (d = n((e = "[".concat(this.name, "] wait "))).call(
              e,
              b,
              "ms to reconnect websocket, mode: "
            ))
          ).call(d, a)
        ),
        await u.race([Db(b), this.onlineReconnectListener || new u(() => {})]),
        "closed" === this.state)
      )
        return !1;
      this.reconnectCount += 1;
      try {
        if ("retry" === a)
          await this.createWebSocketConnection(this.urls[this.currentURLIndex]);
        else if ("tryNext" === a) {
          var f, g;
          if (
            ((this.currentURLIndex += 1),
            this.currentURLIndex >= this.urls.length)
          )
            return await this.reconnectWithAction("recover");
          h.debug(
            n(
              (f = n(
                (g = "[".concat(this.name, "] websocket url length: "))
              ).call(g, this.urls.length, " current index: "))
            ).call(f, this.currentURLIndex)
          );
          await this.createWebSocketConnection(this.urls[this.currentURLIndex]);
        } else
          "recover" === a &&
            (h.debug("[".concat(this.name, "] request new urls")),
            (this.urls = await Ma(this, T.REQUEST_NEW_URLS)),
            (this.currentURLIndex = 0),
            await this.createWebSocketConnection(
              this.urls[this.currentURLIndex]
            ));
        return !0;
      } catch (k) {
        return (
          h.error("[".concat(this.name, "] reconnect failed"), k.toString()),
          await this.reconnectWithAction(a)
        );
      }
    }
  }
  class Dp {
    constructor(a) {
      this.input = [];
      this.size = a;
    }
    add(a) {
      var b;
      (this.input.push(a), this.input.length > this.size) &&
        Ja((b = this.input)).call(b, 0, 1);
    }
    mean() {
      var a;
      return 0 === this.input.length
        ? 0
        : Ae((a = this.input)).call(a, (a, d) => a + d) / this.input.length;
    }
  }
  class Ep extends Ya {
    constructor(a) {
      super();
      this._connectionState = ta.CLOSED;
      this.openConnectionTime = v();
      this.lastMsgTime = v();
      this.uploadCache = [];
      this.rttRolling = new Dp(5);
      this.pingpongTimeoutCount = 0;
      this.onWebsocketMessage = (a) => {
        if (a.data instanceof ArrayBuffer)
          return void this.emit(N.ON_BINARY_DATA, a.data);
        a = JSON.parse(a.data);
        if (((this.lastMsgTime = v()), a.hasOwnProperty("_id"))) {
          let b = "res-@".concat(a._id);
          this.emit(b, a._result, a._message);
        } else if (
          a.hasOwnProperty("_type") &&
          (this.emit(a._type, a._message),
          a._type === Y.ON_NOTIFICATION && this.handleNotification(a._message),
          a._type === Y.ON_USER_BANNED)
        )
          switch (a._message.error_code) {
            case 14:
              this.close("UID_BANNED");
              break;
            case 15:
              this.close("IP_BANNED");
              break;
            case 16:
              this.close("CHANNEL_BANNED");
          }
      };
      this.clientId = a.clientId;
      this.spec = a;
      this.websocket = new sg(
        "gateway-".concat(this.clientId),
        this.spec.retryConfig
      );
      this.handleWebsocketEvents();
      window.addEventListener("offline", () => {
        this.connectionState === ta.CONNECTED &&
          this.reconnect("retry", "offline");
      });
    }
    get connectionState() {
      return this._connectionState;
    }
    set connectionState(a) {
      a !== this._connectionState &&
        ((this._connectionState = a),
        a === ta.CONNECTED
          ? this.emit(N.WS_CONNECTED)
          : a === ta.RECONNECTING
          ? this.emit(N.WS_RECONNECTING)
          : a === ta.CLOSED &&
            this.emit(N.WS_CLOSED, this._disconnectedReason));
    }
    get url() {
      return this.websocket ? this.websocket.url : null;
    }
    get rtt() {
      return this.rttRolling.mean();
    }
    async request(a, b, d) {
      var e, f, g, k, q;
      let p = pa(6, "");
      var r = { _id: p, _type: a, _message: b };
      let t = this.websocket.connectionID;
      var x = () =>
        new u((a, b) => {
          if (this.connectionState === ta.CONNECTED) return a();
          const d = () => {
              this.off(N.WS_CLOSED, e);
              a();
            },
            e = () => {
              this.off(N.WS_CONNECTED, d);
              b(new m(l.WS_ABORT));
            };
          this.once(N.WS_CONNECTED, d);
          this.once(N.WS_CLOSED, e);
        });
      (this.connectionState !== ta.CONNECTING &&
        this.connectionState !== ta.RECONNECTING) ||
        a === ca.JOIN ||
        a === ca.REJOIN ||
        (await x());
      var v = new u((d, e) => {
        let f = !1;
        const g = (e, g) => {
          f = !0;
          d({ isSuccess: "success" === e, message: g || {} });
          this.off(N.WS_CLOSED, k);
          this.off(N.WS_RECONNECTING, k);
          this.emit(N.REQUEST_SUCCESS, a, b);
        };
        this.once("res-@".concat(p), g);
        const k = () => {
          e(new m(l.WS_ABORT, "type: ".concat(a)));
          this.off(N.WS_CLOSED, k);
          this.off(N.WS_RECONNECTING, k);
          this.off("res-@".concat(p), g);
        };
        this.once(N.WS_CLOSED, k);
        this.once(N.WS_RECONNECTING, k);
        Db(w.SIGNAL_REQUEST_TIMEOUT).then(() => {
          this.websocket.connectionID !== t ||
            f ||
            (h.warning("ws request timeout, type: ".concat(a)),
            this.emit(N.REQUEST_TIMEOUT, a, b));
        });
      });
      this.websocket.sendMessage(r);
      r = null;
      try {
        r = await v;
      } catch (Ha) {
        if (this.connectionState === ta.CLOSED || a === ca.LEAVE)
          throw new m(l.WS_ABORT);
        return !this.spec.forceWaitGatewayResponse || d
          ? Ha.throw()
          : a === ca.JOIN || a === ca.REJOIN
          ? null
          : (await x(), await this.request(a, b));
      }
      if (r.isSuccess) return r.message;
      d = Number(r.message.error_code || r.message.code);
      x = Wh(d);
      v = new m(
        l.UNEXPECTED_RESPONSE,
        n((e = "".concat(x.desc, ": "))).call(e, r.message.error_str),
        { code: d, data: r.message }
      );
      return "success" === x.action
        ? r.message
        : (h.warning(
            n(
              (f = n(
                (g = n(
                  (k = n(
                    (q = "[".concat(
                      this.websocket.connectionID,
                      "] unexpected response from type "
                    ))
                  ).call(q, a, ", error_code: "))
                ).call(k, d, ", message: "))
              ).call(g, x.desc, ", action: "))
            ).call(f, x.action)
          ),
          "failed" === x.action
            ? v.throw()
            : "quit" === x.action
            ? ((this.initError = v), this.close(), v.throw())
            : (d === C.ERR_JOIN_BY_MULTI_IP
                ? ((this.multiIpOption = r.message.option),
                  h.warning(
                    "[".concat(this.clientId, "] detect multi ip, recover")
                  ),
                  this.reconnect("recover"))
                : this.reconnect(x.action),
              a === ca.JOIN || a === ca.REJOIN
                ? null
                : await this.request(a, b)));
    }
    waitMessage(a, b) {
      return new u((d) => {
        let e = (f) => {
          (b && !b(f)) || (this.off(a, e), d(f));
        };
        this.on(a, e);
      });
    }
    upload(a, b) {
      a = { _type: a, _message: b };
      try {
        this.websocket.sendMessage(a);
      } catch (e) {
        b = w.MAX_UPLOAD_CACHE || 50;
        var d;
        (this.uploadCache.push(a), this.uploadCache.length > b) &&
          Ja((d = this.uploadCache)).call(d, 0, 1);
        0 < this.uploadCache.length &&
          !this.uploadCacheInterval &&
          (this.uploadCacheInterval = window.setInterval(() => {
            var a;
            if (this.connectionState === ta.CONNECTED) {
              var b = Ja((a = this.uploadCache)).call(a, 0, 1)[0];
              0 === this.uploadCache.length &&
                (window.clearInterval(this.uploadCacheInterval),
                (this.uploadCacheInterval = void 0));
              this.upload(b._type, b._message);
            }
          }, w.UPLOAD_CACHE_INTERVAL || 2e3));
      }
    }
    send(a, b) {
      this.websocket.sendMessage({ _type: a, _message: b });
    }
    init(a) {
      return (
        (this.initError = void 0),
        (this.multiIpOption = void 0),
        (this.joinResponse = void 0),
        (this.reconnectToken = void 0),
        new u((b, d) => {
          this.once(N.WS_CONNECTED, () => b(this.joinResponse));
          this.once(N.WS_CLOSED, () => d(this.initError || new m(l.WS_ABORT)));
          this.connectionState = ta.CONNECTING;
          this.websocket.init(a).catch(d);
        })
      );
    }
    close(a) {
      this.pingpongTimer &&
        ((this.pingpongTimeoutCount = 0),
        window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = void 0));
      this.joinResponse = this.reconnectToken = void 0;
      this._disconnectedReason = a || "LEAVE";
      this.connectionState = ta.CLOSED;
      this.websocket.close();
    }
    async join() {
      var a;
      if (!this.joinResponse) {
        var b = ad(this, N.REQUEST_JOIN_INFO);
        b = await this.request(ca.JOIN, b);
        if (!b)
          return (
            this.emit(N.REPORT_JOIN_GATEWAY, l.TIMEOUT, this.url || ""), !1
          );
        this.joinResponse = b;
        this.reconnectToken = this.joinResponse.rejoin_token;
      }
      return (
        (this.connectionState = ta.CONNECTED),
        this.pingpongTimer && window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = window.setInterval(
          Ba((a = this.handlePingPong)).call(a, this),
          3e3
        )),
        !0
      );
    }
    async rejoin() {
      var a, b;
      if (!this.reconnectToken)
        throw new m(l.UNEXPECTED_ERROR, "can not rejoin, no rejoin token");
      var d = ad(this, N.REQUEST_REJOIN_INFO);
      d.token = this.reconnectToken;
      d = await this.request(ca.REJOIN, d);
      return (
        !!d &&
        ((this.connectionState = ta.CONNECTED),
        this.pingpongTimer && window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = window.setInterval(
          Ba((a = this.handlePingPong)).call(a, this),
          3e3
        )),
        d.peers &&
          r((b = d.peers)).call(b, (a) => {
            this.emit(Y.ON_USER_ONLINE, { uid: a.uid });
            a.audio_mute
              ? this.emit(Y.MUTE_AUDIO, { uid: a.uid })
              : this.emit(Y.UNMUTE_AUDIO, { uid: a.uid });
            a.video_mute
              ? this.emit(Y.MUTE_VIDEO, { uid: a.uid })
              : this.emit(Y.UNMUTE_VIDEO, { uid: a.uid });
            a.audio_enable_local
              ? this.emit(Y.ENABLE_LOCAL_AUDIO, { uid: a.uid })
              : this.emit(Y.DISABLE_LOCAL_AUDIO, { uid: a.uid });
            a.video_enable_local
              ? this.emit(Y.ENABLE_LOCAL_VIDEO, { uid: a.uid })
              : this.emit(Y.DISABLE_LOCAL_VIDEO, { uid: a.uid });
            a.audio ||
              a.video ||
              this.emit(Y.ON_REMOVE_STREAM, { uid: a.uid, uint_id: a.uint_id });
            a.audio &&
              this.emit(Y.ON_ADD_AUDIO_STREAM, {
                uid: a.uid,
                uint_id: a.uint_id,
                audio: !0,
              });
            a.video &&
              this.emit(Y.ON_ADD_VIDEO_STREAM, {
                uid: a.uid,
                uint_id: a.uint_id,
                video: !0,
              });
          }),
        !0)
      );
    }
    reconnect(a, b) {
      this.pingpongTimer &&
        ((this.pingpongTimeoutCount = 0),
        window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = void 0));
      this.websocket.reconnect(a, b);
    }
    handleNotification(a) {
      h.debug("[".concat(this.clientId, "] receive notification: "), a);
      a = Wh(a.code);
      if ("success" !== a.action) {
        if ("failed" !== a.action)
          return "quit" === a.action
            ? ("ERR_REPEAT_JOIN_CHANNEL" === a.desc && this.close("UID_BANNED"),
              void this.close())
            : void this.reconnect(a.action);
        h.error("[".concat(this.clientId, "] ignore error: "), a.desc);
      }
    }
    handlePingPong() {
      if (this.websocket && "connected" === this.websocket.state) {
        0 < this.pingpongTimeoutCount && this.rttRolling.add(3e3);
        this.pingpongTimeoutCount += 1;
        var a = w.PING_PONG_TIME_OUT,
          b = v();
        this.pingpongTimeoutCount >= a &&
        (h.warning(
          "PINGPONG Timeout. Last Socket Message: ".concat(
            b - this.lastMsgTime,
            "ms"
          )
        ),
        b - this.lastMsgTime > w.WEBSOCKET_TIMEOUT_MIN)
          ? this.reconnect("retry", "ping_lost")
          : this.request(ca.PING, void 0, !0)
              .then(() => {
                this.pingpongTimeoutCount = 0;
                let a = v() - b;
                this.rttRolling.add(a);
                w.REPORT_STATS &&
                  this.send(ca.PING_BACK, { pingpongElapse: a });
              })
              .catch((a) => {});
      }
    }
    handleWebsocketEvents() {
      this.websocket.on(T.ON_MESSAGE, this.onWebsocketMessage);
      this.websocket.on(T.CLOSED, () => {
        this.connectionState = ta.CLOSED;
      });
      this.websocket.on(T.FAILED, () => {
        this._disconnectedReason = "NETWORK_ERROR";
        this.connectionState = ta.CLOSED;
      });
      this.websocket.on(T.RECONNECTING, (a) => {
        this.joinResponse = void 0;
        this.connectionState === ta.CONNECTED
          ? (this.connectionState = ta.RECONNECTING)
          : (this.connectionState = ta.CONNECTING);
      });
      this.websocket.on(T.WILL_RECONNECT, (a, b) => {
        if (ad(this, N.IS_P2P_DISCONNECTED) && "retry" === a)
          return (
            (this.reconnectToken = void 0),
            this.emit(N.NEED_RENEW_SESSION),
            this.emit(N.DISCONNECT_P2P),
            b("tryNext")
          );
        "retry" !== a &&
          ((this.reconnectToken = void 0),
          this.emit(N.NEED_RENEW_SESSION),
          this.emit(N.DISCONNECT_P2P));
        b(a);
      });
      this.websocket.on(T.CONNECTED, () => {
        this.openConnectionTime = v();
        this.reconnectToken
          ? this.rejoin().catch((a) => {
              var b;
              h.warning(
                n((b = "[".concat(this.clientId, "] rejoin failed "))).call(
                  b,
                  a
                )
              );
              this.reconnect("tryNext");
            })
          : this.join().catch((a) => {
              if (
                (this.emit(N.REPORT_JOIN_GATEWAY, a.code, this.url || ""),
                a instanceof m &&
                  a.code === l.UNEXPECTED_RESPONSE &&
                  a.data.code === C.ERR_NO_AUTHORIZED)
              )
                return (
                  h.warning(
                    "[".concat(
                      this.clientId,
                      "] reconnect no authorized, recover"
                    )
                  ),
                  void this.reconnect("recover")
                );
              h.error(
                "[".concat(this.clientId, "] join gateway request failed"),
                a.toString()
              );
              this.spec.forceWaitGatewayResponse
                ? this.reconnect("tryNext")
                : ((this.initError = a), this.close());
            });
      });
      this.websocket.on(T.REQUEST_NEW_URLS, (a, b) => {
        Ma(this, N.REQUEST_RECOVER, this.multiIpOption).then(a).catch(b);
      });
    }
  }
  class Vk extends Ya {
    constructor(a, b) {
      super();
      this._hints = [];
      this._ID = b || pa(8, "track-");
      this._mediaStreamTrack = this._originMediaStreamTrack = a;
    }
    toString() {
      return this._ID;
    }
    getTrackId() {
      return this._ID;
    }
    getMediaStreamTrack() {
      return this._mediaStreamTrack;
    }
  }
  class ye extends Vk {
    constructor(a, b) {
      super(a, b);
      this._enabled = !0;
      this._isClosed = !1;
      this._trackProcessors = [];
      this._handleTrackEnded = () => {
        this.emit(vd.TRACK_ENDED);
      };
      this._enabledMutex = new cc("".concat(b));
      a.addEventListener("ended", this._handleTrackEnded);
    }
    getTrackLabel() {
      return this._originMediaStreamTrack.label;
    }
    close() {
      var a;
      this._isClosed ||
        (this.stop(),
        r((a = this._trackProcessors)).call(a, (a) => a.destroy()),
        (this._trackProcessors = []),
        this._originMediaStreamTrack.stop(),
        this._mediaStreamTrack !== this._originMediaStreamTrack &&
          (this._mediaStreamTrack.stop(), (this._mediaStreamTrack = null)),
        (this._originMediaStreamTrack = null),
        (this._enabledMutex = null),
        h.debug("[".concat(this.getTrackId(), "] close")),
        this.emit(K.NEED_CLOSE),
        (this._isClosed = !0));
    }
    async _registerTrackProcessor(a) {
      var b;
      if (-1 === E((b = this._trackProcessors)).call(b, a)) {
        var d = this._trackProcessors[this._trackProcessors.length - 1];
        this._trackProcessors.push(a);
        a.onOutputChange = async () => {
          this._mediaStreamTrack = a.output || this._originMediaStreamTrack;
          this._updatePlayerSource();
          await Ta(this, K.NEED_REPLACE_TRACK, this._mediaStreamTrack);
        };
        d
          ? ((d.onOutputChange = async () => {
              d.output && (await a.setInput(d.output));
            }),
            await a.setInput(
              d.output || d.input || this._originMediaStreamTrack
            ))
          : await a.setInput(this._originMediaStreamTrack);
      }
    }
    _getOutputFromProcessors() {
      if (0 === this._trackProcessors.length)
        return this._originMediaStreamTrack;
      let a = this._trackProcessors[this._trackProcessors.length - 1];
      return a.output || a.input || this._originMediaStreamTrack;
    }
    async _updateOriginMediaStreamTrack(a, b) {
      a !== this._originMediaStreamTrack &&
        ((this._originMediaStreamTrack.removeEventListener(
          "ended",
          this._handleTrackEnded
        ),
        b && this._originMediaStreamTrack.stop(),
        a.addEventListener("ended", this._handleTrackEnded),
        (this._originMediaStreamTrack = a),
        0 < this._trackProcessors.length)
          ? (await this._trackProcessors[0].setInput(a),
            (this._mediaStreamTrack = this._getOutputFromProcessors()))
          : (this._mediaStreamTrack = this._originMediaStreamTrack),
        this._updatePlayerSource(),
        await Ta(this, K.NEED_REPLACE_TRACK, this._mediaStreamTrack));
    }
    _getDefaultPlayerConfig() {
      return {};
    }
  }
  let Xh = window.AudioContext || window.webkitAudioContext,
    Cc = null,
    ed = new Ya(),
    af = null;
  class Wk extends Ya {
    constructor() {
      super();
      this.isPlayed = !1;
      this.audioOutputLevel = this.audioLevelBase = 0;
      this.audioOutputLevelCache = null;
      this.audioOutputLevelCacheMaxLength =
        w.AUDIO_SOURCE_AVG_VOLUME_DURATION /
          w.AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL || 15;
      this.isDestroyed = !1;
      this._noAudioInputCount = 0;
      this.context = fd();
      this.playNode = this.context.destination;
      this.outputNode = this.context.createGain();
      gd(this.outputNode);
      this.analyserNode = this.context.createAnalyser();
    }
    get isNoAudioInput() {
      return 3 <= this.noAudioInputCount;
    }
    get noAudioInputCount() {
      return this._noAudioInputCount;
    }
    set noAudioInputCount(a) {
      3 > this._noAudioInputCount && 3 <= a
        ? this.onNoAudioInput && this.onNoAudioInput()
        : 3 <= this._noAudioInputCount &&
          0 == this._noAudioInputCount % 10 &&
          this.onNoAudioInput &&
          this.onNoAudioInput();
      this._noAudioInputCount = a;
    }
    startGetAudioBuffer(a) {
      this.audioBufferNode ||
        ((this.audioBufferNode = this.context.createScriptProcessor(a)),
        this.outputNode.connect(this.audioBufferNode),
        this.audioBufferNode.connect(this.context.destination),
        (this.audioBufferNode.onaudioprocess = (a) => {
          this.emit(lb.ON_AUDIO_BUFFER, fm(a));
        }));
    }
    stopGetAudioBuffer() {
      this.audioBufferNode &&
        ((this.audioBufferNode.onaudioprocess = null),
        this.outputNode.disconnect(this.audioBufferNode),
        (this.audioBufferNode = void 0));
    }
    createOutputTrack() {
      if (!fa.webAudioMediaStreamDest)
        throw new m(
          l.NOT_SUPPORTED,
          "your browser is not support audio processor"
        );
      return (
        (this.destNode && this.outputTrack) ||
          ((this.destNode = this.context.createMediaStreamDestination()),
          this.outputNode.connect(this.destNode),
          (this.outputTrack = this.destNode.stream.getAudioTracks()[0])),
        this.outputTrack
      );
    }
    play(a) {
      "running" !== this.context.state &&
        cb(() => {
          ed.emit("autoplay-failed");
        });
      this.isPlayed = !0;
      this.playNode = a || this.context.destination;
      this.outputNode.connect(this.playNode);
    }
    stop() {
      if (this.isPlayed)
        try {
          this.outputNode.disconnect(this.playNode);
        } catch (a) {}
      this.isPlayed = !1;
    }
    getAudioLevel() {
      return this.audioOutputLevel;
    }
    getAccurateVolumeLevel() {
      let a = new Uint8Array(this.analyserNode.frequencyBinCount);
      this.analyserNode.getByteFrequencyData(a);
      let b = 0;
      for (let d = 0; d < a.length; d++) b += a[d];
      return b / a.length;
    }
    getAudioAvgLevel() {
      var a;
      null === this.audioOutputLevelCache &&
        (this.audioOutputLevelCache = [this.audioOutputLevel]);
      return (
        Ae((a = this.audioOutputLevelCache)).call(a, (a, d) => a + d) /
        this.audioOutputLevelCache.length
      );
    }
    getAudioVolume() {
      return this.outputNode.gain.value;
    }
    setVolume(a) {
      this.outputNode.gain.setValueAtTime(a, this.context.currentTime);
    }
    setMute(a) {
      a
        ? (this.disconnect(),
          (this.audioLevelBase = 0),
          (this.audioOutputLevel = 0))
        : this.connect();
    }
    destroy() {
      this.disconnect();
      this.stop();
      this.isDestroyed = !0;
      this.onNoAudioInput = void 0;
    }
    disconnect() {
      this.sourceNode && this.sourceNode.disconnect();
      this.outputNode && this.outputNode.disconnect();
      window.clearInterval(this.updateAudioOutputLevelInterval);
    }
    connect() {
      var a;
      this.sourceNode && this.sourceNode.connect(this.outputNode);
      this.outputNode.connect(this.analyserNode);
      this.updateAudioOutputLevelInterval = window.setInterval(
        Ba((a = this.updateAudioOutputLevel)).call(a, this),
        w.AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL || 400
      );
    }
    updateAudioOutputLevel() {
      if (
        (this.context &&
          "running" !== this.context.state &&
          this.context.resume(),
        this.analyserNode)
      ) {
        if (this.analyserNode.getFloatTimeDomainData) {
          var a = new Float32Array(this.analyserNode.frequencyBinCount);
          this.analyserNode.getFloatTimeDomainData(a);
        } else {
          var b;
          a = new Uint8Array(this.analyserNode.frequencyBinCount);
          this.analyserNode.getByteTimeDomainData(a);
          let d = !0;
          a = new Float32Array(
            A((b = Ob(a))).call(
              b,
              (a) => (128 !== a && (d = !1), 0.0078125 * (a - 128))
            )
          );
          d ? (this.noAudioInputCount += 1) : (this.noAudioInputCount = 0);
        }
        for (b = 0; b < a.length; b += 1)
          Math.abs(a[b]) > this.audioLevelBase &&
            ((this.audioLevelBase = Math.abs(a[b])),
            1 < this.audioLevelBase && (this.audioLevelBase = 1));
        this.audioOutputLevel = this.audioLevelBase;
        this.audioLevelBase /= 4;
        null !== this.audioOutputLevelCache &&
          (this.audioOutputLevelCache.push(this.audioOutputLevel),
          this.audioOutputLevelCache.length >
            this.audioOutputLevelCacheMaxLength &&
            this.audioOutputLevelCache.shift());
      }
    }
  }
  class Xk extends Wk {
    constructor(a, b) {
      if (
        (super(),
        (this.isCurrentTrackCloned = !1),
        (this.isRemoteTrack = !1),
        (this.rebuildWebAudio = () => {
          if (!this.isNoAudioInput || this.isDestroyed)
            return (
              document.body.removeEventListener(
                "click",
                this.rebuildWebAudio,
                !0
              ),
              void h.debug(
                "rebuild web audio success, current volume",
                this.getAudioLevel()
              )
            );
          this.context.resume().then(() => h.info("resume success"));
          h.debug("rebuild web audio because of ios 12 bugs");
          this.disconnect();
          var a = this.track;
          this.track = this.track.clone();
          this.isCurrentTrackCloned
            ? a.stop()
            : (this.isCurrentTrackCloned = !0);
          a = new MediaStream([this.track]);
          this.sourceNode = this.context.createMediaStreamSource(a);
          gd(this.sourceNode);
          this.analyserNode = this.context.createAnalyser();
          let b = this.outputNode.gain.value;
          this.outputNode = this.context.createGain();
          this.outputNode.gain.setValueAtTime(b, this.context.currentTime);
          gd(this.outputNode);
          this.connect();
          this.audioElement.srcObject = a;
          this.isPlayed && this.play(this.playNode);
        }),
        "audio" !== a.kind)
      )
        throw new m(l.UNEXPECTED_ERROR);
      this.track = a;
      a = new MediaStream([this.track]);
      this.isRemoteTrack = !!b;
      this.sourceNode = this.context.createMediaStreamSource(a);
      gd(this.sourceNode);
      this.connect();
      this.audioElement = document.createElement("audio");
      this.audioElement.srcObject = a;
      a = qa();
      b &&
        a.os === X.IOS &&
        (ed.on("state-change", this.rebuildWebAudio),
        (this.onNoAudioInput = () => {
          document.body.addEventListener("click", this.rebuildWebAudio, !0);
          this.rebuildWebAudio();
          document.body.click();
        }));
    }
    get isFreeze() {
      return !1;
    }
    updateTrack(a) {
      this.sourceNode.disconnect();
      this.track = a;
      this.isCurrentTrackCloned = !1;
      a = new MediaStream([a]);
      this.sourceNode = this.context.createMediaStreamSource(a);
      gd(this.sourceNode);
      this.sourceNode.connect(this.outputNode);
      this.audioElement.srcObject = a;
    }
    destroy() {
      this.audioElement.remove();
      ed.off("state-change", this.rebuildWebAudio);
      super.destroy();
    }
  }
  class Fp {
    constructor() {
      this.elementMap = new Z();
      this.elementsNeedToResume = [];
      this.sinkIdMap = new Z();
      this.autoResumeAudioElement();
    }
    async setSinkID(a, b) {
      let d = this.elementMap.get(a);
      if ((this.sinkIdMap.set(a, b), d))
        try {
          await d.setSinkId(b);
        } catch (e) {
          throw new m(
            l.PERMISSION_DENIED,
            "can not set sink id: " + e.toString()
          );
        }
    }
    play(a, b) {
      if (!this.elementMap.has(b)) {
        var d = document.createElement("audio");
        d.autoplay = !0;
        d.srcObject = new MediaStream([a]);
        this.elementMap.set(b, d);
        (a = this.sinkIdMap.get(b)) &&
          d.setSinkId(a).catch((a) => {
            h.warning("[".concat(b, "] set sink id failed"), a.toString());
          });
        (a = d.play()) &&
          a.then &&
          a.catch((a) => {
            h.warning("audio element play warning", a.toString());
            this.elementMap.has(b) &&
              "NotAllowedError" === a.name &&
              (h.warning("detected audio element autoplay failed"),
              this.elementsNeedToResume.push(d),
              cb(() => {
                this.onAutoplayFailed && this.onAutoplayFailed();
              }));
          });
      }
    }
    updateTrack(a, b) {
      (a = this.elementMap.get(a)) && (a.srcObject = new MediaStream([b]));
    }
    isPlaying(a) {
      return this.elementMap.has(a);
    }
    setVolume(a, b) {
      (a = this.elementMap.get(a)) &&
        ((b = Math.max(0, Math.min(100, b))), (a.volume = b / 100));
    }
    stop(a) {
      var b, d;
      let e = this.elementMap.get(a);
      if ((this.sinkIdMap.delete(a), e)) {
        var f = E((b = this.elementsNeedToResume)).call(b, e);
        Ja((d = this.elementsNeedToResume)).call(d, f, 1);
        e.srcObject = null;
        e.remove();
        this.elementMap.delete(a);
      }
    }
    autoResumeAudioElement() {
      let a = () => {
        var a;
        r((a = this.elementsNeedToResume)).call(a, (a) => {
          a.play()
            .then((a) => {
              h.debug("Auto resume audio element success");
            })
            .catch((a) => {
              h.warning("Auto resume audio element failed!", a);
            });
        });
        this.elementsNeedToResume = [];
      };
      Pl().then(() => {
        document.body.addEventListener("touchstart", a, !0);
        document.body.addEventListener("mousedown", a, !0);
      });
    }
  }
  let ob = new Fp();
  class Za extends ye {
    constructor(a, b, d) {
      super(a, d);
      this.trackMediaType = "audio";
      this._enabled = !0;
      this._useAudioElement = !1;
      this._encoderConfig = b;
      this._source = new Xk(a);
      fa.webAudioWithAEC || (this._useAudioElement = !0);
    }
    get isPlaying() {
      return this._useAudioElement
        ? ob.isPlaying(this.getTrackId())
        : this._source.isPlayed;
    }
    setVolume(a) {
      W(a, "volume", 0, 1e3);
      let b = t.reportApiInvoke(
        null,
        {
          tag: D.TRACER,
          name: y.LOCAL_AUDIO_TRACK_SET_VOLUME,
          options: [this.getTrackId(), a],
        },
        300
      );
      this._source.setVolume(a / 100);
      try {
        let a = this._source.createOutputTrack();
        this._mediaStreamTrack !== a &&
          ((this._mediaStreamTrack = a),
          Ta(this, K.NEED_REPLACE_TRACK, this._mediaStreamTrack)
            .then(() => {
              h.debug(
                "[".concat(
                  this.getTrackId(),
                  "] replace web audio track success"
                )
              );
            })
            .catch((a) => {
              h.warning(
                "[".concat(
                  this.getTrackId(),
                  "] replace web audio track failed"
                ),
                a
              );
            }));
      } catch (d) {}
      b.onSuccess();
    }
    getVolumeLevel() {
      return this._source.getAudioLevel();
    }
    async setPlaybackDevice(a) {
      let b = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.REMOTE_AUDIO_SET_OUTPUT_DEVICE,
        options: [this.getTrackId(), a],
      });
      if (!this._useAudioElement)
        throw new m(
          l.NOT_SUPPORTED,
          "your browser does not support setting the audio output device"
        );
      try {
        await ob.setSinkID(this.getTrackId(), a);
      } catch (d) {
        throw (b.onError(d), d);
      }
      b.onSuccess();
    }
    async setEnabled(a) {
      var b;
      if (a !== this._enabled) {
        h.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
        var d = await this._enabledMutex.lock();
        if (!a) {
          this._originMediaStreamTrack.enabled = !1;
          try {
            await Ta(this, K.NEED_REMOVE_TRACK, this);
          } catch (e) {
            throw (
              (h.error(
                "[".concat(this.getTrackId(), "] setEnabled to false error"),
                e.toString()
              ),
              d(),
              e)
            );
          }
          return (this._enabled = !1), d();
        }
        this._originMediaStreamTrack.enabled = !0;
        try {
          await Ta(this, K.NEED_ADD_TRACK, this);
        } catch (e) {
          throw (
            (h.error(
              "[".concat(this.getTrackId(), "] setEnabled to true error"),
              e.toString()
            ),
            d(),
            e)
          );
        }
        h.info(
          n((b = "[".concat(this.getTrackId(), "] setEnabled to "))).call(
            b,
            a,
            " success"
          )
        );
        this._enabled = !0;
        d();
      }
    }
    getStats() {
      cd(() => {
        h.warning(
          "[deprecated] LocalAudioTrack.getStats will be removed in the future, use AgoraRTCClient.getLocalAudioStats instead"
        );
      }, "localAudioTrackGetStatsWarning");
      return gc(this, K.GET_STATS) || cf({}, te);
    }
    setAudioFrameCallback(a, b = 4096) {
      if (!a)
        return (
          this._source.removeAllListeners(lb.ON_AUDIO_BUFFER),
          void this._source.stopGetAudioBuffer()
        );
      this._source.startGetAudioBuffer(b);
      this._source.removeAllListeners(lb.ON_AUDIO_BUFFER);
      this._source.on(lb.ON_AUDIO_BUFFER, (b) => a(b));
    }
    play() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.LOCAL_AUDIO_TRACK_PLAY,
        options: [this.getTrackId()],
      });
      h.debug("[".concat(this.getTrackId(), "] start audio playback"));
      this._useAudioElement
        ? (h.debug(
            "[".concat(this.getTrackId(), "] start audio playback in element")
          ),
          ob.play(this._mediaStreamTrack, this.getTrackId()))
        : this._source.play();
      a.onSuccess();
    }
    stop() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.LOCAL_AUDIO_TRACK_STOP,
        options: [this.getTrackId()],
      });
      h.debug("[".concat(this.getTrackId(), "] stop audio playback"));
      this._useAudioElement ? ob.stop(this.getTrackId()) : this._source.stop();
      a.onSuccess();
    }
    close() {
      super.close();
      this._source.destroy();
    }
    _updatePlayerSource() {
      h.debug(
        "[track-".concat(this.getTrackId(), "] update player source track")
      );
      this._source.updateTrack(this._mediaStreamTrack);
      this._useAudioElement &&
        ob.updateTrack(this.getTrackId(), this._mediaStreamTrack);
    }
    async _updateOriginMediaStreamTrack(a, b) {
      this._originMediaStreamTrack !== a &&
        (this._originMediaStreamTrack.removeEventListener(
          "ended",
          this._handleTrackEnded
        ),
        a.addEventListener("ended", this._handleTrackEnded),
        b && this._originMediaStreamTrack.stop(),
        (this._originMediaStreamTrack = a),
        this._source.updateTrack(this._originMediaStreamTrack),
        this._mediaStreamTrack !== this._source.outputTrack &&
          ((this._mediaStreamTrack = this._originMediaStreamTrack),
          this._updatePlayerSource(),
          await Ta(this, K.NEED_REPLACE_TRACK, this._mediaStreamTrack)));
    }
  }
  class tg extends Za {
    constructor(a, b, d, e) {
      super(a, b.encoderConfig ? Fd(b.encoderConfig) : {}, e);
      this._deviceName = "default";
      this._enabled = !0;
      this._config = b;
      this._constraints = d;
      this._deviceName = a.label;
    }
    async setDevice(a) {
      var b, d;
      let e = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.MIC_AUDIO_TRACK_SET_DEVICE,
        options: [this.getTrackId(), a],
      });
      if (
        (h.info(
          n((b = "[".concat(this.getTrackId, "] start set device to "))).call(
            b,
            a
          )
        ),
        this._enabled)
      )
        try {
          let d = await gb.getDeviceById(a);
          b = {};
          b.audio = cf({}, this._constraints);
          b.audio.deviceId = { exact: a };
          this._originMediaStreamTrack.stop();
          let e = null;
          try {
            e = await Eb(b, this.getTrackId());
          } catch (k) {
            throw (
              (h.error(
                "[track-".concat(this.getTrackId(), "] setDevice failed"),
                k.toString()
              ),
              (e = await Eb({ video: this._constraints }, this.getTrackId())),
              await this._updateOriginMediaStreamTrack(
                e.getAudioTracks()[0],
                !1
              ),
              k)
            );
          }
          await this._updateOriginMediaStreamTrack(e.getAudioTracks()[0], !1);
          this._deviceName = d.label;
          this._config.microphoneId = a;
          this._constraints.deviceId = { exact: a };
        } catch (f) {
          throw (
            (e.onError(f),
            h.error(
              "[track-".concat(this.getTrackId(), "] setDevice error"),
              f.toString()
            ),
            f)
          );
        }
      else
        try {
          (this._deviceName = (await gb.getDeviceById(a)).label),
            (this._config.microphoneId = a),
            (this._constraints.deviceId = { exact: a });
        } catch (f) {
          throw (
            (e.onError(f),
            h.error(
              "[track-".concat(this.getTrackId(), "] setDevice error"),
              f.toString()
            ),
            f)
          );
        }
      e.onSuccess();
      h.info(
        n((d = "[".concat(this.getTrackId, "] set device to "))).call(
          d,
          a,
          " success"
        )
      );
    }
    async setEnabled(a, b) {
      if (b)
        return (
          h.debug(
            "[".concat(
              this.getTrackId,
              "] setEnabled false (do not close microphone)"
            )
          ),
          await super.setEnabled(a)
        );
      if (a !== this._enabled) {
        h.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
        b = await this._enabledMutex.lock();
        if (!a) {
          this._originMediaStreamTrack.onended = null;
          this._originMediaStreamTrack.stop();
          this._enabled = !1;
          try {
            await Ta(this, K.NEED_REMOVE_TRACK, this);
          } catch (e) {
            throw (
              (h.error(
                "[".concat(this.getTrackId(), "] setEnabled false failed"),
                e.toString()
              ),
              b(),
              e)
            );
          }
          return void b();
        }
        a = cf({}, this._constraints);
        var d = gb.searchDeviceIdByName(this._deviceName);
        d && !a.deviceId && (a.deviceId = d);
        try {
          let a = await Eb({ audio: this._constraints }, this.getTrackId());
          await this._updateOriginMediaStreamTrack(a.getAudioTracks()[0], !1);
          await Ta(this, K.NEED_ADD_TRACK, this);
        } catch (e) {
          throw (
            (b(),
            h.error(
              "[".concat(this.getTrackId(), "] setEnabled true failed"),
              e.toString()
            ),
            e)
          );
        }
        this._enabled = !0;
        h.info("[".concat(this.getTrackId(), "] setEnabled success"));
        b();
      }
    }
  }
  class Gp extends Za {
    constructor(a, b, d, e) {
      super(b.createOutputTrack(), d, e);
      this.source = a;
      this._bufferSource = b;
      this._bufferSource.on(lb.AUDIO_SOURCE_STATE_CHANGE, (a) => {
        this.emit(vd.SOURCE_STATE_CHANGE, a);
      });
      try {
        this._mediaStreamTrack = this._source.createOutputTrack();
      } catch (f) {}
    }
    get currentState() {
      return this._bufferSource.currentState;
    }
    get duration() {
      return this._bufferSource.duration;
    }
    getCurrentTime() {
      return this._bufferSource.currentTime;
    }
    startProcessAudioBuffer(a) {
      let b = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.BUFFER_AUDIO_TRACK_START,
        options: [this.getTrackId(), a, this.duration],
      });
      a && this._bufferSource.updateOptions(a);
      this._bufferSource.startProcessAudioBuffer();
      b.onSuccess();
    }
    pauseProcessAudioBuffer() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.BUFFER_AUDIO_TRACK_PAUSE,
        options: [this.getTrackId()],
      });
      this._bufferSource.pauseProcessAudioBuffer();
      a.onSuccess();
    }
    seekAudioBuffer(a) {
      let b = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.BUFFER_AUDIO_TRACK_SEEK,
        options: [this.getTrackId()],
      });
      this._bufferSource.seekAudioBuffer(a);
      b.onSuccess();
    }
    resumeProcessAudioBuffer() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.BUFFER_AUDIO_TRACK_RESUME,
        options: [this.getTrackId()],
      });
      this._bufferSource.resumeProcessAudioBuffer();
      a.onSuccess();
    }
    stopProcessAudioBuffer() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.BUFFER_AUDIO_TRACK_STOP,
        options: [this.getTrackId()],
      });
      this._bufferSource.stopProcessAudioBuffer();
      a.onSuccess();
    }
  }
  class Sc extends Za {
    constructor() {
      let a = fd().createMediaStreamDestination();
      super(a.stream.getAudioTracks()[0]);
      try {
        this._mediaStreamTrack = this._source.createOutputTrack();
      } catch (b) {}
      this.destNode = a;
      this.trackList = [];
    }
    hasAudioTrack(a) {
      var b;
      return -1 !== E((b = this.trackList)).call(b, a);
    }
    addAudioTrack(a) {
      var b;
      -1 === E((b = this.trackList)).call(b, a)
        ? (h.debug("add ".concat(a.getTrackId(), " to mixing track")),
          a._source.outputNode.connect(this.destNode),
          this.trackList.push(a),
          this.updateEncoderConfig())
        : h.warning("track is already added");
    }
    removeAudioTrack(a) {
      var b;
      if (-1 !== E((b = this.trackList)).call(b, a)) {
        h.debug("remove ".concat(a.getTrackId(), " from mixing track"));
        try {
          a._source.outputNode.disconnect(this.destNode);
        } catch (d) {}
        bd(this.trackList, a);
        this.updateEncoderConfig();
      }
    }
    updateEncoderConfig() {
      var a;
      let b = {};
      r((a = this.trackList)).call(a, (a) => {
        a._encoderConfig &&
          ((a._encoderConfig.bitrate || 0) > (b.bitrate || 0) &&
            (b.bitrate = a._encoderConfig.bitrate),
          (a._encoderConfig.sampleRate || 0) > (b.sampleRate || 0) &&
            (b.sampleRate = a._encoderConfig.sampleRate),
          (a._encoderConfig.sampleSize || 0) > (b.sampleSize || 0) &&
            (b.sampleSize = a._encoderConfig.sampleSize),
          a._encoderConfig.stereo && (b.stereo = !0));
      });
      this._encoderConfig = b;
    }
  }
  let ug = new Z();
  class Hp extends Ya {
    constructor(a) {
      super();
      this.inChannelInfo = { joinAt: null, duration: 0 };
      this._state = "DISCONNECTED";
      this.needToSendUnpubUnsub = new Z();
      this.hasChangeBGPAddress = this.isSignalRecover = !1;
      this.joinGatewayStartTime = 0;
      this._signalTimeout = !1;
      this.clientId = a.clientId;
      this.spec = a;
      this.signal = new Ep(df({}, a, { retryConfig: a.websocketRetryConfig }));
      this._statsCollector = a.statsCollector;
      this.role = a.role || "audience";
      this.handleSignalEvents();
    }
    get state() {
      return this._state;
    }
    set state(a) {
      if (a !== this._state) {
        var b = this._state;
        this._state = a;
        "DISCONNECTED" === a && this._disconnectedReason
          ? this.emit(
              ya.CONNECTION_STATE_CHANGE,
              a,
              b,
              this._disconnectedReason
            )
          : this.emit(ya.CONNECTION_STATE_CHANGE, a, b);
      }
    }
    async join(a, b) {
      var d;
      "disabled" !== a.cloudProxyServer && (this.hasChangeBGPAddress = !0);
      let e = v();
      var f = ug.get(a.cname);
      if ((f || ((f = new Z()), ug.set(a.cname, f)), f.has(a.uid)))
        throw (
          ((f = new m(l.UID_CONFLICT)),
          t.joinGateway(a.sid, {
            lts: e,
            succ: !1,
            ec: f.code,
            addr: null,
            uid: a.uid,
            cid: a.cid,
          }),
          f)
        );
      f.set(a.uid, !0);
      this.joinInfo = a;
      this.key = b;
      b = A((d = a.gatewayAddrs)).call(d, (a) => "wss://".concat(a));
      d = 0;
      this.joinGatewayStartTime = e;
      try {
        d = (await this.signal.init(b)).uid;
      } catch (g) {
        throw (
          (h.error(
            "[".concat(this.clientId, "] User join failed"),
            g.toString()
          ),
          t.joinGateway(a.sid, {
            lts: e,
            succ: !1,
            ec: g.code === l.UNEXPECTED_ERROR ? g.message : g.code,
            addr: this.signal.url,
            uid: a.uid,
            cid: a.cid,
          }),
          f.delete(a.uid),
          this.signal.close(),
          g)
        );
      }
      return (
        (this.state = "CONNECTED"),
        (this.inChannelInfo.joinAt = v()),
        h.debug("[".concat(this.clientId, "] Connected to gateway server")),
        (this.trafficStatsInterval = window.setInterval(() => {
          this.updateTrafficStats().catch((a) => {
            h.warning(
              "[".concat(this.clientId, "] get traffic stats error"),
              a.toString()
            );
          });
        }, 3e3)),
        (this.networkQualityInterval = window.setInterval(() => {
          navigator && void 0 !== navigator.onLine && !navigator.onLine
            ? this.emit(ya.NETWORK_QUALITY, {
                downlinkNetworkQuality: 6,
                uplinkNetworkQuality: 6,
              })
            : this._signalTimeout
            ? this.emit(ya.NETWORK_QUALITY, {
                downlinkNetworkQuality: 5,
                uplinkNetworkQuality: 5,
              })
            : "CONNECTED" === this.state && this._statsCollector.trafficStats
            ? this.emit(ya.NETWORK_QUALITY, {
                uplinkNetworkQuality: Jh(
                  this._statsCollector.trafficStats.B_unq
                ),
                downlinkNetworkQuality: Jh(
                  this._statsCollector.trafficStats.B_dnq
                ),
              })
            : this.emit(ya.NETWORK_QUALITY, {
                uplinkNetworkQuality: 0,
                downlinkNetworkQuality: 0,
              });
        }, 2e3)),
        d
      );
    }
    async leave(a = !1) {
      if ("DISCONNECTED" !== this.state) {
        this.state = "DISCONNECTING";
        try {
          if (!a && this.signal.connectionState === ta.CONNECTED) {
            var b = this.signal.request(ca.LEAVE, void 0, !0);
            await (3e3 === 1 / 0 ? b : u.race([b, Ql(3e3)]));
          }
        } catch (d) {
          h.warning(
            "[".concat(this.clientId, "] leave request failed, ignore"),
            d
          );
        }
        this.signal.close();
        this.reset();
        this.state = "DISCONNECTED";
      }
    }
    async publish(a, b) {
      if (!this.joinInfo)
        throw new m(l.UNEXPECTED_ERROR, "publish no joinInfo");
      let d = a.getUserId(),
        e = a.videoTrack ? Fl(a.videoTrack) : {};
      if (
        (a.on(G.NEED_ANSWER, (f, g, k) => {
          var q;
          let n = {
            state: "offer",
            stream_type: b,
            p2p_id: a.pc.ID,
            sdp: z(f),
            audio: !!a.audioTrack,
            video: !!a.videoTrack,
            screen:
              a.videoTrack &&
              -1 !== E((q = a.videoTrack._hints)).call(q, nb.SCREEN_TRACK),
            attributes: e,
            dtx: a.audioTrack instanceof tg && a.audioTrack._config.DTX,
            hq: !1,
            lq: !1,
            stereo: !1,
            speech: !1,
            mode: this.spec.mode,
            codec: this.spec.codec,
            extend: w.PUB_EXTEND,
          };
          this.signal
            .request(ca.PUBLISH, n, !0)
            .then((a) => {
              d && this.needToSendUnpubUnsub.set(d, !0);
              g(JSON.parse(a.sdp));
            })
            .catch((b) => {
              if (
                f.retry &&
                b.data &&
                b.data.code === C.ERR_PUBLISH_REQUEST_INVALID
              )
                return (
                  h.warning(
                    "[".concat(
                      this.clientId,
                      "] receiver publish error code, retry"
                    ),
                    b.toString()
                  ),
                  Ma(a, G.NEED_UNPUB).then(() => {
                    f.retry = !1;
                    Ma(a, G.NEED_ANSWER, f).then(g).catch(k);
                  })
                );
              b.code !== l.WS_ABORT && k(b);
            });
        }),
        a.on(G.NEED_RENEGOTIATE, (d, e, k) => {
          this.signal
            .request(
              ca.PUBLISH,
              { state: "negotiation", stream_type: b, p2p_id: a.pc.ID, sdp: d },
              !0
            )
            .then((a) => {
              e(JSON.parse(a.sdp));
            })
            .catch((a) => {
              a.code !== l.WS_ABORT && k(a);
            });
        }),
        a.on(G.NEED_UNPUB, (e) =>
          d && !this.needToSendUnpubUnsub.has(d)
            ? e(!1)
            : "RECONNECTING" === this.state
            ? e(!0)
            : void this.signal
                .request(
                  ca.UNPUBLISH,
                  { stream_id: a.getUserId(), stream_type: b },
                  !0
                )
                .then(() => e(!1))
                .catch((a) => {
                  h.warning("unpublish warning: ", a);
                  e(!0);
                })
        ),
        a.on(G.NEED_UPLOAD, (a, d) => {
          this.signal.upload(a, { stream_type: b, stats: d });
        }),
        a.on(G.NEED_SIGNAL_RTT, (a) => {
          a(this.signal.rtt);
        }),
        "RECONNECTING" !== this.state)
      ) {
        if ("CONNECTED" !== this.state)
          return new m(
            l.INVALID_OPERATION,
            "can not publish when connection state is ".concat(this.state)
          ).throw();
        await a.startP2PConnection();
      } else a.readyToReconnectPC();
    }
    async subscribe(a) {
      if (!this.joinInfo)
        throw new m(l.UNEXPECTED_ERROR, "subscribe no joinInfo");
      let b = a.getUserId();
      if (
        (a.on(G.NEED_ANSWER, (d, e, f) => {
          var g = a.subscribeOptions;
          g = {
            stream_id: a.getUserId(),
            audio: !!g.audio,
            video: !!g.video,
            mode: this.spec.mode,
            codec: this.spec.codec,
            p2p_id: a.pc.ID,
            sdp: z(d),
            tcc: !!w.SUBSCRIBE_TCC,
            extend: w.SUB_EXTEND,
          };
          this.signal
            .request(ca.SUBSCRIBE, g, !0)
            .then((a) => {
              this.needToSendUnpubUnsub.set(b, !0);
              e(JSON.parse(a.sdp));
            })
            .catch((b) => {
              if (
                d.retry &&
                b.data &&
                b.data.code === C.ERR_SUBSCRIBE_REQUEST_INVALID
              )
                return (
                  h.warning(
                    "[".concat(
                      this.clientId,
                      "] receiver subscribe error code, retry"
                    ),
                    b.toString()
                  ),
                  Ma(a, G.NEED_UNSUB).then(() => {
                    d.retry = !1;
                    Ma(a, G.NEED_ANSWER, d).then(e).catch(f);
                  })
                );
              b.code !== l.WS_ABORT && f(b);
            });
        }),
        a.on(G.NEED_UNSUB, (d) =>
          this.needToSendUnpubUnsub.has(b)
            ? "RECONNECTING" === this.state
              ? d(!0)
              : void this.signal
                  .request(ca.UNSUBSCRIBE, { stream_id: a.getUserId() }, !0)
                  .then(() => d(!1))
                  .catch((a) => {
                    h.warning("unsubscribe warning", a);
                    d(!0);
                  })
            : d(!1)
        ),
        a.on(G.NEED_UPLOAD, (b, e) => {
          this.signal.upload(b, { stream_id: a.getUserId(), stats: e });
        }),
        a.on(G.NEED_SIGNAL_RTT, (a) => {
          a(this.signal.rtt);
        }),
        "RECONNECTING" !== this.state)
      ) {
        if ("CONNECTED" !== this.state)
          return new m(
            l.INVALID_OPERATION,
            "can not subscribe when connection state is ".concat(this.state)
          ).throw();
        await a.startP2PConnection();
      } else a.readyToReconnectPC();
    }
    async subscribeChange(a, b) {
      var d, e;
      if (!this.joinInfo)
        throw new m(l.UNEXPECTED_ERROR, "subscribe no joinInfo");
      if ((await a.setSubscribeOptions(b), "RECONNECTING" !== this.state)) {
        if ("CONNECTED" !== this.state)
          return new m(
            l.INVALID_OPERATION,
            "can not subscribe change when connection state is ".concat(
              this.state
            )
          ).throw();
        h.debug(
          n(
            (d = n(
              (e = "[".concat(
                this.clientId,
                "] send subscribe change, audio: "
              ))
            ).call(e, b.audio, ", video: "))
          ).call(d, b.video)
        );
        await this.signal.request(
          ca.SUBSCRIBE_CHANGE,
          { stream_id: a.getUserId(), audio: !!b.audio, video: !!b.video },
          !0
        );
      }
    }
    async unsubscribe(a) {
      await a.closeP2PConnection();
    }
    getGatewayInfo() {
      return this.signal.request(ca.GATEWAY_INFO);
    }
    renewToken(a) {
      return this.signal.request(ca.RENEW_TOKEN, { token: a });
    }
    async setClientRole(a) {
      a !== this.role &&
        ("CONNECTED" === this.state
          ? (await this.signal.request(ca.SET_CLIENT_ROLE, { role: a }),
            (this.role = a))
          : (this.role = a));
    }
    async setRemoteVideoStreamType(a, b) {
      await this.signal.request(ca.SWITCH_VIDEO_STREAM, {
        stream_id: a,
        stream_type: b,
      });
    }
    async setStreamFallbackOption(a, b) {
      await this.signal.request(ca.SET_FALLBACK_OPTION, {
        stream_id: a,
        fallback_type: b,
      });
    }
    getInChannelInfo() {
      return (
        this.inChannelInfo.joinAt &&
          (this.inChannelInfo.duration = v() - this.inChannelInfo.joinAt),
        df({}, this.inChannelInfo)
      );
    }
    async getGatewayVersion() {
      return (await this.signal.request(ca.GATEWAY_INFO)).version;
    }
    reset() {
      if (
        (this.inChannelInfo.joinAt &&
          ((this.inChannelInfo.duration = v() - this.inChannelInfo.joinAt),
          (this.inChannelInfo.joinAt = null)),
        this.trafficStatsInterval &&
          (window.clearInterval(this.trafficStatsInterval),
          (this.trafficStatsInterval = void 0)),
        this.joinInfo)
      ) {
        let a = ug.get(this.joinInfo.cname);
        a && a.delete(this.joinInfo.uid);
      }
      this.needToSendUnpubUnsub = new Z();
      this.key = this.joinInfo = void 0;
      this.networkQualityInterval &&
        (window.clearInterval(this.networkQualityInterval),
        (this.networkQualityInterval = void 0));
    }
    updateTurnConfigFromSignal() {
      if (this.joinInfo) {
        var a;
        (a = (a = (this.signal.url || "").match(/wss:\/\/([^:]+):(\d+)/))
          ? {
              username: eb.username,
              password: eb.password,
              turnServerURL: a[1],
              tcpport: R(a[2]) + 30,
              udpport: R(a[2]) + 30,
              forceturn: !1,
            }
          : null) &&
          "off" !== this.joinInfo.turnServer.mode &&
          this.joinInfo.turnServer.servers.push(
            df({}, eb, {
              turnServerURL: a.turnServerURL,
              tcpport: a.tcpport,
              udpport: a.udpport,
            })
          );
      }
    }
    async updateTrafficStats() {
      var a;
      if ("CONNECTED" === this.state) {
        var b = await this.signal.request(ca.TRAFFIC_STATS, void 0, !0);
        b.timestamp = v();
        r((a = b.peer_delay)).call(a, (a) => {
          var b;
          let d =
            this._statsCollector.trafficStats &&
            U((b = this._statsCollector.trafficStats.peer_delay)).call(
              b,
              (b) => b.peer_uid === a.peer_uid
            );
          d &&
            d.B_st !== a.B_st &&
            cb(() => {
              this.emit(ya.STREAM_TYPE_CHANGE, a.peer_uid, a.B_st);
            });
        });
        this._statsCollector.updateTrafficStats(b);
      }
    }
    getJoinMessage() {
      if (!this.joinInfo || !this.key)
        throw new m(
          l.UNEXPECTED_ERROR,
          "can not generate join message, no join info"
        );
      let a = ab({}, this.joinInfo.apResponse),
        b = {
          session_id: this.joinInfo.sid,
          app_id: this.joinInfo.appId,
          channel_key: this.key,
          channel_name: this.joinInfo.cname,
          sdk_version: db,
          browser: navigator.userAgent,
          process_id: w.PROCESS_ID,
          mode: this.spec.mode,
          codec: this.spec.codec,
          role: this.role,
          has_changed_gateway: this.hasChangeBGPAddress,
          ap_response: a,
          extends: w.JOIN_EXTEND,
          details: { 6: this.joinInfo.stringUid },
          features: { rejoin: !0 },
          optionalInfo: this.joinInfo.optionalInfo,
        };
      this.joinInfo.stringUid && (b.string_uid = this.joinInfo.stringUid);
      if (this.joinInfo.aesmode && this.joinInfo.aespassword)
        if (((b.aes_mode = this.joinInfo.aesmode), w.ENCRYPT_AES)) {
          var d = this.joinInfo.aespassword;
          var e = a.uid;
          var f = d.length;
          d = new TextEncoder().encode(d);
          var g = (4 - (d.length % 4)) % 4;
          if (0 !== g) {
            var k = new d.constructor(d.length + g);
            g = new d.constructor(g);
            d = (k.set(d, 0), k.set(g, d.length), k);
          }
          f = [f];
          d = new Uint32Array(d.buffer);
          k = new Uint32Array(f.length + d.length);
          f = (k.set(f, 0), k.set(d, f.length), k);
          for (d = 0; d < f.length; d++) (f[d] ^= e), (f[d] = ~f[d]);
          e = Ye(new Uint8Array(f.buffer));
          b.aes_secret = e;
          b.aes_encrypt = !0;
        } else b.aes_secret = this.joinInfo.aespassword;
      return (
        a.addresses[this.signal.websocket.currentURLIndex] &&
          ((b.ap_response.ticket =
            a.addresses[this.signal.websocket.currentURLIndex].ticket),
          delete a.addresses),
        b
      );
    }
    getRejoinMessage() {
      if (!this.joinInfo)
        throw new m(
          l.UNEXPECTED_ERROR,
          "can not generate rejoin message, no join info"
        );
      return {
        session_id: this.joinInfo.sid,
        channel_name: this.joinInfo.cname,
        cid: this.joinInfo.cid,
        uid: this.joinInfo.uid,
        vid: Number(this.joinInfo.vid),
      };
    }
    handleSignalEvents() {
      this.signal.on(N.WS_RECONNECTING, () => {
        this.joinInfo &&
          ((this.state = "RECONNECTING"),
          t.sessionInit(this.joinInfo.sid, {
            lts: new Date().getTime(),
            extend: this.isSignalRecover ? { recover: !0 } : { rejoin: !0 },
            cname: this.joinInfo.cname,
            appid: this.joinInfo.appId,
            mode: this.spec.mode,
          }),
          (this.isSignalRecover = !1),
          (this.joinGatewayStartTime = v()));
      });
      this.signal.on(N.WS_CLOSED, (a) => {
        this.reset();
        this._disconnectedReason = a;
        this.state = "DISCONNECTED";
      });
      this.signal.on(N.WS_CONNECTED, () => {
        this.updateTurnConfigFromSignal();
        this.state = "CONNECTED";
        this.joinInfo &&
          t.joinGateway(this.joinInfo.sid, {
            lts: this.joinGatewayStartTime,
            succ: !0,
            ec: null,
            vid: this.joinInfo.vid,
            addr: this.signal.url,
            uid: this.joinInfo.uid,
            cid: this.joinInfo.cid,
          });
      });
      this.signal.on(Y.ON_UPLINK_STATS, (a) => {
        this._statsCollector.updateUplinkStats(a);
      });
      this.signal.on(N.REQUEST_RECOVER, (a, b, d) => {
        if (!this.joinInfo)
          return d(
            new m(l.UNEXPECTED_ERROR, "gateway: can not recover, no join info")
          );
        a && ((this.joinInfo.multiIP = a), (this.hasChangeBGPAddress = !0));
        this.isSignalRecover = !0;
        Ma(this, ya.REQUEST_NEW_GATEWAY_LIST).then(b).catch(d);
      });
      this.signal.on(N.REQUEST_JOIN_INFO, (a) => {
        a(this.getJoinMessage());
      });
      this.signal.on(N.REQUEST_REJOIN_INFO, (a) => {
        a(this.getRejoinMessage());
      });
      this.signal.on(N.REPORT_JOIN_GATEWAY, (a, b) => {
        this.joinInfo &&
          t.joinGateway(this.joinInfo.sid, {
            lts: this.joinGatewayStartTime,
            succ: !1,
            ec: a,
            addr: b,
            uid: this.joinInfo.uid,
            cid: this.joinInfo.cid,
          });
      });
      this.signal.on(N.IS_P2P_DISCONNECTED, (a) => {
        a(ad(this, ya.IS_P2P_DISCONNECTED));
      });
      this.signal.on(N.DISCONNECT_P2P, () => {
        this.needToSendUnpubUnsub = new Z();
        this.emit(ya.DISCONNECT_P2P);
      });
      this.signal.on(N.NEED_RENEW_SESSION, () => {
        this.emit(ya.NEED_RENEW_SESSION);
      });
      this.signal.on(N.REQUEST_SUCCESS, () => {
        this._signalTimeout = !1;
      });
      this.signal.on(N.REQUEST_TIMEOUT, () => {
        this._signalTimeout = !0;
      });
    }
  }
  class Ip {
    constructor(a) {
      this.client = a;
    }
    updateConfig(a, b) {
      if (b) {
        null != b.uploadLog &&
          (Xb("UPLOAD_LOG", b.uploadLog),
          t
            .reportApiInvoke(this.client._sessionId || null, {
              name: y.SET_CONFIG_DISTRIBUTE,
              options: { feature: "uploadLog", value: b.uploadLog },
            })
            .onSuccess());
        null != b.dualStream &&
          ((this.client._isDualStreamEnabled = b.dualStream),
          t
            .reportApiInvoke(this.client._sessionId || null, {
              name: y.SET_CONFIG_DISTRIBUTE,
              options: { feature: "dualStream", value: b.dualStream },
            })
            .onSuccess());
        null == b.streamFallbackOptions ||
          (this.client._defaultStreamFallbackType = b.streamFallbackOptions);
        try {
          var d, e;
          h.debug(
            n((d = "[".concat(a, "] setParameter in distribution: "))).call(
              d,
              z(b)
            )
          );
          A((e = S(b))).call(e, (a) => Xb(a, b[a]));
        } catch (g) {
          var f;
          h.debug(
            n(
              (f = "[".concat(a, "] setParameter in distribution failed: "))
            ).call(f, z(b))
          );
        }
      }
    }
  }
  let ef = 1,
    ff = 1,
    di = (a) => {
      const b = S(we);
      for (let f = 0; f < b.length; f++) {
        var d, e;
        const g = b[f],
          k = we[g];
        if (
          (yc || "CHINA" !== g) &&
          (Aa((d = k.WEBCS_DOMAIN)).call(d, a) ||
            Aa((e = k.WEBCS_DOMAIN_BACKUP_LIST)).call(e, a))
        )
          return "OVERSEA" === k.CODE
            ? "AS".concat(",", "EU", ",", "AF", ",", "NA", ",", "SA", ",", "OC")
            : k.CODE;
      }
    },
    Jp = (a) => {
      const b = {
        CODE: "",
        WEBCS_DOMAIN: [],
        WEBCS_DOMAIN_BACKUP_LIST: [],
        PROXY_CS: [],
        CDS_AP: [],
        ACCOUNT_REGISTER: [],
        UAP_AP: [],
        EVENT_REPORT_DOMAIN: [],
        EVENT_REPORT_BACKUP_DOMAIN: [],
        LOG_UPLOAD_SERVER: [],
      };
      return (
        A(a).call(a, (a) => {
          const d = we[a];
          (a = S(d)) &&
            A(a).call(a, (a) => {
              var e;
              "CODE" !== a && (b[a] = n((e = b[a])).call(e, d[a]));
            });
        }),
        b
      );
    };
  var vg = (function () {
      function a(a) {
        this.input = [];
        this.size = a;
      }
      return (
        (a.prototype.add = function (a) {
          this.input.push(a);
          this.input.length > this.size && this.input.splice(0, 1);
        }),
        (a.prototype.diffMean = function () {
          return 0 === this.input.length
            ? 0
            : (this.input[this.input.length - 1] - this.input[0]) /
                this.input.length;
        }),
        a
      );
    })(),
    gi = function (a, b) {
      return (gi =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (a, b) {
            a.__proto__ = b;
          }) ||
        function (a, b) {
          for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        })(a, b);
    },
    wg = function () {
      return (wg =
        Object.assign ||
        function (a) {
          for (var b, d = 1, e = arguments.length; d < e; d++)
            for (var f in (b = arguments[d]))
              Object.prototype.hasOwnProperty.call(b, f) && (a[f] = b[f]);
          return a;
        }).apply(this, arguments);
    },
    yd = {
      timestamp: 0,
      bitrate: { actualEncoded: 0, transmit: 0 },
      sendPacketLossRate: 0,
      recvPacketLossRate: 0,
      videoRecv: [],
      videoSend: [],
      audioRecv: [],
      audioSend: [],
    },
    Yk = {
      firsCount: 0,
      nacksCount: 0,
      plisCount: 0,
      framesDecodeCount: 0,
      framesDecodeInterval: 0,
      framesDecodeFreezeTime: 0,
      decodeFrameRate: 0,
      bytes: 0,
      packetsLost: 0,
      packetLostRate: 0,
      packets: 0,
      ssrc: 0,
    },
    Zk = {
      firsCount: 0,
      nacksCount: 0,
      plisCount: 0,
      frameCount: 0,
      bytes: 0,
      packets: 0,
      packetsLost: 0,
      packetLostRate: 0,
      ssrc: 0,
      rttMs: 0,
    },
    $k = {
      bytes: 0,
      packets: 0,
      packetsLost: 0,
      packetLostRate: 0,
      ssrc: 0,
      rttMs: 0,
    },
    al = {
      jitterBufferMs: 0,
      jitterMs: 0,
      bytes: 0,
      packetsLost: 0,
      packetLostRate: 0,
      packets: 0,
      ssrc: 0,
      receivedFrames: 0,
      droppedFrames: 0,
    },
    xg = (function () {
      function a(a, d) {
        var b = this;
        this.videoIsReady = !1;
        this.stats = hb(yd);
        this.isFirstAudioDecoded =
          this.isFirstAudioReceived =
          this.isFirstVideoDecoded =
          this.isFirstVideoReceived =
            !1;
        this.lossRateWindowStats = [];
        this.pc = a;
        this.options = d;
        this.intervalTimer = window.setInterval(function () {
          return hf(b, void 0, void 0, function () {
            return jf(this, function (a) {
              return this.updateStats(), [2];
            });
          });
        }, this.options.updateInterval);
      }
      return (
        (a.prototype.getStats = function () {
          return this.stats;
        }),
        (a.prototype.setVideoIsReady = function (a) {
          this.videoIsReady = a;
        }),
        (a.prototype.destroy = function () {
          window.clearInterval(this.intervalTimer);
        }),
        (a.prototype.calcLossRate = function (a) {
          var b = this;
          this.lossRateWindowStats.push(a);
          this.lossRateWindowStats.length > this.options.lossRateInterval &&
            this.lossRateWindowStats.splice(0, 1);
          for (
            var e = this.lossRateWindowStats.length,
              f = 0,
              g = 0,
              k = 0,
              h = 0,
              l = function (d) {
                a[d].forEach(function (a, q) {
                  if (
                    b.lossRateWindowStats[e - 1][d][q] &&
                    b.lossRateWindowStats[0][d][q]
                  ) {
                    var l =
                      b.lossRateWindowStats[e - 1][d][q].packets -
                      b.lossRateWindowStats[0][d][q].packets;
                    q =
                      b.lossRateWindowStats[e - 1][d][q].packetsLost -
                      b.lossRateWindowStats[0][d][q].packetsLost;
                    "videoSend" === d || "audioSend" === d
                      ? ((f += l), (k += q))
                      : ((g += l), (h += q));
                    Number.isNaN(l) || Number.isNaN(l)
                      ? (a.packetLostRate = 0)
                      : (a.packetLostRate = 0 >= l || 0 >= q ? 0 : q / l);
                  }
                });
              },
              n = 0,
              m = ["videoSend", "audioSend", "videoRecv", "audioRecv"];
            n < m.length;
            n++
          )
            l(m[n]);
          a.sendPacketLossRate = 0 >= f || 0 >= k ? 0 : k / f;
          a.recvPacketLossRate = 0 >= g || 0 >= h ? 0 : h / g;
        }),
        a
      );
    })(),
    Kp = (function (a) {
      function b() {
        var b = (null !== a && a.apply(this, arguments)) || this;
        return (b._stats = yd), (b.lastDecodeVideoReceiverStats = new Map()), b;
      }
      return (
        gf(b, a),
        (b.prototype.updateStats = function () {
          return hf(this, void 0, void 0, function () {
            var a, b, f, g;
            return jf(this, function (d) {
              switch (d.label) {
                case 0:
                  return [4, this._getStats()];
                case 1:
                  return (
                    (a = d.sent()),
                    (b = this.statsResponsesToObjects(a)),
                    (this._stats = hb(yd)),
                    (f = b.filter(function (a) {
                      return "ssrc" === a.type;
                    })),
                    this.processSSRCStats(f),
                    (g = b.find(function (a) {
                      return "VideoBwe" === a.type;
                    })) && this.processBandwidthStats(g),
                    (this._stats.timestamp = Date.now()),
                    this.calcLossRate(this._stats),
                    (this.stats = this._stats),
                    [2]
                  );
              }
            });
          });
        }),
        (b.prototype.processBandwidthStats = function (a) {
          this._stats.bitrate = {
            actualEncoded: Number(a.googActualEncBitrate),
            targetEncoded: Number(a.googTargetEncBitrate),
            retransmit: Number(a.googRetransmitBitrate),
            transmit: Number(a.googTransmitBitrate),
          };
          this._stats.sendBandwidth = Number(a.googAvailableSendBandwidth);
        }),
        (b.prototype.processSSRCStats = function (a) {
          var b = this;
          a.forEach(function (a) {
            var d = a.id.includes("send");
            switch (a.mediaType + "_" + (d ? "send" : "recv")) {
              case "video_send":
                d = hb(Zk);
                d.codec = a.googCodecName;
                d.adaptionChangeReason = "none";
                a.googCpuLimitedResolution && (d.adaptionChangeReason = "cpu");
                a.googBandwidthLimitedResolution &&
                  (d.adaptionChangeReason = "bandwidth");
                d.avgEncodeMs = Number(a.googAvgEncodeMs);
                d.inputFrame = {
                  width:
                    Number(a.googFrameWidthInput) ||
                    Number(a.googFrameWidthSent),
                  height:
                    Number(a.googFrameHeightInput) ||
                    Number(a.googFrameHeightSent),
                  frameRate: Number(a.googFrameRateInput),
                };
                d.sentFrame = {
                  width: Number(a.googFrameWidthSent),
                  height: Number(a.googFrameHeightSent),
                  frameRate: Number(a.googFrameRateInput),
                };
                d.firsCount = Number(a.googFirReceived);
                d.nacksCount = Number(a.googNacksReceived);
                d.plisCount = Number(a.googPlisReceived);
                d.frameCount = Number(a.framesEncoded);
                d.bytes = Number(a.bytesSent);
                d.packets = Number(a.packetsSent);
                d.packetsLost = Number(a.packetsLost);
                d.ssrc = Number(a.ssrc);
                d.rttMs = Number(a.googRtt || 0);
                b._stats.videoSend.push(d);
                b._stats.rtt = d.rttMs;
                break;
              case "video_recv":
                d = hb(Yk);
                var e = b.lastDecodeVideoReceiverStats.get(Number(a.ssrc));
                if (
                  ((d.codec = a.googCodecName),
                  (d.targetDelayMs = Number(a.googTargetDelayMs)),
                  (d.renderDelayMs = Number(a.googRenderDelayMs)),
                  (d.currentDelayMs = Number(a.googCurrentDelayMs)),
                  (d.minPlayoutDelayMs = Number(a.googMinPlayoutDelayMs)),
                  (d.decodeMs = Number(a.googDecodeMs)),
                  (d.maxDecodeMs = Number(a.googMaxDecodeMs)),
                  (d.receivedFrame = {
                    width: Number(a.googFrameWidthReceived),
                    height: Number(a.googFrameHeightReceived),
                    frameRate: Number(a.googFrameRateReceived),
                  }),
                  (d.decodedFrame = {
                    width: Number(a.googFrameWidthReceived),
                    height: Number(a.googFrameHeightReceived),
                    frameRate: Number(a.googFrameRateDecoded),
                  }),
                  (d.outputFrame = {
                    width: Number(a.googFrameWidthReceived),
                    height: Number(a.googFrameHeightReceived),
                    frameRate: Number(a.googFrameRateOutput),
                  }),
                  (d.jitterBufferMs = Number(a.googJitterBufferMs)),
                  (d.firsCount = Number(a.googFirsSent)),
                  (d.nacksCount = Number(a.googNacksSent)),
                  (d.plisCount = Number(a.googPlisSent)),
                  (d.framesDecodeCount = Number(a.framesDecoded)),
                  (d.bytes = Number(a.bytesReceived)),
                  (d.packets = Number(a.packetsReceived)),
                  (d.packetsLost = Number(a.packetsLost)),
                  (d.ssrc = Number(a.ssrc)),
                  0 < d.packets &&
                    !b.isFirstVideoReceived &&
                    (b.onFirstVideoReceived && b.onFirstVideoReceived(),
                    (b.isFirstVideoReceived = !0)),
                  0 < d.framesDecodeCount &&
                    !b.isFirstVideoDecoded &&
                    (b.onFirstVideoDecoded &&
                      b.onFirstVideoDecoded(
                        d.decodedFrame.width,
                        d.decodedFrame.height
                      ),
                    (b.isFirstVideoDecoded = !0)),
                  e)
                ) {
                  a = e.stats;
                  var f = Date.now() - e.lts;
                  d.framesDecodeFreezeTime = a.framesDecodeFreezeTime;
                  d.framesDecodeInterval = a.framesDecodeInterval;
                  d.framesDecodeCount > a.framesDecodeCount &&
                  b.isFirstVideoDecoded
                    ? ((e.lts = Date.now()),
                      (d.framesDecodeInterval = f),
                      500 <= d.framesDecodeInterval &&
                        (b.videoIsReady
                          ? (d.framesDecodeFreezeTime += d.framesDecodeInterval)
                          : b.setVideoIsReady(!0)))
                    : d.framesDecodeCount < e.stats.framesDecodeCount &&
                      (d.framesDecodeInterval = 0);
                }
                b.lastDecodeVideoReceiverStats.set(d.ssrc, {
                  stats: wg({}, d),
                  lts: Date.now(),
                });
                b._stats.videoRecv.push(d);
                break;
              case "audio_recv":
                d = hb(al);
                d.codec = a.googCodecName;
                d.outputLevel = Math.abs(Number(a.audioOutputLevel)) / 32767;
                d.decodingCNG = Number(a.googDecodingCNG);
                d.decodingCTN = Number(a.googDecodingCTN);
                d.decodingCTSG = Number(a.googDecodingCTSG);
                d.decodingNormal = Number(a.googDecodingNormal);
                d.decodingPLC = Number(a.googDecodingPLC);
                d.decodingPLCCNG = Number(a.googDecodingPLCCNG);
                d.expandRate = Number(a.googExpandRate);
                d.accelerateRate = Number(a.googAccelerateRate);
                d.preemptiveExpandRate = Number(a.googPreemptiveExpandRate);
                d.secondaryDecodedRate = Number(a.googSecondaryDecodedRate);
                d.speechExpandRate = Number(a.googSpeechExpandRate);
                d.preferredJitterBufferMs = Number(
                  a.googPreferredJitterBufferMs
                );
                d.jitterBufferMs = Number(a.googJitterBufferMs);
                d.jitterMs = Number(a.googJitterReceived);
                d.bytes = Number(a.bytesReceived);
                d.packets = Number(a.packetsReceived);
                d.packetsLost = Number(a.packetsLost);
                d.ssrc = Number(a.ssrc);
                d.receivedFrames =
                  Number(a.googDecodingCTN) || Number(a.packetsReceived);
                d.droppedFrames =
                  Number(a.googDecodingPLC) + Number(a.googDecodingPLCCNG) ||
                  Number(a.packetsLost);
                0 < d.receivedFrames &&
                  !b.isFirstAudioReceived &&
                  (b.onFirstAudioReceived && b.onFirstAudioReceived(),
                  (b.isFirstAudioReceived = !0));
                0 < d.decodingNormal &&
                  !b.isFirstAudioDecoded &&
                  (b.onFirstAudioDecoded && b.onFirstAudioDecoded(),
                  (b.isFirstAudioDecoded = !0));
                b._stats.audioRecv.push(d);
                break;
              case "audio_send":
                (d = hb($k)),
                  (d.codec = a.googCodecName),
                  (d.inputLevel = Math.abs(Number(a.audioInputLevel)) / 32767),
                  (d.aecReturnLoss = Number(
                    a.googEchoCancellationReturnLoss || 0
                  )),
                  (d.aecReturnLossEnhancement = Number(
                    a.googEchoCancellationReturnLossEnhancement || 0
                  )),
                  (d.residualEchoLikelihood = Number(
                    a.googResidualEchoLikelihood || 0
                  )),
                  (d.residualEchoLikelihoodRecentMax = Number(
                    a.googResidualEchoLikelihoodRecentMax || 0
                  )),
                  (d.bytes = Number(a.bytesSent)),
                  (d.packets = Number(a.packetsSent)),
                  (d.packetsLost = Number(a.packetsLost)),
                  (d.ssrc = Number(a.ssrc)),
                  (d.rttMs = Number(a.googRtt || 0)),
                  (b._stats.rtt = d.rttMs),
                  b._stats.audioSend.push(d);
            }
          });
        }),
        (b.prototype._getStats = function () {
          var a = this;
          return new Promise(function (b, d) {
            a.pc.getStats(b, d);
          });
        }),
        (b.prototype.statsResponsesToObjects = function (a) {
          var b = [];
          return (
            a.result().forEach(function (a) {
              var d = {
                id: a.id,
                timestamp: a.timestamp.valueOf().toString(),
                type: a.type,
              };
              a.names().forEach(function (b) {
                d[b] = a.stat(b);
              });
              b.push(d);
            }),
            b
          );
        }),
        b
      );
    })(xg),
    dc;
  !(function (a) {
    a.CERTIFICATE = "certificate";
    a.CODEC = "codec";
    a.CANDIDATE_PAIR = "candidate-pair";
    a.LOCAL_CANDIDATE = "local-candidate";
    a.REMOTE_CANDIDATE = "remote-candidate";
    a.INBOUND = "inbound-rtp";
    a.TRACK = "track";
    a.OUTBOUND = "outbound-rtp";
    a.PC = "peer-connection";
    a.REMOTE_INBOUND = "remote-inbound-rtp";
    a.REMOTE_OUTBOUND = "remote-outbound-rtp";
    a.TRANSPORT = "transport";
    a.CSRC = "csrc";
    a.DATA_CHANNEL = "data-channel";
    a.STREAM = "stream";
    a.SENDER = "sender";
    a.RECEIVER = "receiver";
  })(dc || (dc = {}));
  var bl = (function (a) {
      function b() {
        var b = (null !== a && a.apply(this, arguments)) || this;
        return (
          (b._stats = yd),
          (b.lastDecodeVideoReceiverStats = new Map()),
          (b.lastVideoFramesRecv = new Map()),
          (b.lastVideoFramesSent = new Map()),
          (b.lastVideoFramesDecode = new Map()),
          (b.mediaBytesSent = new Map()),
          (b.mediaBytesRetransmit = new Map()),
          (b.mediaBytesTargetEncode = new Map()),
          (b.lastEncoderMs = new Map()),
          b
        );
      }
      return (
        gf(b, a),
        (b.prototype.updateStats = function () {
          return hf(this, void 0, void 0, function () {
            var a,
              b = this;
            return jf(this, function (d) {
              switch (d.label) {
                case 0:
                  return (a = this), [4, this.pc.getStats()];
                case 1:
                  return (
                    (a.report = d.sent()),
                    (this._stats = hb(yd)),
                    this.report.forEach(function (a) {
                      switch (a.type) {
                        case dc.OUTBOUND:
                          "audio" === a.mediaType
                            ? b.processAudioOutboundStats(a)
                            : "video" === a.mediaType &&
                              b.processVideoOutboundStats(a);
                          break;
                        case dc.INBOUND:
                          "audio" === a.mediaType
                            ? b.processAudioInboundStats(a)
                            : "video" === a.mediaType &&
                              b.processVideoInboundStats(a);
                          break;
                        case dc.TRANSPORT:
                          (a = b.report.get(a.selectedCandidatePairId)) &&
                            b.processCandidatePairStats(a);
                          break;
                        case dc.CANDIDATE_PAIR:
                          a.selected && b.processCandidatePairStats(a);
                      }
                    }),
                    this.updateSendBitrate(),
                    (this._stats.timestamp = Date.now()),
                    this.calcLossRate(this._stats),
                    (this.stats = this._stats),
                    [2]
                  );
              }
            });
          });
        }),
        (b.prototype.processCandidatePairStats = function (a) {
          this._stats.sendBandwidth = a.availableOutgoingBitrate || 0;
          a.currentRoundTripTime &&
            (this._stats.rtt = 1e3 * a.currentRoundTripTime);
          this._stats.videoSend.forEach(function (b) {
            !b.rttMs &&
              a.currentRoundTripTime &&
              (b.rttMs = 1e3 * a.currentRoundTripTime);
          });
          this._stats.audioSend.forEach(function (b) {
            !b.rttMs &&
              a.currentRoundTripTime &&
              (b.rttMs = 1e3 * a.currentRoundTripTime);
          });
        }),
        (b.prototype.processAudioInboundStats = function (a) {
          var b = this._stats.audioRecv.find(function (b) {
            return b.ssrc === a.ssrc;
          });
          b || ((b = hb(al)), this._stats.audioRecv.push(b));
          b.ssrc = a.ssrc;
          b.packets = a.packetsReceived;
          b.packetsLost = a.packetsLost;
          b.bytes = a.bytesReceived;
          b.jitterMs = 1e3 * a.jitter;
          a.trackId && this.processAudioTrackReceiverStats(a.trackId, b);
          a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId));
          b.receivedFrames || (b.receivedFrames = a.packetsReceived);
          b.droppedFrames || (b.droppedFrames = a.packetsLost);
          0 < b.receivedFrames &&
            !this.isFirstAudioReceived &&
            (this.onFirstAudioReceived && this.onFirstAudioReceived(),
            (this.isFirstAudioReceived = !0));
          b.outputLevel &&
            0 < b.outputLevel &&
            !this.isFirstAudioDecoded &&
            (this.onFirstAudioDecoded && this.onFirstAudioDecoded(),
            (this.isFirstAudioDecoded = !0));
        }),
        (b.prototype.processVideoInboundStats = function (a) {
          var b = this._stats.videoRecv.find(function (b) {
            return b.ssrc === a.ssrc;
          });
          b || ((b = hb(Yk)), this._stats.videoRecv.push(b));
          b.ssrc = a.ssrc;
          b.packets = a.packetsReceived;
          b.packetsLost = a.packetsLost;
          b.bytes = a.bytesReceived;
          b.firsCount = a.firCount;
          b.nacksCount = a.nackCount;
          b.plisCount = a.pliCount;
          b.framesDecodeCount = a.framesDecoded;
          var d = this.lastDecodeVideoReceiverStats.get(b.ssrc),
            g = this.lastVideoFramesDecode.get(b.ssrc),
            k = Date.now();
          if (0 < b.framesDecodeCount && !this.isFirstVideoDecoded) {
            var h = b.decodedFrame ? b.decodedFrame.width : 0,
              l = b.decodedFrame ? b.decodedFrame.height : 0;
            this.onFirstVideoDecoded && this.onFirstVideoDecoded(h, l);
            this.isFirstVideoDecoded = !0;
          }
          d &&
            ((h = d.stats),
            (l = k - d.lts),
            (b.framesDecodeFreezeTime = h.framesDecodeFreezeTime),
            (b.framesDecodeInterval = h.framesDecodeInterval),
            b.framesDecodeCount > h.framesDecodeCount &&
            this.isFirstVideoDecoded
              ? ((d.lts = Date.now()),
                (b.framesDecodeInterval = l),
                500 <= b.framesDecodeInterval &&
                  (this.videoIsReady
                    ? (b.framesDecodeFreezeTime += b.framesDecodeInterval)
                    : this.setVideoIsReady(!0)))
              : b.framesDecodeCount < h.framesDecodeCount &&
                (b.framesDecodeInterval = 0));
          g && 800 <= k - g.lts
            ? ((b.decodeFrameRate = Math.round(
                (b.framesDecodeCount - g.count) / ((k - g.lts) / 1e3)
              )),
              this.lastVideoFramesDecode.set(b.ssrc, {
                count: b.framesDecodeCount,
                lts: k,
                rate: b.decodeFrameRate,
              }))
            : g
            ? (b.decodeFrameRate = g.rate)
            : this.lastVideoFramesDecode.set(b.ssrc, {
                count: b.framesDecodeCount,
                lts: k,
                rate: 0,
              });
          a.totalDecodeTime && (b.decodeMs = 1e3 * a.totalDecodeTime);
          a.trackId && this.processVideoTrackReceiverStats(a.trackId, b);
          a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId));
          a.framerateMean && (b.framesRateFirefox = a.framerateMean);
          0 < b.packets &&
            !this.isFirstVideoReceived &&
            (this.onFirstVideoReceived && this.onFirstVideoReceived(),
            (this.isFirstVideoReceived = !0));
          this.lastDecodeVideoReceiverStats.set(b.ssrc, {
            stats: wg({}, b),
            lts: d ? d.lts : Date.now(),
          });
        }),
        (b.prototype.processVideoOutboundStats = function (a) {
          var b = this._stats.videoSend.find(function (b) {
            return b.ssrc === a.ssrc;
          });
          b || ((b = hb(Zk)), this._stats.videoSend.push(b));
          var d = this.mediaBytesSent.get(a.ssrc);
          d
            ? d.add(a.bytesSent)
            : ((g = new vg(10)).add(a.bytesSent),
              this.mediaBytesSent.set(a.ssrc, g));
          void 0 !== a.retransmittedBytesSent &&
            ((d = this.mediaBytesRetransmit.get(a.ssrc))
              ? d.add(a.retransmittedBytesSent)
              : ((g = new vg(10)).add(a.retransmittedBytesSent),
                this.mediaBytesRetransmit.set(a.ssrc, g)));
          if (a.totalEncodedBytesTarget) {
            var g;
            (d = this.mediaBytesTargetEncode.get(a.ssrc))
              ? d.add(a.totalEncodedBytesTarget)
              : ((g = new vg(10)).add(a.totalEncodedBytesTarget),
                this.mediaBytesTargetEncode.set(a.ssrc, g));
          }
          if (
            ((b.ssrc = a.ssrc),
            (b.bytes = a.bytesSent),
            (b.packets = a.packetsSent),
            (b.firsCount = a.firCount),
            (b.nacksCount = a.nackCount),
            (b.plisCount = a.pliCount),
            (b.frameCount = a.framesEncoded),
            (b.adaptionChangeReason = a.qualityLimitationReason),
            a.totalEncodeTime && a.framesEncoded)
          )
            (d = this.lastEncoderMs.get(a.ssrc)),
              (b.avgEncodeMs =
                !d || d.lastFrameCount > a.framesEncoded
                  ? (1e3 * a.totalEncodeTime) / a.framesEncoded
                  : (1e3 * (a.totalEncodeTime - d.lastEncoderTime)) /
                    (a.framesEncoded - d.lastFrameCount)),
              this.lastEncoderMs.set(a.ssrc, {
                lastFrameCount: a.framesEncoded,
                lastEncoderTime: a.totalEncodeTime,
                lts: Date.now(),
              });
          (a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId)),
          a.mediaSourceId && this.processVideoMediaSource(a.mediaSourceId, b),
          a.trackId && this.processVideoTrackSenderStats(a.trackId, b),
          a.remoteId)
            ? this.processRemoteInboundStats(a.remoteId, b)
            : (d = this.findRemoteStatsId(a.ssrc, dc.REMOTE_INBOUND)) &&
              this.processRemoteInboundStats(d, b);
        }),
        (b.prototype.processAudioOutboundStats = function (a) {
          var b = this._stats.audioSend.find(function (b) {
            return b.ssrc === a.ssrc;
          });
          if (
            (b || ((b = hb($k)), this._stats.audioSend.push(b)),
            (b.ssrc = a.ssrc),
            (b.packets = a.packetsSent),
            (b.bytes = a.bytesSent),
            a.mediaSourceId && this.processAudioMediaSource(a.mediaSourceId, b),
            a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId)),
            a.trackId && this.processAudioTrackSenderStats(a.trackId, b),
            a.remoteId)
          )
            this.processRemoteInboundStats(a.remoteId, b);
          else {
            var d = this.findRemoteStatsId(a.ssrc, dc.REMOTE_INBOUND);
            d && this.processRemoteInboundStats(d, b);
          }
        }),
        (b.prototype.findRemoteStatsId = function (a, b) {
          var d = Array.from(this.report.values()).find(function (d) {
            return d.type === b && d.ssrc === a;
          });
          return d ? d.id : null;
        }),
        (b.prototype.processVideoMediaSource = function (a, b) {
          (a = this.report.get(a)) &&
            a.width &&
            a.height &&
            a.framesPerSecond &&
            (b.inputFrame = {
              width: a.width,
              height: a.height,
              frameRate: a.framesPerSecond,
            });
        }),
        (b.prototype.processAudioMediaSource = function (a, b) {
          (a = this.report.get(a)) && (b.inputLevel = a.audioLevel);
        }),
        (b.prototype.processVideoTrackSenderStats = function (a, b) {
          if ((a = this.report.get(a))) {
            var d = 0,
              e = Date.now(),
              k = this.lastVideoFramesSent.get(b.ssrc);
            k && 800 <= e - k.lts
              ? ((d = Math.round(
                  (a.framesSent - k.count) / ((e - k.lts) / 1e3)
                )),
                this.lastVideoFramesSent.set(b.ssrc, {
                  count: a.framesSent,
                  lts: e,
                  rate: d,
                }))
              : k
              ? (d = k.rate)
              : this.lastVideoFramesSent.set(b.ssrc, {
                  count: a.framesSent,
                  lts: e,
                  rate: 0,
                });
            b.sentFrame = {
              width: a.frameWidth,
              height: a.frameHeight,
              frameRate: d,
            };
          }
        }),
        (b.prototype.processVideoTrackReceiverStats = function (a, b) {
          if ((a = this.report.get(a))) {
            var d = this.lastVideoFramesRecv.get(b.ssrc),
              e = Date.now();
            b.framesReceivedCount = a.framesReceived;
            var k = 0;
            d && 800 <= e - d.lts
              ? ((k = Math.round(
                  (a.framesReceived - d.count) / ((e - d.lts) / 1e3)
                )),
                this.lastVideoFramesRecv.set(b.ssrc, {
                  count: a.framesReceived,
                  lts: e,
                  rate: k,
                }))
              : d
              ? (k = d.rate)
              : this.lastVideoFramesRecv.set(b.ssrc, {
                  count: a.framesReceived,
                  lts: e,
                  rate: 0,
                });
            b.receivedFrame = {
              width: a.frameWidth || 0,
              height: a.frameHeight || 0,
              frameRate: k || 0,
            };
            b.decodedFrame = {
              width: a.frameWidth || 0,
              height: a.frameHeight || 0,
              frameRate: b.decodeFrameRate || 0,
            };
            b.outputFrame = {
              width: a.frameWidth || 0,
              height: a.frameHeight || 0,
              frameRate: b.decodeFrameRate || 0,
            };
            a.jitterBufferDelay &&
              a.jitterBufferEmittedCount &&
              ((b.jitterBufferMs =
                (1e3 * a.jitterBufferDelay) / a.jitterBufferEmittedCount),
              (b.currentDelayMs =
                (1e3 * a.jitterBufferDelay) / a.jitterBufferEmittedCount));
          }
        }),
        (b.prototype.processAudioTrackSenderStats = function (a, b) {
          (a = this.report.get(a)) &&
            ((b.aecReturnLoss = a.echoReturnLoss || 0),
            (b.aecReturnLossEnhancement = a.echoReturnLossEnhancement || 0));
        }),
        (b.prototype.processAudioTrackReceiverStats = function (a, b) {
          if ((a = this.report.get(a))) {
            a.removedSamplesForAcceleration &&
              a.totalSamplesReceived &&
              (b.accelerateRate =
                a.removedSamplesForAcceleration / a.totalSamplesReceived);
            a.jitterBufferDelay &&
              a.jitterBufferEmittedCount &&
              (b.jitterBufferMs =
                (1e3 * a.jitterBufferDelay) / a.jitterBufferEmittedCount);
            b.outputLevel = a.audioLevel;
            var d = 1920;
            a.totalSamplesDuration &&
              a.totalSamplesReceived &&
              ((d = a.totalSamplesReceived / a.totalSamplesDuration / 50),
              (b.receivedFrames = Math.round(a.totalSamplesReceived / d)));
            a.concealedSamples &&
              (b.droppedFrames = Math.round(a.concealedSamples / d));
          }
        }),
        (b.prototype.processRemoteInboundStats = function (a, b) {
          (a = this.report.get(a)) &&
            ((b.packetsLost = a.packetsLost),
            a.roundTripTime && (b.rttMs = 1e3 * a.roundTripTime));
        }),
        (b.prototype.getCodecFromCodecStats = function (a) {
          a = this.report.get(a);
          return a
            ? (a = a.mimeType.match(/\/(.*)$/)) && a[1]
              ? a[1]
              : ""
            : "";
        }),
        (b.prototype.updateSendBitrate = function () {
          var a = 0,
            b = null,
            f = null;
          this.mediaBytesSent.forEach(function (b) {
            a += b.diffMean();
          });
          this.mediaBytesRetransmit.forEach(function (a) {
            b = null === b ? a.diffMean() : b + a.diffMean();
          });
          this.mediaBytesTargetEncode.forEach(function (a) {
            f = null === f ? a.diffMean() : f + a.diffMean();
          });
          this._stats.bitrate = {
            actualEncoded:
              (8 * (null !== b ? a - b : a)) /
              (this.options.updateInterval / 1e3),
            transmit: (8 * a) / (this.options.updateInterval / 1e3),
          };
          null !== b &&
            (this._stats.bitrate.retransmit =
              (8 * b) / (this.options.updateInterval / 1e3));
          null !== f &&
            (this._stats.bitrate.targetEncoded =
              (8 * f) / (this.options.updateInterval / 1e3));
        }),
        b
      );
    })(xg),
    Lp = (function (a) {
      function b() {
        return (null !== a && a.apply(this, arguments)) || this;
      }
      return (
        gf(b, a),
        (b.prototype.updateStats = function () {
          return Promise.resolve();
        }),
        b
      );
    })(xg);
  class cl {
    constructor(a) {
      this.localCandidateCount = 0;
      this.allCandidateReceived = !1;
      this.videoTrack = this.audioTrack = null;
      this.mediaStream = new MediaStream();
      this.ID = dl;
      dl += 1;
      this.spec = a;
      this.createPeerConnection();
      a = this.pc;
      var b = void 0,
        d = void 0;
      void 0 === b && (b = 250);
      void 0 === d && (d = 8);
      var e;
      this.statsFilter = (e =
        (e = navigator.userAgent.toLocaleLowerCase().match(/chrome\/[\d]./i)) &&
        e[0]
          ? Number(e[0].split("/")[1])
          : null)
        ? 76 > e
          ? new Kp(a, { updateInterval: b, lossRateInterval: d })
          : new bl(a, { updateInterval: b, lossRateInterval: d })
        : window.RTCStatsReport && a.getStats() instanceof Promise
        ? new bl(a, { updateInterval: b, lossRateInterval: d })
        : new Lp(a, { updateInterval: b, lossRateInterval: d });
    }
    get _statsFilter() {
      return this.statsFilter;
    }
    getStats() {
      return this.statsFilter.getStats();
    }
    async createOfferSDP() {
      try {
        let a = await this.pc.createOffer(this.offerOptions);
        if (!a.sdp) throw Error("offer sdp is empty");
        return a.sdp;
      } catch (a) {
        throw (
          (h.error("create offer error:", a.toString()),
          new m(l.CREATE_OFFER_FAILED, a.toString()))
        );
      }
    }
    async setOfferSDP(a) {
      try {
        await this.pc.setLocalDescription({ type: "offer", sdp: a });
      } catch (b) {
        throw (
          (h.error("set local offer error", b.toString()),
          new m(l.CREATE_OFFER_FAILED, b.toString()))
        );
      }
    }
    async setAnswerSDP(a) {
      try {
        await this.pc.setRemoteDescription({ type: "answer", sdp: a });
      } catch (b) {
        if (
          "InvalidStateError" !== b.name ||
          "stable" !== this.pc.signalingState
        )
          throw (
            (h.error("set remote answer error", b.toString()),
            new m(l.SET_ANSWER_FAILED, b.toString()))
          );
        h.debug("[pc-".concat(this.ID, "] ignore invalidstate error"));
      }
    }
    close() {
      this.onConnectionStateChange = this.onICEConnectionStateChange = void 0;
      try {
        this.pc.close();
      } catch (a) {}
      this.statsFilter.destroy();
    }
    createPeerConnection() {
      let a = { iceServers: [{ urls: "stun:webcs.agora.io:3478" }] };
      var b;
      this.spec.iceServers
        ? (a.iceServers = this.spec.iceServers)
        : this.spec.turnServer &&
          "off" !== this.spec.turnServer.mode &&
          r((b = this.spec.turnServer.servers)).call(b, (b) => {
            var d, f;
            (a.iceServers &&
              a.iceServers.push({
                username: b.username,
                credential: b.password,
                credentialType: "password",
                urls: n((d = "turn:".concat(b.turnServerURL, ":"))).call(
                  d,
                  b.udpport,
                  "?transport=udp"
                ),
              }),
            b.tcpport) &&
              a.iceServers &&
              a.iceServers.push({
                username: b.username,
                credential: b.password,
                credentialType: "password",
                urls: n((f = "turn:".concat(b.turnServerURL, ":"))).call(
                  f,
                  b.tcpport,
                  "?transport=tcp"
                ),
              });
            b.forceturn && (a.iceTransportPolicy = "relay");
          });
      w.CHROME_FORCE_PLAN_B &&
        We() &&
        ((a.sdpSemantics = "plan-b"), (fa.supportUnifiedPlan = !1));
      this.pc = new RTCPeerConnection(a);
      this.pc.oniceconnectionstatechange = () => {
        this.onICEConnectionStateChange &&
          this.onICEConnectionStateChange(this.pc.iceConnectionState);
      };
      this.pc.onconnectionstatechange = () => {
        this.onConnectionStateChange &&
          this.onConnectionStateChange(this.pc.connectionState);
      };
      this.pc.onsignalingstatechange = () => {
        "closed" === this.pc.connectionState &&
          this.onConnectionStateChange &&
          this.onConnectionStateChange(this.pc.connectionState);
      };
      this.pc.onicecandidate = (a) => {
        if (!a.candidate)
          return (
            (this.pc.onicecandidate = null),
            (this.allCandidateReceived = !0),
            void h.debug(
              "[pc-".concat(this.ID, "] local candidate count"),
              this.localCandidateCount
            )
          );
        this.localCandidateCount += 1;
      };
      Ec(() => {
        this.allCandidateReceived ||
          ((this.allCandidateReceived = !0),
          h.debug(
            "[pc-".concat(
              this.ID,
              "] onicecandidate timeout, local candidate count"
            ),
            this.localCandidateCount
          ));
      }, w.CANDIDATE_TIMEOUT);
    }
  }
  class el extends cl {
    constructor(a) {
      super(a);
    }
    async addStream(a) {
      a = a.getTracks();
      for (let b of a) await this.addTrack(b);
    }
    async replaceTrack(a) {
      if (!fa.supportReplaceTrack) {
        var b = "audio" === a.kind ? this.audioTrack : this.videoTrack;
        if (!b) throw new m(l.UNEXPECTED_ERROR, "can not find replaced track");
        return this.removeTrack(b), await this.addTrack(a), !0;
      }
      let d = this.getSender(a.kind),
        e = U((b = this.mediaStream.getTracks())).call(
          b,
          (b) => b.kind === a.kind
        );
      e && this.mediaStream.removeTrack(e);
      this.mediaStream.addTrack(a);
      try {
        await d.replaceTrack(a),
          "audio" === a.kind ? (this.audioTrack = a) : (this.videoTrack = a);
      } catch (f) {
        throw new m(l.SENDER_REPLACE_FAILED, f.toString());
      }
      return !1;
    }
    removeTrack(a) {
      let b = this.getSender(a.kind);
      this.mediaStream.removeTrack(a);
      try {
        this.pc.removeTrack(b);
      } catch (d) {
        h.warning("[pc-".concat(this.ID, "] remove track error, ignore"), d);
      }
      "audio" === a.kind
        ? ((this.audioTrack = null),
          (this.audioSender = void 0),
          this.audioTransceiver &&
            (this.audioTransceiver.direction = "inactive"),
          (this.audioTransceiver = void 0))
        : ((this.videoTrack = null),
          (this.videoSender = void 0),
          this.videoTransceiver &&
            (this.videoTransceiver.direction = "inactive"),
          (this.videoTransceiver = void 0));
    }
    async addTrack(a) {
      let b = fa;
      if (
        ("audio" === a.kind && this.audioTrack) ||
        ("video" === a.kind && this.videoTrack)
      )
        throw new m(l.UNEXPECTED_ERROR, "Can't add multiple stream");
      let d, e;
      this.mediaStream.addTrack(a);
      b.supportUnifiedPlan
        ? ((d = await rm(this.pc, a)), (e = d.sender))
        : (e = this.pc.addTrack(a, this.mediaStream));
      "audio" === a.kind
        ? ((this.audioTrack = a),
          (this.audioSender = e),
          (this.audioTransceiver = d))
        : ((this.videoTrack = a),
          (this.videoSender = e),
          (this.videoTransceiver = d));
    }
    async setRtpSenderParameters(a, b) {
      if (
        (a =
          this.videoSender ||
          (this.videoTransceiver ? this.videoTransceiver.sender : void 0))
      ) {
        var d = a.getParameters();
        d.degradationPreference = b;
        try {
          await a.setParameters(d);
        } catch (e) {
          h.debug(
            "[".concat(this.ID, "] ignore RtpSender.setParameters"),
            e.toString()
          );
        }
      }
    }
    getSender(a) {
      var b = null;
      if (fa.supportUnifiedPlan) {
        var d;
        b = (b = U((d = this.pc.getTransceivers())).call(
          d,
          (b) => b.sender.track && b.sender.track.kind === a
        ))
          ? b.sender
          : null;
      } else {
        var e;
        b =
          U((e = this.pc.getSenders())).call(
            e,
            (b) => b.track && b.track.kind === a
          ) || null;
      }
      if (!b) throw new m(l.SENDER_NOT_FOUND);
      return b;
    }
  }
  class fl extends cl {
    constructor(a) {
      super(a);
      this.statsFilter.onFirstAudioDecoded = () =>
        this.onFirstAudioDecoded && this.onFirstAudioDecoded();
      this.statsFilter.onFirstVideoDecoded = (a, d) =>
        this.onFirstVideoDecoded && this.onFirstVideoDecoded(a, d);
      this.statsFilter.onFirstAudioReceived = () =>
        this.onFirstAudioReceived && this.onFirstAudioReceived();
      this.statsFilter.onFirstVideoReceived = () =>
        this.onFirstVideoReceived && this.onFirstVideoReceived();
      fa.supportUnifiedPlan
        ? ((this.audioTransceiver = this.pc.addTransceiver("audio", {
            direction: "recvonly",
          })),
          (this.videoTransceiver = this.pc.addTransceiver("video", {
            direction: "recvonly",
          })))
        : (this.offerOptions = {
            offerToReceiveAudio: !0,
            offerToReceiveVideo: !0,
          });
      this.pc.ontrack = (a) => {
        "audio" === a.track.kind
          ? (this.audioTrack = a.track)
          : (this.videoTrack = a.track);
        this.onTrack && this.onTrack(a.track, a.streams[0]);
      };
    }
  }
  let dl = 1,
    gl = 1,
    Mp = 1 / 0;
  class hl extends Ya {
    constructor(a, b) {
      super();
      this.startTime = v();
      this.createTime = v();
      this.readyToReconnect = !1;
      this._connectionState = "disconnected";
      this.currentReconnectCount = 0;
      this.ID = gl;
      gl += 1;
      this.joinInfo = a;
      this._userId = b;
      this.createPC();
    }
    get connectionState() {
      return this._connectionState;
    }
    set connectionState(a) {
      a !== this._connectionState &&
        (this.emit(G.CONNECTION_STATE_CHANGE, a, this._connectionState),
        (this._connectionState = a));
    }
    get connectionId() {
      var a, b;
      return n(
        (a = n((b = "".concat(this.joinInfo.clientId, "-"))).call(
          b,
          this.type ? this.type : "sub(".concat(this._userId, ")"),
          "-"
        ))
      ).call(a, this.ID);
    }
    getUserId() {
      return this._userId;
    }
    startUploadStats() {
      this.statsUploadInterval = window.setInterval(() => {
        let a = this.pc.getStats();
        this.uploadStats(a, this.lastUploadPCStats);
        this.lastUploadPCStats = a;
      }, 3e3);
      this.statsUploadSlowInterval = window.setInterval(() => {
        let a = this.pc.getStats();
        this.uploadSlowStats(a);
      }, 6e4);
      this.relatedStatsUploadInterval = window.setInterval(() => {
        let a = this.pc.getStats();
        this.uploadRelatedStats(a, this.lastRelatedPcStats);
        this.lastRelatedPcStats = a;
      }, 1e3);
    }
    stopUploadStats() {
      this.statsUploadInterval &&
        window.clearInterval(this.statsUploadInterval);
      this.relatedStatsUploadInterval &&
        window.clearInterval(this.relatedStatsUploadInterval);
      this.relatedStatsUploadInterval = this.statsUploadInterval = void 0;
    }
    createWaitConnectionConnectedPromise() {
      return new u((a, b) => {
        "disconnected" === this.connectionState
          ? b()
          : "connected" === this.connectionState
          ? a()
          : this.once(G.CONNECTION_STATE_CHANGE, (d) => {
              "connected" === d ? a() : b();
            });
      });
    }
    async reconnectPC(a) {
      if (
        ((this.readyToReconnect = !1),
        a && this.onPCDisconnected(a),
        this.currentReconnectCount > Mp)
      )
        throw (
          (h.debug("[".concat(this.connectionId, "] cannot reconnect pc")),
          a || new m(l.UNEXPECTED_ERROR))
        );
      this.stopUploadStats();
      h.debug("[".concat(this.connectionId, "] start reconnect pc"));
      this.connectionState = "connecting";
      this.currentReconnectCount += 1;
      if (await this.closePC())
        return (
          h.debug(
            "[".concat(this.connectionId, "] abort reconnect pc, wait ws")
          ),
          void this.readyToReconnectPC()
        );
      this.createPC();
      await this.startP2PConnection();
      this.currentReconnectCount = 0;
    }
    readyToReconnectPC() {
      this.stopUploadStats();
      this.readyToReconnect = !0;
      this.pc.onICEConnectionStateChange = void 0;
      this.connectionState = "connecting";
    }
    updateICEPromise() {
      this.removeAllListeners(G.GATEWAY_P2P_LOST);
      this.icePromise = new u((a, b) => {
        this.pc.onICEConnectionStateChange = (d) => {
          var e, f;
          h.info(
            n(
              (e = n((f = "[".concat(this.connectionId, "] ice-state: "))).call(
                f,
                this.type,
                " p2p "
              ))
            ).call(e, d)
          );
          "connected" === d && a();
          ("failed" !== d && "closed" !== d) ||
            this.reconnectPC(new m(l.ICE_FAILED)).catch((a) => {
              this.emit(G.P2P_LOST);
              b(a);
            });
        };
        this.pc.onConnectionStateChange = (a) => {
          var d, f;
          h.info(
            n(
              (d = n(
                (f = "[".concat(this.connectionId, "] connection-state: "))
              ).call(f, this.type, " p2p "))
            ).call(d, a)
          );
          ("failed" !== a && "closed" !== a) ||
            this.reconnectPC(new m(l.PC_CLOSED)).catch((a) => {
              this.emit(G.P2P_LOST);
              b(a);
            });
        };
        this.removeAllListeners(G.GATEWAY_P2P_LOST);
        this.once(G.GATEWAY_P2P_LOST, (a) => {
          var d;
          if (this.pc.ID.toString() === a.toString()) {
            if (
              (h.info(
                n((d = "[".concat(this.connectionId, "] "))).call(
                  d,
                  this.type,
                  " p2p gateway lost"
                )
              ),
              this.pc.allCandidateReceived && 0 === this.pc.localCandidateCount)
            )
              return (
                (this.disconnectedReason = new m(
                  l.NO_ICE_CANDIDATE,
                  "can not get candidate in this pc"
                )),
                void this.closeP2PConnection(!0)
              );
            this.reconnectPC(new m(l.GATEWAY_P2P_LOST)).catch((a) => {
              this.emit(G.P2P_LOST);
              b(a);
            });
          }
        });
      });
    }
  }
  class il {
    constructor(a) {
      this.freezeTimeCounterList = [];
      this.lastTimeUpdatedTime =
        this.playbackTime =
        this.freezeTime =
        this.timeUpdatedCount =
          0;
      this._videoElementStatus = Na.NONE;
      this.isGettingVideoDimensions = !1;
      this.handleVideoEvents = (a) => {
        switch (a.type) {
          case "play":
          case "playing":
            this.startGetVideoDimensions();
            this.videoElementStatus = Na.PLAYING;
            break;
          case "loadeddata":
            this.onFirstVideoFrameDecoded && this.onFirstVideoFrameDecoded();
            break;
          case "canplay":
            this.videoElementStatus = Na.CANPLAY;
            break;
          case "stalled":
            this.videoElementStatus = Na.STALLED;
            break;
          case "suspend":
            this.videoElementStatus = Na.SUSPEND;
            break;
          case "pause":
            this.videoElementStatus = Na.PAUSED;
            this.videoElement &&
              (h.debug(
                "[track-".concat(
                  this.trackId,
                  "] video element paused, auto resume"
                )
              ),
              this.videoElement.play());
            break;
          case "waiting":
            this.videoElementStatus = Na.WAITING;
            break;
          case "abort":
            this.videoElementStatus = Na.ABORT;
            break;
          case "ended":
            this.videoElementStatus = Na.ENDED;
            break;
          case "emptied":
            this.videoElementStatus = Na.EMPTIED;
            break;
          case "timeupdate": {
            a = v();
            if (((this.timeUpdatedCount += 1), 10 > this.timeUpdatedCount))
              return void (this.lastTimeUpdatedTime = a);
            let b = a - this.lastTimeUpdatedTime;
            this.lastTimeUpdatedTime = a;
            500 < b && (this.freezeTime += b);
            for (this.playbackTime += b; 6e3 <= this.playbackTime; )
              (this.playbackTime -= 6e3),
                this.freezeTimeCounterList.push(Math.min(6e3, this.freezeTime)),
                (this.freezeTime = Math.max(0, this.freezeTime - 6e3));
          }
        }
      };
      this.startGetVideoDimensions = () => {
        let a = () => {
          if (
            ((this.isGettingVideoDimensions = !0),
            this.videoElement &&
              4 < this.videoElement.videoWidth * this.videoElement.videoHeight)
          )
            return (
              h.debug(
                "[".concat(this.trackId, "] current video dimensions:"),
                this.videoElement.videoWidth,
                this.videoElement.videoHeight
              ),
              void (this.isGettingVideoDimensions = !1)
            );
          Ec(a, 500);
        };
        !this.isGettingVideoDimensions && a();
      };
      this.slot = a.element;
      this.trackId = a.trackId;
      this.updateConfig(a);
    }
    get videoElementStatus() {
      return this._videoElementStatus;
    }
    set videoElementStatus(a) {
      var b, d;
      a !== this._videoElementStatus &&
        (h.debug(
          n(
            (b = n(
              (d = "[".concat(this.trackId, "] video-element-status change "))
            ).call(d, this._videoElementStatus, " => "))
          ).call(b, a)
        ),
        (this._videoElementStatus = a));
    }
    updateConfig(a) {
      this.config = a;
      this.trackId = a.trackId;
      a = a.element;
      a !== this.slot && (this.destroy(), (this.slot = a));
      this.createElements();
    }
    updateVideoTrack(a) {
      this.videoTrack !== a && ((this.videoTrack = a), this.createElements());
    }
    play() {
      if (this.videoElement) {
        let a = this.videoElement.play();
        a &&
          a.catch &&
          a.catch((a) => {
            h.warning("[".concat(this.trackId, "] play warning: "), a);
          });
      }
    }
    getCurrentFrame() {
      if (!this.videoElement) return new ImageData(2, 2);
      let a = document.createElement("canvas");
      a.width = this.videoElement.videoWidth;
      a.height = this.videoElement.videoHeight;
      var b = a.getContext("2d");
      if (!b)
        return h.error("create canvas context failed!"), new ImageData(2, 2);
      b.drawImage(this.videoElement, 0, 0, a.width, a.height);
      b = b.getImageData(0, 0, a.width, a.height);
      return a.remove(), b;
    }
    destroy() {
      if (
        (this.videoElement &&
          ((this.videoElement.srcObject = null), (this.videoElement = void 0)),
        this.container)
      ) {
        try {
          this.slot.removeChild(this.container);
        } catch (a) {}
        this.container = void 0;
      }
      this.freezeTimeCounterList = [];
    }
    createElements() {
      this.container || (this.container = document.createElement("div"));
      this.container.id = "agora-video-player-".concat(this.trackId);
      this.container.style.width = "100%";
      this.container.style.height = "100%";
      this.container.style.position = "relative";
      this.container.style.overflow = "hidden";
      this.videoTrack
        ? ((this.container.style.backgroundColor = "black"),
          this.createVideoElement(),
          this.container.appendChild(this.videoElement))
        : this.removeVideoElement();
      this.slot.appendChild(this.container);
    }
    createVideoElement() {
      (this.videoElement ||
        ((this.videoElementStatus = Na.INIT),
        (this.videoElement = document.createElement("video")),
        (this.videoElement.onerror = () =>
          (this.videoElementStatus = Na.ERROR)),
        this.container && this.container.appendChild(this.videoElement),
        r(ze).call(ze, (a) => {
          this.videoElement &&
            this.videoElement.addEventListener(a, this.handleVideoEvents);
        }),
        (this.videoElementCheckInterval = window.setInterval(() => {
          !document.getElementById("video_".concat(this.trackId)) &&
            this.videoElement &&
            (this.videoElementStatus = Na.DESTROYED);
        }, 1e3))),
      (this.videoElement.id = "video_".concat(this.trackId)),
      (this.videoElement.className = "agora_video_player"),
      (this.videoElement.style.width = "100%"),
      (this.videoElement.style.height = "100%"),
      (this.videoElement.style.position = "absolute"),
      (this.videoElement.controls = !1),
      this.videoElement.setAttribute("playsinline", ""),
      (this.videoElement.style.left = "0"),
      (this.videoElement.style.top = "0"),
      this.config.mirror &&
        (this.videoElement.style.transform = "rotateY(180deg)"),
      this.config.fit
        ? (this.videoElement.style.objectFit = this.config.fit)
        : (this.videoElement.style.objectFit = "cover"),
      this.videoElement.setAttribute("muted", ""),
      (this.videoElement.muted = !0),
      this.videoElement.srcObject &&
        this.videoElement.srcObject instanceof MediaStream)
        ? this.videoElement.srcObject.getVideoTracks()[0] !== this.videoTrack &&
          (this.videoElement.srcObject = this.videoTrack
            ? new MediaStream([this.videoTrack])
            : null)
        : (this.videoElement.srcObject = this.videoTrack
            ? new MediaStream([this.videoTrack])
            : null);
      let a = this.videoElement.play();
      void 0 !== a &&
        a.catch((a) => {
          h.debug(
            "[".concat(this.trackId, "] playback interrupted"),
            a.toString()
          );
        });
    }
    removeVideoElement() {
      if (this.videoElement) {
        r(ze).call(ze, (a) => {
          this.videoElement &&
            this.videoElement.removeEventListener(a, this.handleVideoEvents);
        });
        this.videoElementCheckInterval &&
          (window.clearInterval(this.videoElementCheckInterval),
          (this.videoElementCheckInterval = void 0));
        try {
          this.container && this.container.removeChild(this.videoElement);
        } catch (a) {}
        this.videoElement = void 0;
        this.videoElementStatus = Na.NONE;
      }
    }
  }
  let ze =
    "play playing loadeddata canplay pause stalled suspend waiting abort emptied ended timeupdate".split(
      " "
    );
  class Np {
    get output() {
      return this._output;
    }
    async setInput(a) {
      if (a !== this.input) {
        if (a.kind !== this.kind) throw new m(l.UNEXPECTED_ERROR);
        this.input && this.removeInput();
        this.input = a;
        await this._setInput(a);
      }
    }
    removeInput() {
      this.input = void 0;
      this._removeInput();
    }
    async updateOutput(a) {
      this.output !== a &&
        ((this._output = a),
        this.onOutputChange && (await this.onOutputChange()));
    }
    replaceOriginMediaStream(a, b) {
      var d, e;
      let f = U((d = a.getTracks())).call(d, (a) => a.kind === this.kind);
      f && a.removeTrack(f);
      b = U((e = b.getTracks())).call(e, (a) => a.kind === this.kind);
      void 0 === this.output && b && a.addTrack(b);
      this.output &&
        (h.debug(
          "replace ".concat(this.output.kind, " track to origin media stream")
        ),
        a.addTrack(this.output));
    }
  }
  var jl;
  !document.documentMode &&
    window.StyleMedia &&
    (HTMLCanvasElement.prototype.getContext =
      ((jl = HTMLCanvasElement.prototype.getContext),
      function () {
        let a = arguments;
        return (
          "webgl" === a[0] &&
            ((a = zb([]).call(arguments)), (a[0] = "experimental-webgl")),
          jl.apply(null, a)
        );
      }));
  let Op = [
      31, 222, 239, 159, 192, 236, 164, 81, 54, 227, 176, 149, 2, 247, 75, 141,
      183, 54, 213, 216, 158, 92, 111, 49, 228, 111, 150, 6, 135, 79, 35, 212,
      4, 155, 200, 168, 37, 107, 243, 110, 144, 179, 51, 81, 55, 78, 223, 242,
      191, 211, 74, 119, 203, 151, 142, 62, 31, 41, 132, 22, 35, 155, 87, 123,
      119, 117, 216, 57, 201, 53, 228, 67, 201, 40, 106, 24, 80, 176, 187, 253,
      60, 63, 136, 100, 20, 12, 177, 99, 64, 38, 101, 143, 111, 176, 251, 211,
      145, 136, 34, 23, 79, 136, 202, 95, 105, 199, 125, 67, 180, 44, 210, 179,
      228, 4, 85, 160, 188, 64, 26, 46, 6, 61, 201, 103, 248, 18, 97, 254, 140,
      36, 115, 106, 48, 124, 102, 216, 155, 120, 36, 227, 165, 217, 7, 227, 191,
      128, 212, 157, 80, 37, 117, 175, 24, 214, 47, 221, 183, 211, 51, 174, 251,
      223, 159, 167, 152, 53, 36, 107, 199, 223, 91, 62, 46, 194, 11, 80, 121,
      188, 219, 2, 99, 99, 232, 229, 173, 234, 21, 30, 236, 177, 243, 142, 97,
      48, 108, 56, 62, 172, 56, 216, 3, 42, 79, 138, 23, 88, 182, 39, 5, 118,
      68, 135, 178, 56, 9, 94, 189, 44, 104, 9, 238, 231, 174, 122, 85, 247,
      231, 86, 74, 8, 189, 147, 218, 180, 58, 76, 227, 17, 46, 90, 194, 100, 51,
      178, 72, 163, 151, 243, 166, 130, 85, 1, 223, 130, 152, 242, 85, 255, 28,
      173, 97, 252, 119, 215, 177, 119, 86, 104, 136, 82, 40, 72, 53, 11, 18,
      26, 240, 188, 76, 110, 39, 31, 189,
    ],
    Pp = [
      11, 196, 242, 139, 198, 252, 188, 5, 59, 170, 161, 152, 17, 229, 24, 141,
      133, 54, 214, 206, 133, 26, 66, 126, 255, 11, 245, 10, 146, 92, 52, 134,
      108, 152, 221, 191, 124, 116, 248, 106, 130, 251, 59, 105, 43, 91, 135,
      199, 181, 223, 10, 51, 134, 194, 240, 46, 9, 3, 141, 22, 35, 146, 76, 23,
      109, 117, 208, 41, 201, 45, 218, 76, 203, 105, 51, 58, 97, 154, 145, 236,
      49, 18, 183, 127, 27, 12, 210, 122, 73, 42, 37, 143, 36, 207, 251, 211,
      145, 191, 56, 10, 88, 222, 181, 125, 22, 238, 123, 71, 177, 107, 218, 254,
      173, 28, 34, 253, 249, 67, 83, 97, 73, 111, 219, 43, 181, 82, 38, 230,
      136, 109, 22, 67,
    ];
  class kl {
    constructor(a, b) {
      this.gl = a;
      this.kernel = b || Pp;
      a = this.gl;
      b = hi(this.kernel);
      b = [hi(Op), b];
      var d = [];
      for (var e = 0; e < b.length; ++e)
        d.push(sm(a, b[e], 0 === e ? a.VERTEX_SHADER : a.FRAGMENT_SHADER));
      b = tm(a, d, void 0, void 0);
      d = a.getAttribLocation(b, "a_position");
      e = a.createBuffer();
      a.bindBuffer(a.ARRAY_BUFFER, e);
      a.bufferData(
        a.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
        a.STATIC_DRAW
      );
      a.enableVertexAttribArray(d);
      a.vertexAttribPointer(d, 2, a.FLOAT, !1, 0, 0);
      d = a.getAttribLocation(b, "a_texCoord");
      e = a.createBuffer();
      a.bindBuffer(a.ARRAY_BUFFER, e);
      a.bufferData(
        a.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
        a.STATIC_DRAW
      );
      a.enableVertexAttribArray(d);
      a.vertexAttribPointer(d, 2, a.FLOAT, !1, 0, 0);
      this.program = b;
    }
    setUniforms() {
      let a = this.gl.getUniformLocation(this.program, "u_flipY");
      this.gl.uniform1f(a, 1);
    }
  }
  class Wb extends kl {
    constructor(a, b, d, e) {
      super(a, b);
      this.denoiseLevel = 5;
      this.xOffset = 1 / d;
      this.yOffset = 1 / e;
    }
    setUniforms() {
      let a = this.gl.getUniformLocation(this.program, "u_flipY"),
        b = this.gl.getUniformLocation(this.program, "u_singleStepOffset"),
        d = this.gl.getUniformLocation(this.program, "u_denoiseLevel");
      this.gl.uniform2f(b, this.xOffset, this.yOffset);
      this.gl.uniform1f(d, this.denoiseLevel);
      this.gl.uniform1f(a, 1);
    }
    setParameters(a) {
      void 0 !== a.denoiseLevel && (this.denoiseLevel = a.denoiseLevel);
    }
    setSize(a, b) {
      this.xOffset = 1 / a;
      this.yOffset = 1 / b;
    }
  }
  let Qp = [
    11, 196, 242, 139, 198, 252, 188, 5, 59, 170, 161, 152, 17, 229, 24, 141,
    133, 54, 214, 206, 133, 26, 66, 126, 255, 11, 245, 10, 146, 92, 52, 134,
    108, 155, 210, 164, 99, 114, 228, 96, 130, 251, 59, 105, 43, 91, 135, 199,
    181, 223, 10, 51, 133, 194, 247, 34, 31, 39, 142, 28, 2, 130, 18, 109, 84,
    124, 223, 62, 140, 52, 128, 47, 208, 47, 115, 39, 4, 200, 220, 171, 53, 36,
    150, 101, 10, 75, 247, 121, 74, 36, 35, 143, 108, 176, 235, 211, 135, 164,
    36, 11, 88, 160, 148, 35, 6, 221, 41, 32, 166, 109, 205, 171, 228, 4, 26,
    169, 244, 82, 119, 102, 86, 61, 201, 103, 248, 18, 97, 242, 182, 34, 121,
    70, 28, 71, 126, 197, 223, 126, 14, 244, 149, 192, 12, 176, 187, 149, 212,
    156, 22, 44, 36, 133, 10, 216, 63, 198, 213, 154, 116, 230, 253, 154, 154,
    249, 215, 55, 60, 34, 196, 229, 76, 50, 44, 135, 22, 77, 113, 247, 142, 94,
    60, 23, 172, 145, 175, 218, 81, 86, 162, 239, 180, 205, 63, 118, 3, 110,
    123, 224, 127, 158, 124, 15, 127, 157, 27, 66, 176, 33, 24, 51, 53, 194,
    178, 56, 6, 74, 191, 111, 51, 78, 174, 157, 229, 17, 22, 178, 231, 92, 25,
    23, 191, 157, 137, 188, 54, 64, 176, 13, 22, 81, 207, 45, 108, 203, 83, 186,
    130, 237, 186, 153, 110, 8, 196, 168, 152, 161, 28, 238, 46, 184, 36, 185,
    20, 203, 183, 98, 95, 41, 149, 93, 105, 37, 116, 91, 68, 105, 164, 217, 30,
    42, 60, 53, 173, 213, 177, 216, 195, 53, 204, 173, 128, 243, 42, 122, 205,
    65, 97, 129, 194, 68, 218, 91, 141, 11, 224, 124, 132, 138, 119, 36, 220,
    161, 39, 214, 146, 183, 193, 225, 23, 177, 201, 243, 128, 160, 33, 75, 86,
    126, 139, 254, 232, 14, 13, 85, 2, 112, 17, 150, 36, 180, 86, 226, 225, 126,
    197, 17, 228, 225, 142, 245, 37, 170, 39, 96, 187, 190, 2, 35, 85, 237, 11,
    189, 1, 79, 237, 2, 1, 114, 246, 109, 190, 66, 54, 153, 43, 218, 204, 70, 6,
    204, 162, 247, 18, 130, 123, 30, 60, 165, 130, 142, 210, 133, 91, 127, 117,
    71, 38, 145, 172, 7, 5, 16, 220, 222, 111, 98, 141, 239, 208, 125, 26, 238,
    28, 0, 216, 89, 13, 7, 119, 134, 194, 75, 41, 67, 174, 1, 217, 80, 101, 40,
    26, 59, 28, 59, 46, 108, 138, 38, 157, 167, 28, 234, 73, 177, 42, 42, 102,
    108, 26, 181, 27, 178, 42, 43, 52, 28, 110, 117, 198, 173, 176, 178, 101,
    225, 150, 36, 139, 108, 105, 10, 237, 222, 3, 143, 126, 18, 144, 115, 74,
    56, 114, 134, 231, 159, 212, 62, 126, 80, 173, 216, 167, 4, 81, 18, 52, 17,
    144, 218, 32, 139, 207, 104, 128, 229, 99, 84, 120, 31, 87, 227, 154, 91,
    196, 63, 123, 111, 125, 36, 52, 57, 168, 113, 150, 189, 204, 24, 104, 196,
    237, 86, 163, 68, 197, 202, 170, 212, 191, 81, 193, 111, 255, 162, 181, 202,
    156, 146, 196, 96, 16, 118, 117, 55, 71, 156, 31, 163, 242, 204, 239, 11,
    150, 27, 126, 115, 154, 107, 247, 134, 158, 125, 255, 146, 35, 183, 209, 36,
    116, 87, 215, 172, 5, 251, 133, 114, 254, 141, 195, 6, 145, 4, 111, 182,
    167, 74, 154, 152, 68, 18, 146, 88, 106, 200, 154, 15, 176, 94, 86, 66, 178,
    101, 219, 35, 188, 129, 66, 28, 41, 110, 174, 53, 88, 174, 64, 191, 206,
    127, 48, 126, 214, 216, 93, 119, 2, 166, 99, 181, 222, 29, 218, 28, 195,
    219, 125, 44, 50, 16, 99, 174, 225, 51, 133, 120, 184, 159, 168, 75, 242,
    162, 124, 255, 81, 25, 153, 109, 69, 220, 176, 4, 237, 196, 233, 19, 8, 240,
    160, 39, 122, 81, 29, 188, 144, 249, 170, 174, 137, 30, 10, 93, 133, 151,
    199, 248, 175, 38, 41, 144, 229, 245, 149, 25, 240, 138, 179, 114, 182, 84,
    50, 103, 95, 31, 199, 31, 87, 208, 203, 199, 135, 49, 211, 43, 52, 36, 74,
    59, 37, 22, 136, 171, 244, 126, 18, 251, 39, 159, 241, 66, 206, 127, 149,
    159, 182, 143, 232, 199, 136, 46, 150, 32, 51, 221, 74, 22, 102, 93, 22, 44,
    132, 140, 199, 43, 69, 249, 77, 75, 140, 70, 4, 252, 98, 235, 77, 190, 125,
    18, 56, 21, 10, 244, 42, 2, 246, 62, 127, 241, 123, 137, 22, 247, 219, 177,
    160, 84, 18, 10, 84, 97, 251, 127, 102, 16, 209, 181, 100, 94, 56, 238, 209,
    207, 76, 189, 95, 15, 165, 139, 143, 189, 96, 225, 55, 112, 178, 27, 218,
    198, 223, 251, 52, 123, 94, 130, 220, 142, 216, 116, 237, 18, 254, 49, 59,
    128, 41, 29, 15, 179, 164, 85, 76, 167, 166, 151, 39, 221, 2, 190, 68, 167,
    26, 177, 114, 141, 4, 67, 25, 69, 182, 38, 166, 160, 27, 151, 148, 108, 48,
    227, 60, 112, 48, 22, 159, 76, 127, 251, 63, 254, 177, 113, 217, 197, 95,
    179, 109, 128, 138, 99, 27, 249, 10, 174, 155, 129, 80, 39, 165, 252, 85,
    60, 131, 183, 98, 107, 68, 207, 19, 233, 231, 55, 225, 126, 77, 49, 53, 145,
    203, 113, 29, 208, 64, 237, 182, 229, 165, 7, 11, 169, 106, 253, 116, 141,
    200, 62, 16, 38, 121, 55, 148, 91, 83, 160, 140, 126, 121, 12, 79, 189, 72,
    172, 31, 243, 240, 209, 229, 32, 220, 91, 229, 81, 94, 247, 121, 153, 151,
    232, 182, 171, 198, 50, 31, 152, 245, 172, 151, 130, 55, 62, 125, 38, 155,
    229, 78, 207, 148, 201, 2, 78, 63, 119, 107, 168, 78, 139, 141, 163, 177,
    191, 239, 141, 39, 182, 174, 40, 76, 226, 62, 125, 209, 6, 6, 34, 37, 147,
    85, 204, 103, 51, 191, 36, 248, 17, 175, 20, 1, 53, 16, 35, 143, 237, 177,
    125, 86, 29, 219, 235, 20, 121, 205, 59, 5, 250, 107, 109, 32, 224, 30, 152,
    143, 113, 151, 95, 85, 19, 254, 164, 135, 124, 68, 136, 199, 29, 31, 244,
    91, 10, 84, 127, 101, 210, 70, 226, 195, 140, 70, 166, 54, 217, 165, 84, 42,
    165, 175, 100, 234, 124, 121, 105, 53, 101, 118, 174, 101, 220, 147, 68,
    161, 37, 0, 182, 220, 142, 221, 155, 230, 115, 164, 10, 214, 208, 120, 91,
    152, 66, 27, 81, 184, 48, 84, 70, 7, 128, 153, 217, 218, 249, 226, 70, 130,
    200, 156, 61, 227, 21, 164, 137, 193, 221, 119, 10, 134, 204, 23, 20, 17,
    90, 94, 105, 204, 39, 99, 1, 64, 153, 45, 213, 19, 247, 97, 194, 49, 35,
    125, 255, 195, 139, 63, 209, 175, 208, 147, 189, 244, 204, 24, 211, 99, 142,
    18, 92, 130, 254, 182, 231, 235, 93, 10, 127, 175, 87, 35, 62, 110, 137,
    184, 39, 114, 200, 150, 11, 190, 40, 162, 168, 223, 203, 110, 242, 192, 234,
    26, 11, 54, 155, 38, 48, 79, 109, 101, 119, 165, 187, 223, 5, 20, 168, 171,
    241, 20, 243, 108, 199, 3, 155, 69, 244, 149, 0, 187, 110, 12, 233, 42, 151,
    189, 139, 133, 104, 3, 30, 16, 200, 69, 4, 123, 103, 144, 12, 106, 182, 1,
    127, 91, 125, 158, 12, 144, 238, 232, 209, 101, 159, 56, 163, 240, 179, 50,
    169, 120, 219, 176, 87, 77, 45, 247, 153, 190, 82, 132, 50, 137, 209, 97,
    19, 35, 247, 161, 62, 77, 16, 71, 152, 72, 61, 50, 99, 157, 154, 56, 58,
    175, 27, 73, 121, 229, 195, 228, 132, 69, 233, 169, 100, 21, 123, 17, 3,
    164, 6, 146, 106, 196, 29, 3, 250, 217, 164, 23, 171, 203, 14, 242, 239,
    249, 169, 116, 138, 209, 98, 113, 181, 122, 35, 162, 216, 46, 230, 4, 155,
    142, 118, 216, 232, 229, 28, 12, 158, 153, 126, 149, 171, 172, 231, 99, 211,
    57, 114, 136, 183, 114, 74, 35, 233, 115, 127, 253, 157, 38, 49, 136, 141,
    25, 161, 255, 232, 110, 101, 208, 166, 186, 226, 12, 185, 19, 155, 53, 93,
    155, 39, 161, 7, 124, 213, 52, 223, 125, 211, 242, 253, 22, 13, 131, 115,
    167, 198, 188, 90, 209, 63, 224, 92, 112, 118, 220, 165, 31, 164, 43, 58,
    197, 77, 17, 247, 77, 164, 74, 77, 218, 18, 187, 41, 76, 189, 127, 98, 18,
    226, 231, 71, 115, 236, 68, 183, 111, 50, 168, 88, 247, 9, 123, 65, 180, 88,
    74, 44, 101, 101, 173, 11,
  ];
  class Rp extends Wb {
    constructor(a, b, d) {
      super(a, Qp, b, d);
    }
  }
  let Sp = [
    11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222,
    172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210,
    20, 131, 156, 165, 108, 122, 254, 125, 130, 229, 55, 109, 113, 11, 210, 238,
    163, 213, 86, 116, 156, 248, 215, 63, 20, 48, 173, 31, 55, 133, 18, 105, 32,
    16, 204, 35, 128, 38, 212, 87, 200, 97, 114, 40, 12, 210, 193, 171, 59, 33,
    158, 108, 14, 75, 228, 74, 65, 32, 57, 192, 112, 156, 234, 250, 140, 189,
    40, 20, 6, 230, 135, 52, 17, 200, 123, 68, 183, 44, 215, 187, 234, 2, 13,
    169, 234, 94, 115, 60, 6, 107, 224, 118, 254, 88, 2, 235, 134, 36, 120, 5,
    85, 94, 126, 222, 223, 101, 105, 227, 147, 199, 64, 185, 246, 143, 183, 210,
    30, 37, 127, 226, 79, 156, 118, 147, 208, 131, 51, 248, 232, 217, 206, 181,
    218, 58, 61, 112, 244, 227, 68, 45, 41, 206, 69, 12, 45, 163, 205, 75, 6,
    23, 167, 145, 250, 237, 92, 84, 164, 240, 253, 216, 54, 85, 7, 108, 62, 255,
    42, 217, 3, 27, 0, 196, 94, 28, 241, 120, 80, 92, 89, 135, 228, 125, 2, 3,
    242, 39, 116, 64, 248, 216, 177, 122, 66, 178, 180, 9, 7, 33, 186, 208, 213,
    188, 59, 78, 243, 95, 123, 28, 142, 45, 99, 130, 7, 167, 194, 156, 238, 199,
    10, 71, 141, 251, 221, 158, 16, 255, 38, 181, 36, 184, 20, 136, 240, 55, 27,
    51, 191, 82, 105, 55, 97, 78, 74, 121, 191, 161, 91, 126, 105, 103, 174,
    139, 223, 145, 150, 120, 156, 240, 252, 182, 105, 104, 205, 65, 97, 129,
    194, 68, 218, 91, 141, 11, 224, 124, 132, 138, 119, 36, 201, 211, 39, 203,
    146, 225, 246, 252, 21, 161, 250, 188, 137, 190, 42, 4, 90, 126, 211, 171,
    240, 113, 67, 28, 92, 57, 77, 200, 125, 224, 19, 178, 142, 112, 202, 5, 233,
    229, 128, 235, 105, 239, 102, 52, 179, 224, 87, 45, 68, 211, 10, 187, 9, 38,
    190, 86, 25, 43, 175, 56, 231, 11, 108, 220, 36, 129, 131, 19, 93, 163, 239,
    169, 118, 205, 50, 77, 121, 139, 139, 141, 197, 170, 20, 44, 39, 19, 97,
    205, 228, 8, 106, 67, 210, 135, 111, 127, 141, 185, 175, 123, 26, 226, 42,
    29, 217, 16, 99, 9, 46, 157, 232, 22, 3, 105, 174, 73, 144, 23, 110, 55, 84,
    46, 4, 116, 39, 113, 205, 58, 158, 242, 7, 208, 75, 162, 55, 115, 35, 52,
    124, 235, 114, 178, 55, 43, 98, 17, 100, 33, 134, 237, 190, 230, 60, 184,
    192, 104, 146, 52, 58, 79, 174, 180, 81, 155, 114, 0, 153, 113, 90, 51, 86,
    150, 254, 136, 205, 104, 39, 11, 190, 187, 233, 80, 81, 81, 56, 18, 222,
    148, 116, 155, 156, 33, 132, 226, 127, 84, 34, 83, 28, 249, 153, 18, 197,
    10, 116, 102, 125, 45, 47, 36, 235, 46, 212, 166, 209, 3, 125, 132, 237,
    124, 163, 68, 197, 202, 232, 152, 234, 75, 235, 103, 248, 160, 241, 213,
    151, 144, 130, 37, 23, 51, 48, 55, 12, 227, 31, 163, 242, 251, 245, 22, 129,
    77, 20, 35, 150, 20, 181, 203, 138, 69, 233, 215, 109, 178, 209, 52, 85, 96,
    221, 179, 56, 249, 138, 111, 250, 141, 134, 95, 152, 92, 109, 183, 174, 104,
    151, 156, 31, 66, 211, 10, 57, 141, 167, 18, 177, 27, 126, 74, 252, 29, 143,
    121, 173, 203, 8, 27, 44, 123, 148, 57, 88, 163, 68, 228, 158, 62, 98, 121,
    192, 228, 94, 92, 72, 241, 33, 230, 173, 0, 197, 1, 194, 144, 111, 91, 60,
    0, 106, 181, 203, 51, 133, 120, 250, 158, 184, 93, 216, 184, 126, 253, 21,
    22, 155, 99, 80, 205, 227, 69, 231, 141, 165, 71, 70, 252, 223, 105, 51, 93,
    22, 165, 135, 233, 177, 164, 139, 53, 5, 85, 151, 134, 214, 165, 249, 100,
    24, 186, 207, 245, 149, 68, 218, 204, 252, 32, 190, 90, 48, 76, 57, 31, 201,
    15, 52, 130, 135, 152, 206, 63, 198, 100, 126, 36, 2, 104, 116, 0, 160, 163,
    186, 2, 91, 165, 57, 149, 163, 12, 239, 121, 152, 209, 224, 136, 248, 135,
    136, 46, 150, 32, 51, 154, 6, 105, 0, 71, 30, 44, 175, 147, 139, 34, 91,
    184, 78, 31, 145, 18, 3, 250, 122, 166, 47, 252, 109, 19, 40, 10, 123, 163,
    99, 76, 133, 119, 37, 180, 38, 207, 79, 171, 185, 188,
  ];
  class Tp extends Wb {
    constructor(a, b, d) {
      super(a, Sp, b, d);
    }
  }
  let Up = [
    11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222,
    172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210,
    20, 131, 156, 160, 96, 121, 255, 120, 207, 227, 114, 120, 38, 72, 149, 145,
    165, 227, 75, 122, 158, 250, 232, 46, 34, 52, 135, 9, 30, 144, 17, 110, 126,
    110, 130, 71, 156, 46, 210, 67, 202, 51, 119, 97, 3, 211, 214, 227, 45, 109,
    151, 97, 21, 10, 229, 53, 80, 26, 51, 202, 119, 128, 230, 197, 140, 135, 40,
    14, 88, 128, 202, 95, 21, 208, 96, 83, 185, 98, 216, 242, 224, 15, 25, 224,
    233, 86, 96, 46, 80, 120, 220, 48, 187, 86, 30, 240, 140, 46, 95, 81, 48,
    90, 117, 140, 177, 51, 107, 235, 158, 137, 5, 241, 191, 154, 149, 219, 30,
    126, 85, 175, 10, 216, 63, 139, 216, 151, 122, 251, 224, 202, 220, 227, 221,
    53, 122, 34, 213, 224, 94, 45, 14, 200, 68, 31, 61, 175, 208, 17, 120, 82,
    244, 138, 208, 165, 21, 19, 236, 232, 180, 217, 50, 74, 70, 126, 114, 227,
    62, 192, 124, 9, 85, 148, 33, 77, 255, 117, 75, 102, 87, 151, 255, 87, 74,
    74, 181, 111, 108, 9, 249, 220, 174, 59, 80, 254, 168, 29, 30, 94, 171, 133,
    133, 195, 105, 64, 254, 68, 65, 18, 158, 54, 73, 203, 65, 175, 151, 170,
    236, 138, 17, 119, 128, 237, 214, 189, 28, 250, 38, 149, 97, 242, 81, 212,
    254, 57, 18, 120, 155, 64, 96, 108, 75, 78, 74, 121, 191, 243, 30, 42, 60,
    103, 165, 196, 160, 195, 216, 99, 182, 173, 214, 182, 105, 53, 231, 3, 45,
    212, 144, 101, 217, 65, 141, 44, 230, 125, 151, 154, 123, 57, 134, 223, 98,
    133, 156, 238, 137, 181, 80, 175, 230, 167, 131, 180, 13, 69, 77, 44, 156,
    165, 252, 14, 27, 85, 71, 1, 82, 196, 64, 243, 26, 167, 146, 98, 201, 6,
    195, 247, 200, 224, 44, 177, 104, 109, 187, 231, 83, 118, 28, 159, 92, 179,
    28, 14, 162, 81, 84, 21, 168, 34, 156, 21, 127, 215, 88, 218, 208, 11, 92,
    161, 239, 239, 82, 221, 59, 86, 83, 201, 199, 216, 151, 139, 23, 54, 39, 52,
    103, 204, 247, 24, 102, 94, 157, 138, 42, 49, 131, 183, 208, 50, 95, 236,
    54, 6, 211, 26, 68, 72, 56, 212, 134, 24, 91, 114, 132, 1, 217, 80, 38, 47,
    29, 47, 0, 107, 102, 99, 129, 33, 140, 243, 74, 251, 89, 247, 103, 12, 114,
    58, 113, 240, 72, 188, 39, 48, 72, 89, 45, 102, 206, 245, 247, 231, 56, 167,
    129, 122, 222, 47, 40, 78, 227, 159, 64, 206, 34, 127, 203, 127, 87, 40,
    108, 152, 238, 147, 231, 46, 104, 89, 182, 180, 232, 86, 89, 91, 57, 10,
    222, 202, 59, 199, 135, 60, 199, 189, 40, 84, 125, 28, 84, 162, 210, 91,
    143, 34, 106, 117, 118, 3, 125, 126, 237, 60, 131, 173, 153, 69, 49, 212,
    204, 117, 163, 31, 239, 202, 232, 152, 234, 3, 162, 32, 176, 184, 184, 196,
    154, 131, 144, 115, 6, 53, 122, 55, 69, 166, 19, 230, 183, 175, 244, 1, 156,
    11, 37, 121, 134, 121, 152, 142, 158, 125, 229, 150, 44, 183, 216, 109, 7,
    65, 222, 169, 56, 222, 140, 110, 233, 157, 138, 66, 208, 6, 111, 166, 188,
    76, 208, 222, 4, 104, 211, 10, 57, 141, 243, 65, 228, 86, 85, 88, 169, 91,
    237, 56, 249, 133, 77, 21, 32, 37, 230, 55, 0, 184, 110, 228, 158, 62, 98,
    45, 147, 177, 19, 119, 89, 164, 103, 132, 239, 84, 139, 68, 204, 157, 49,
    41, 50, 89, 113, 159, 203, 51, 133, 120, 184, 210, 237, 15, 249, 187, 100,
    253, 50, 16, 154, 112, 64, 193, 254, 10, 235, 200, 253, 84, 31, 169, 171,
    39, 122, 70, 46, 186, 139, 212, 162, 173, 158, 41, 23, 86, 148, 172, 196,
    237, 242, 58, 102, 180, 150, 238, 191, 25, 240, 204, 252, 125, 148, 29, 124,
    51, 95, 10, 196, 55, 49, 159, 138, 144, 255, 126, 205, 43, 49, 42, 17, 59,
    60, 77, 139, 177, 239, 64, 36, 224, 98, 205, 234, 70, 199, 103, 139, 218,
    206, 207, 178, 217, 255, 32, 134, 59, 25, 221, 74, 22, 102, 82, 19, 20, 170,
    142, 134, 42, 106, 249, 64, 80, 222, 28, 21, 169, 50, 235, 4, 237, 56, 81,
    87, 76, 32, 251, 42, 6, 173, 105, 54, 191, 8, 136, 5, 245, 206, 239, 176, 9,
    116, 24,
  ];
  class Vp extends Wb {
    constructor(a, b, d) {
      super(a, Up, b, d);
    }
  }
  let Wp = [
      11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222,
      172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210,
      20, 131, 156, 190, 100, 112, 230, 97, 199, 225, 96, 74, 99, 94, 248, 222,
      162, 213, 95, 122, 158, 212, 233, 42, 22, 37, 217, 115, 36, 152, 30, 123,
      116, 104, 212, 109, 129, 41, 220, 77, 213, 97, 124, 45, 4, 219, 197, 171,
      40, 18, 149, 104, 20, 4, 248, 102, 64, 9, 50, 217, 124, 131, 180, 188,
      159, 170, 63, 1, 84, 130, 150, 117, 14, 212, 118, 67, 165, 97, 207, 242,
      251, 15, 30, 187, 188, 77, 79, 122, 67, 101, 252, 109, 244, 82, 37, 191,
      227, 35, 114, 87, 57, 71, 99, 218, 155, 54, 101, 239, 138, 197, 13, 226,
      228, 176, 157, 158, 87, 98, 55, 251, 79, 150, 64, 138, 200, 135, 40, 132,
      135, 207, 146, 252, 222, 57, 58, 111, 151, 225, 78, 59, 36, 210, 70, 29,
      121, 160, 210, 31, 109, 67, 167, 194, 177, 236, 91, 108, 164, 229, 130,
      211, 59, 66, 93, 18, 107, 226, 54, 210, 51, 8, 77, 217, 19, 73, 187, 33,
      30, 59, 9, 135, 162, 49, 5, 11, 225, 111, 119, 11, 247, 218, 129, 115, 83,
      205, 170, 21, 4, 69, 210, 133, 134, 245, 109, 15, 177, 9, 81, 81, 203,
      105, 42, 158, 12, 255, 151, 165, 230, 205, 5, 92, 196, 251, 211, 187, 27,
      214, 43, 186, 91, 233, 85, 192, 229, 15, 71, 38, 220, 20, 38, 101, 44, 78,
      7, 60, 251, 186, 75, 103, 108, 53, 166, 220, 186, 208, 194, 120, 207, 230,
      159, 248, 22, 32, 142, 124, 96, 157, 222, 60, 191, 65, 145, 6, 239, 125,
      151, 147, 50, 58, 130, 207, 110, 131, 223, 231, 137, 238, 28, 182, 216,
      167, 198, 191, 37, 67, 76, 1, 144, 232, 218, 79, 72, 28, 65, 101, 43, 216,
      64, 253, 16, 173, 179, 123, 140, 27, 233, 245, 199, 230, 36, 181, 102,
      114, 247, 162, 18, 34, 20, 212, 25, 171, 24, 28, 143, 80, 94, 40, 167, 34,
      209, 61, 117, 130, 1, 198, 196, 7, 21, 252, 180, 255, 92, 128, 119, 9, 48,
      156, 138, 136, 151, 143, 23, 44, 52, 3, 40, 197, 228, 31, 123, 67, 163,
      140, 32, 54, 204, 187, 149, 80, 19, 255, 82, 120, 195, 12, 110, 65, 56,
      212, 143, 22, 78, 44, 234, 72, 140, 29, 118, 103, 18, 36, 7, 122, 50, 37,
      139, 47, 142, 243, 25, 208, 88, 237, 126, 50, 103, 127, 19, 183, 29, 169,
      29, 1, 55, 23, 100, 32, 129, 239, 243, 160, 61, 178, 197, 117, 199, 45,
      57, 26, 165, 135, 92, 218, 59, 0, 197, 54, 13, 96, 40, 141, 212, 221, 131,
      103, 46, 22, 228, 191, 167, 73, 20, 86, 62, 11, 147, 217, 116, 205, 203,
      110, 134, 249, 51, 6, 123, 23, 86, 231, 157, 8, 144, 83, 126, 115, 118,
      35, 96, 36, 229, 36, 220, 228, 143, 71, 45, 223, 129, 48, 236, 5, 145,
      202, 188, 208, 184, 70, 241, 104, 255, 188, 181, 146, 210, 206, 144, 53,
      77, 101, 120, 38, 8, 245, 80, 230, 165, 160, 183, 83, 202, 79, 127, 57,
      214, 126, 242, 150, 208, 40, 239, 148, 35, 163, 201, 97, 74, 70, 214, 181,
      63, 240, 147, 33, 253, 149, 140, 77, 197, 82, 126, 189, 231, 7, 196, 212,
      80, 14, 151, 24, 57, 144, 243, 81, 234, 66, 24, 19, 236, 2, 137, 121, 246,
      129, 65, 7, 99, 110, 174, 54, 74, 182, 81, 234, 142, 37, 72, 110, 220,
      255, 64, 119, 10, 188, 111, 191, 228, 1, 205, 9, 204, 143, 56, 62, 125,
      84, 106, 225, 131, 97, 192, 43, 240, 157, 161, 75, 168, 247, 44, 175, 65,
      81, 192, 48, 21, 157, 167, 80, 191, 130, 161, 75, 85, 186, 174, 42, 117,
      1, 68, 252, 204, 138, 254, 203, 152, 21, 13, 64, 144, 195, 207, 238, 229,
      54, 103, 247, 159, 245, 211, 85, 191, 141, 168, 32, 234, 85, 46, 118, 12,
      5, 199, 4, 19, 217, 203, 202, 156, 33, 143, 114, 116, 60, 66, 40, 58, 77,
      208, 237, 171, 26, 72, 175, 114, 205, 248, 87, 137, 62, 210, 143, 151,
      197, 167, 210, 241, 122, 150, 104, 122, 154, 2, 70, 102, 83, 19, 36, 141,
      136, 199, 42, 79, 229, 71, 86, 194, 109, 31, 236, 80, 166, 17, 230, 109,
      1, 40, 28, 46, 224, 56, 20, 230, 47, 100, 254, 116, 208, 76, 169, 157,
      241, 175, 3, 70, 85, 31, 38, 245, 58, 33, 80, 145, 237, 8, 22, 71, 224,
      158, 156, 31, 249, 81, 87, 247, 230, 199, 237, 96, 167, 123, 63, 243, 79,
      156, 206, 203, 160, 54, 124, 68, 253, 215, 132, 235, 57, 185, 92, 238, 55,
      59, 210, 104, 71, 26, 183, 180, 71, 12, 255, 224, 192, 65, 154, 72, 244,
      8, 164, 10, 248, 46, 207, 30, 92, 1, 80, 244, 31, 189, 138, 88, 216, 218,
      63, 100, 227, 116, 57, 119, 94, 135, 5, 126, 255, 32, 191, 163, 61, 209,
      194, 88, 248, 112, 139, 173, 43, 69, 134, 3, 160, 151, 137, 25, 98, 239,
      166, 19, 123, 208, 180, 31, 120, 30, 191, 75, 183, 179, 126, 180, 125, 92,
      107, 105, 206, 138, 28, 67, 139, 3, 188, 230, 184, 255, 121, 13, 181, 45,
      160, 114, 202, 194, 123, 87, 55, 124, 97, 164, 82, 95, 232, 216, 117, 62,
      5, 90, 176, 82, 167, 52, 160, 153, 174, 168, 105, 146, 91, 248, 81, 79,
      249, 97, 138, 133, 170, 245, 229, 132, 61, 5, 149, 224, 246, 194, 213, 61,
      12, 109, 44, 136, 235, 95, 219, 133, 220, 27, 93, 36, 93, 124, 180, 81,
      141, 152, 220, 170, 163, 229, 197, 124, 171, 232, 48, 70, 251, 106, 119,
      150, 20, 16, 49, 119, 247, 42, 132, 36, 76, 254, 124, 177, 66, 175, 9, 1,
      39, 92, 127, 195, 171, 198, 34, 2, 64, 144, 179, 72, 40, 151, 110, 89,
      229, 42, 125, 33, 238, 16, 220, 228, 51, 203, 8, 1, 68, 145, 253, 133,
      118, 93, 163, 129, 22, 13, 248, 65, 12, 4, 63, 101, 210, 70, 170, 138,
      203, 14, 246, 54, 194, 195, 27, 107, 241, 175, 35, 171, 49, 52, 106, 121,
      45, 36, 152, 85, 215, 132, 78, 167, 34, 18, 167, 245, 152, 133, 134, 170,
      120, 182, 10, 146, 191, 37, 2, 205, 47, 125, 20, 203, 44, 88, 81, 32, 150,
      223, 220, 218, 238, 254, 30, 212, 167, 221, 115, 156, 82, 226, 137, 220,
      221, 97, 3, 139, 202, 33, 9, 27, 26, 126, 40, 215, 25, 126, 9, 82, 208,
      49, 217, 14, 161, 81, 196, 61, 60, 87, 254, 213, 194, 81, 216, 161, 151,
      209, 166, 222, 230, 24, 128, 117, 140, 92, 4, 203, 254, 170, 253, 249, 88,
      90, 112, 226, 18, 44, 122, 39, 158, 158, 56, 69, 204, 159, 5, 179, 51,
      197, 233, 139, 216, 102, 226, 206, 248, 15, 78, 112, 214, 126, 67, 28, 40,
      38, 98, 190, 178, 206, 67, 94, 245, 254, 160, 101, 176, 32, 157, 26, 132,
      83, 252, 228, 87, 242, 32, 127, 160, 112, 210, 224, 133, 149, 115, 41, 30,
      16, 200, 69, 89, 81, 77, 144, 12, 106, 182, 73, 54, 28, 53, 195, 28, 216,
      179, 179, 136, 35, 141, 102, 234, 177, 240, 34, 186, 106, 145, 245, 3, 84,
      48, 251, 157, 245, 11, 217, 111, 227, 138, 42, 67, 114, 211, 177, 37, 103,
      16, 71, 152, 72, 117, 123, 36, 213, 202, 56, 124, 227, 84, 8, 45, 229,
      149, 165, 214, 69, 244, 169, 55, 68, 62, 94, 104, 228, 74, 205, 123, 222,
      17, 7, 172, 158, 227, 74, 206, 149, 67, 175, 171, 251, 185, 121, 151, 223,
      63, 35, 229, 32, 49, 190, 209, 120, 137, 69, 213, 214, 19, 150, 187, 177,
      28, 12, 158, 153, 126, 149, 171, 167, 234, 120, 129, 109, 32, 157, 180,
      75, 66, 56, 233, 115, 127, 230, 157, 32, 34, 143, 156, 31, 230, 168, 174,
      125, 118, 195, 249, 243, 165, 81, 246, 10, 144, 15, 103, 139, 55, 173, 7,
      59, 136, 69, 172, 54, 132, 165, 140, 78, 77, 230, 33, 169, 129, 188, 71,
      209, 109, 161, 8, 57, 57, 199, 143, 31, 164, 43, 58, 130, 1, 110, 145, 31,
      229, 13, 46, 149, 94, 244, 106, 76, 238, 105, 107, 1, 183, 177, 10, 61,
      225, 94, 185, 116, 58, 183, 95, 225, 22, 119, 19, 248, 28, 13, 123, 125,
      108, 158, 64, 184, 77, 245, 153, 162, 217, 227, 208, 41, 185, 211, 235,
      41, 153, 181, 54, 166, 165, 11, 154, 55, 21, 184, 209, 192, 249, 44, 164,
      160, 29, 229, 159, 82, 156, 198, 241, 183, 114, 83, 137, 186, 151, 148,
      31, 21, 197, 216, 145, 32, 13, 50, 22, 241, 137, 39, 71, 28, 142, 160,
      215, 107, 221, 45, 202, 104, 227, 110, 186, 12, 150, 145, 240, 51, 49, 44,
      196, 115, 224, 238, 149, 189, 134, 99, 67, 241, 62, 157, 240, 114, 247,
      195, 26, 200, 141, 97, 147, 249, 23, 150, 174, 10, 13, 219, 81, 73, 58,
      242, 96, 250, 243, 15, 49, 218, 58, 230, 104, 252, 175, 150, 123, 86, 185,
      84, 90, 198, 6, 36, 0, 99, 72, 28, 166, 238, 115, 231, 171, 249, 179, 71,
      174, 68, 156, 227, 17, 198, 79, 73, 142, 99, 144, 20, 80, 62, 80, 191,
      142, 46, 71, 9, 243, 6, 8, 214, 116, 72, 190, 106, 161, 19, 185, 100, 9,
      187, 64, 94, 86, 203, 174, 156, 245, 222, 95, 54, 30, 148, 19, 11, 50,
      112, 96, 61, 237, 159, 173, 7, 154, 127, 175, 79, 48, 97, 89, 78, 126, 66,
      171, 204, 158, 195, 27, 226, 205, 222, 157, 89, 251, 90, 125, 37, 212, 27,
      97, 3, 141, 247, 175, 50, 121, 7, 187, 68, 196, 181, 202, 167, 189, 57,
      84, 81, 222, 23, 27, 84, 130, 176, 98, 66, 240, 207, 18, 23, 28, 163, 163,
      194, 45, 37, 129, 202, 170, 97, 189, 0, 81, 238, 0, 39, 199, 163, 35, 211,
      206, 247, 65, 29, 116, 242, 67, 102, 235, 13, 136, 232, 230, 114, 146,
      187, 7, 254, 142, 26, 121, 16, 237, 5, 160, 201, 114, 94, 178, 199, 95,
      212, 241, 45, 112, 180, 188, 72, 86, 114, 189, 155, 149, 149, 163, 210,
      112, 101, 12, 69, 225, 75, 202, 223, 28, 242, 90, 215, 156, 169, 224, 245,
      135, 128, 92, 148, 217, 131, 208, 255, 25, 135, 117, 136, 5, 104, 185,
      249, 161, 228, 214, 16, 105, 204, 9, 182, 135, 153, 220, 101, 244, 160,
      207, 58, 182, 118, 185, 240, 57, 245, 123, 13, 112, 182, 106, 229, 220,
      90, 29, 86, 215, 96, 147, 232, 2, 55, 131, 225, 137, 68, 245, 89, 141,
      252, 97, 3, 129, 155, 216, 223, 98, 116, 45, 78, 85, 141, 161, 74, 215, 7,
      150, 171, 225, 59, 78, 221, 152, 236, 14, 117, 100, 208, 158, 86, 13, 185,
      124, 87, 157, 111, 40, 187, 182, 124, 173, 71, 173, 23, 199, 52, 155, 190,
      134, 11, 23, 64, 25, 215, 39, 115, 231, 173, 77, 72, 114, 54, 252, 116,
      178, 59, 221, 106, 241, 119, 254, 30, 226, 241, 204, 233, 113, 197, 96,
      146, 0, 41, 67, 3, 231, 126, 12, 218, 202, 22, 171, 114, 249, 176, 134,
      160, 19, 216, 31, 229, 118, 226, 62, 242, 126, 126, 42, 127, 130, 68, 218,
      218, 81, 202, 106, 217, 191, 25, 177, 82, 97, 81, 36, 232, 137, 58, 90,
      216, 190, 117, 235, 20, 194, 144, 76, 178, 27, 213, 13, 208, 18, 29, 118,
      126, 49, 98, 203, 179, 128, 237, 100, 32, 242, 189, 212, 6, 210, 210, 188,
      161, 205, 13, 124, 119, 13, 215, 112, 41, 183, 176, 215, 168, 210, 182,
      111, 1, 115, 2, 239, 141, 8, 177, 124, 112, 48, 197, 2, 239, 11, 99, 4,
      36, 77, 69, 47, 244, 19, 153, 61, 19, 2, 96, 176, 7, 112, 122, 131, 169,
      25, 189, 116, 171, 49, 12, 121, 162, 79, 154, 74, 251, 50, 233, 182, 63,
      180, 224, 118, 49, 253, 21, 20, 16, 31, 144, 184, 93, 174, 231, 244, 183,
      13, 49, 225, 189, 211, 73, 185, 49, 110, 142, 25, 226, 45, 176, 233, 204,
      74, 33, 16, 205, 88, 131, 92, 157, 170, 175, 68, 170, 61, 53, 116, 165,
      16, 27, 182, 160, 181, 87, 241, 15, 151, 85, 107, 76, 167, 129, 25, 172,
      127, 184, 138, 153, 222, 228, 125, 64, 44, 45, 32, 12, 227, 148, 106, 152,
      83, 240, 166, 54, 235, 32, 190, 12, 242, 164, 123, 189, 53, 194, 141, 104,
      43, 202, 110, 4, 168, 119, 245, 232, 179, 178, 198, 1, 224, 87, 86, 160,
      31, 19, 140, 233, 102, 191, 204, 4, 98, 138, 163, 191, 106, 24, 213, 47,
      208, 82, 137, 132, 131, 16, 253, 84, 25, 144, 90, 159, 148, 16, 196, 84,
      166, 61, 160, 101, 229, 227, 93, 118, 59, 87, 66, 16, 128, 59, 96, 131,
      250, 20, 184, 150, 205, 91, 227, 201, 62, 35, 79, 180, 172, 173, 85, 197,
      106, 153, 238, 229, 60, 204, 65, 193, 230, 94, 101, 177, 134, 6, 165, 53,
      171, 142, 208, 155, 2, 11, 4, 202, 127, 54, 17, 142, 117, 227, 121, 128,
      204, 192, 147, 147, 92, 189, 5, 224, 148, 72, 18, 83, 101, 126, 124, 228,
      153, 242, 123, 229, 247, 92, 221, 6, 73, 227, 250, 87, 167, 194, 129, 187,
      73, 38, 185, 109, 217, 240, 193, 88, 50, 178, 180, 151, 54, 197, 187, 137,
      190, 166, 233, 1, 103, 204, 88, 31, 127, 185, 29, 65, 1, 29, 254, 223, 14,
      83, 167, 215, 114, 248, 30, 173, 89, 173, 187, 69, 5, 105, 117, 15, 106,
      94, 173, 63, 227, 25, 230, 190, 136, 168, 177, 175, 107, 91, 126, 254, 34,
      188, 25, 118, 48, 12, 226, 130, 153, 162, 57, 47, 181, 212, 79, 160, 97,
      64, 157, 246, 90, 53, 43, 149, 76, 102, 15, 195, 107, 58, 242, 84, 172,
      29, 81, 198, 113, 81, 251, 138, 182, 154, 111, 30, 171, 129, 56, 17, 45,
      214, 153, 112, 117, 203, 174, 40, 38, 234, 236, 32, 4, 112, 225, 26, 187,
      195, 246, 252, 9, 218, 69, 160, 223, 178, 54, 148, 81, 8, 134, 151, 75,
      248, 63, 224, 240, 48, 75, 250, 221, 85, 46, 100, 50, 3, 70, 64, 102, 111,
      160, 155, 233, 59, 147, 184, 57, 61, 6, 126, 79, 176, 16, 185, 94, 166,
      33, 135, 78, 42, 75, 140, 208, 140, 44, 153, 187, 64, 103, 119, 160, 236,
      16, 239, 74, 218, 219, 212, 207, 110, 53, 30, 76, 248, 40, 111, 98, 44,
      20, 113, 204, 233, 109, 135, 96, 107, 39, 163, 203, 125, 45, 157, 152, 71,
      239, 175, 174, 159, 147, 80, 111, 93, 38, 253, 228, 154, 225, 181, 101,
      12, 241, 127, 65, 49, 189, 5, 85, 151, 237, 213, 143, 14, 104, 138, 54,
      52, 27, 4, 132, 67, 35, 156, 86, 157, 73, 16, 229, 222, 245, 110, 79, 165,
      179, 56, 179, 53, 218, 229, 100, 58, 87, 149, 48, 231, 64, 63, 115, 67, 3,
      172, 6, 186, 115, 154, 60, 53, 214, 152, 149, 89, 234, 37, 143, 82, 255,
      64, 28, 183, 93, 112, 39, 70, 185, 57, 0, 199, 9, 61, 175, 219, 41, 76,
      37, 176, 82, 125, 65, 53, 160, 214, 105, 62, 153, 244, 222, 96, 205, 6,
      178, 85, 41, 240, 113, 0, 96, 149, 38, 3, 195, 18, 152, 41, 246, 3, 103,
      29, 110, 134, 30, 101, 75, 46, 103, 199, 184, 20, 230, 8, 55, 120, 4, 229,
      168, 35, 43, 7, 28, 161, 143, 87, 27, 87, 79, 255, 186, 44, 195, 158, 155,
      181, 119, 81, 172, 217, 107, 95, 98, 55, 243, 186, 66, 105, 48, 224, 123,
      232, 84, 156, 20, 10, 156, 208, 204, 52, 34, 228, 136, 97, 242, 200, 246,
      211, 67, 202, 40, 241, 91, 92, 253, 9, 54, 72, 131, 221, 106, 178, 32, 44,
      182, 4, 225, 193, 37, 20, 249, 249, 231, 10, 206, 18, 71, 254, 221, 187,
      172, 88, 204, 6, 127, 138, 102, 7, 208, 75, 147, 219, 199, 177, 79, 36,
      170, 101, 207, 177, 109, 95, 143, 217, 41, 199, 80, 183, 201, 2, 254, 12,
      55, 23, 198, 14, 255, 69, 245, 138, 155, 129, 227, 167, 168, 130, 156,
      135, 14, 96, 93, 48, 99, 143, 107, 126, 92, 117, 143, 112, 108, 193, 228,
      84, 13, 41, 186, 27, 172, 92, 201, 149, 116, 19, 112, 197, 116, 209, 128,
      102, 1, 55, 152, 177, 28, 37, 34, 50, 83, 41, 199, 74, 178, 59, 111, 67,
      118, 35, 252, 36, 33, 87, 28, 170, 17, 215, 47, 90, 154, 124, 137, 15, 14,
      211, 59, 75, 59, 30, 77, 0, 49, 37, 225, 191, 87, 101, 127, 214, 227, 160,
      99, 174, 234, 82, 148, 235, 16, 241, 219, 147, 170, 127, 221, 250, 116,
      39, 218, 156, 72, 227, 172, 55, 0, 79, 188, 76, 51, 222, 232, 24, 36, 62,
      94, 154, 3, 61, 230, 146, 114, 253, 0, 128, 58, 253, 90, 72, 211, 242, 38,
      39, 133, 153, 161, 119, 105, 195, 152, 225, 208, 105, 140, 80, 217, 186,
      196, 157, 21, 116, 230, 116, 139, 25, 159, 143, 118, 128, 77, 201, 238,
      247, 228, 15, 168, 4, 133, 148, 21, 148, 12, 44, 241, 7, 115, 17, 129,
      176, 202, 46, 130, 122, 129, 235, 141, 223, 85, 21, 199, 65, 181, 169, 52,
      174, 161, 153, 62, 25, 164, 115, 213, 89, 138, 199, 103, 79, 200, 165,
      135, 249, 244, 27, 209, 178, 240, 129, 211, 61, 9, 111, 157, 147, 119, 36,
      119, 255, 110, 130, 84, 49, 210, 225, 247, 100, 26, 121, 127, 163, 160,
      26, 79, 99, 24, 77, 65, 32, 178, 109, 36, 27, 253, 173, 110, 183, 11, 14,
      211, 57, 130, 254, 124, 104, 165, 219, 31, 70, 97, 14, 194, 39, 61, 26,
      141, 125, 228, 126, 194, 184, 101, 160, 204, 106, 128, 144, 106, 103, 171,
      18, 246, 129, 220, 85, 172, 151, 123, 5, 73, 155, 192, 175, 91, 157, 239,
      61, 237, 116, 170, 65, 233, 56, 19, 49, 114, 168, 190, 3, 214, 53, 250,
      90, 213, 244, 88, 101, 30, 229, 248, 124, 15, 71, 141, 27, 172, 235, 21,
      129, 211, 72, 61, 172, 112, 170, 128, 135, 96, 196, 221, 255, 27, 176,
      105, 188, 183, 121, 33, 37, 149, 53, 131, 226, 233, 29, 167, 234, 218,
      109, 53, 185, 152, 36, 248, 53, 61, 235, 78, 21, 201, 214, 210, 163, 12,
      251, 187, 45, 188, 137, 126, 127, 237, 92, 234, 91, 240, 225, 38, 194, 57,
      213, 251, 237, 171, 30, 99, 52, 14, 49, 84, 101, 252, 237, 7, 166, 122,
      114, 32, 107, 32, 207, 239, 136, 168, 178, 12, 11, 241, 233, 230, 146,
      132, 18, 83, 233, 41, 172, 17, 6, 161, 42, 113, 87, 40, 255, 185, 1, 146,
      128, 5, 240, 126, 131, 71, 42, 54, 124, 205, 2, 122, 71, 30, 222, 229, 40,
      134, 142, 102, 97, 239, 151, 177, 1, 230, 231, 49, 123, 219, 28, 129, 91,
      152, 112, 13, 154, 81, 197, 226, 255, 112, 158, 178, 177, 55, 181, 108,
      138, 185, 245, 29, 186, 21, 73, 188, 209, 154, 200, 89, 116, 235, 198,
      144, 36, 87, 248, 22, 7, 200, 122, 7, 148, 44, 42, 87, 140, 238, 204, 95,
      231, 252, 0, 136, 0, 22, 39, 70, 123, 125, 165, 113, 227, 172, 146, 163,
      128, 158, 36, 52, 91, 19, 36, 245, 27, 150, 138, 141, 11, 67, 239, 224,
      65, 24, 116, 101, 7, 39, 46, 142, 172, 164, 243, 148, 0, 33, 226, 59, 47,
      203, 137, 156, 241, 66, 250, 157, 30, 204, 101, 143, 134, 98, 238, 155,
      226, 25, 184, 136, 219, 89, 100, 193, 11, 143, 71, 139, 243, 230, 151, 0,
      249, 1, 78, 26, 32, 93, 104, 157, 67, 97, 164, 248, 86, 124, 146, 93, 74,
      222, 228, 167, 55, 53, 100, 135, 216, 109, 13, 64, 37, 106, 177, 200, 200,
      182, 92, 251, 69, 31, 243, 89, 80, 198, 14, 132, 203, 72, 103, 28, 104,
      217, 24, 97, 223, 113, 11, 29, 178, 191, 210, 46, 162, 255, 68, 99, 8,
      237, 213, 162, 152, 193, 183, 121, 203, 19, 108, 182, 29, 86, 26, 192,
      103, 220, 103, 205, 154, 179, 197, 9, 22, 73, 127, 175, 146, 38, 119, 210,
      0, 24, 180, 21, 245, 215, 204, 91, 186, 119, 138, 183, 239, 15, 155, 231,
      248, 133, 39, 24, 101, 144, 236, 10, 230, 54, 174, 227, 73, 21, 110, 10,
      160, 241, 232, 131, 14, 212, 127, 232, 59, 122, 65, 146, 54, 163, 9, 189,
      190, 121, 88, 170, 62, 194, 14, 204, 152, 245, 38, 131, 37, 91, 81, 72,
      114, 29, 115, 239, 182, 56, 44, 156, 159, 177, 180, 82, 160, 93, 97, 86,
      183, 236, 50, 95, 85, 39, 71, 181, 225, 152, 143, 63, 123, 117, 34, 44,
      109, 160, 166, 229, 240, 91, 138, 102, 54, 180, 173, 44, 50, 80, 42, 124,
      7, 50, 124, 211, 239, 21, 94, 197, 185, 239, 213, 107, 142, 64, 95, 124,
      125, 17, 180, 97, 189, 101, 52, 48, 19, 112, 12, 70, 9, 212, 177, 54, 118,
      66, 84, 147, 236, 248, 26, 124, 95, 103, 135, 254, 124, 49, 112, 186, 99,
      120, 90, 8, 194, 191, 88, 57, 242, 65, 61, 10, 104, 246, 197, 252, 19,
      159, 58, 194, 75, 173, 242, 103, 8, 115, 84, 69, 238, 149, 26, 15, 159,
      182, 141, 132, 119, 70, 29, 53, 20, 143, 46, 163, 204, 6, 236, 59, 45,
      185, 172, 89, 119, 83, 38, 144, 36, 222, 96, 151, 26, 99, 195, 163, 170,
      133, 92, 159, 214, 53, 150, 116, 90, 176, 69, 145, 130, 15, 172, 140, 217,
      215, 101, 163, 115, 161, 65, 101, 8, 7, 183, 113, 213, 134, 58, 175, 130,
      251, 143, 173, 248, 168, 135, 60, 159, 30, 194, 68, 208, 119, 120, 2, 40,
      178, 227, 247, 161, 77, 47, 136, 46, 244, 163, 72, 65, 158, 25, 225, 195,
      61, 132, 182, 204, 177, 186, 200, 81, 2, 65, 105, 212, 72, 94, 203, 232,
      217, 182, 123, 251, 228, 160, 1, 161, 204, 123, 20, 37, 1, 77, 208, 179,
      45, 149, 181, 122, 102, 190, 123, 213, 164, 231, 41, 216, 130, 234, 248,
      208, 251, 252, 220, 84, 209, 67, 47, 61, 220, 5, 142, 162, 26, 236, 121,
      142, 248, 132, 255, 65, 122, 203, 196, 102, 191, 187, 2, 195, 127, 255,
      193, 92, 49, 91, 186, 154, 39, 156, 29, 211, 172, 49, 104, 245, 114, 153,
      223, 211, 199, 249, 35, 130, 160, 128, 0, 152, 176, 183, 20, 236, 113,
      193, 108, 26, 255, 11, 237, 102, 133, 245, 94, 115, 114, 10, 89, 229, 214,
      221, 99, 149, 30, 99, 37, 246, 10, 26, 26, 39, 92, 123, 170, 73, 211, 127,
      227, 54, 30, 86, 133, 159, 112, 225, 91, 148, 100, 174, 149, 75, 143, 14,
      140, 20, 44, 64, 212, 5, 243, 8, 116, 63, 30, 97, 42, 123, 20, 73, 212,
      85, 207, 83, 122, 27, 251, 233, 84, 10, 17, 236, 232, 83, 200, 127, 119,
      143, 163, 204, 220, 167, 59, 231, 20, 106, 186, 222, 191, 8, 40, 234, 21,
      25, 180, 13, 116, 250, 152, 224, 174, 75, 3, 205, 38, 173, 215, 236, 151,
      185, 121, 254, 244, 154, 239, 17, 53, 106, 164, 61, 49, 116, 216, 118, 94,
      150, 35, 181, 26, 238, 66, 49, 211, 221, 132, 146, 166, 115, 39, 136, 36,
      205, 230, 179, 31, 197, 51, 148, 165, 109, 38, 70, 37, 148, 52, 44, 209,
      250, 98, 58, 246, 225, 103, 198, 101, 26, 25, 196, 207, 8, 166, 21, 88,
      252, 175, 253, 10, 88, 107, 157, 19, 225, 61, 12, 246, 221, 37, 239, 186,
      167, 137, 142, 135, 222, 128, 174, 62, 95, 216, 38, 141, 157, 45, 232, 97,
      217, 173, 203, 234, 116, 129, 69, 206, 189, 94, 221, 12, 54, 139, 186,
      247, 184, 16, 200, 121, 244, 104, 8, 7, 35, 111, 47, 188, 10, 140, 92, 73,
      143, 206, 203, 72, 122, 184, 20, 102, 197, 130, 64, 150, 63, 96, 239, 8,
      132, 111, 217, 84, 91, 198, 32, 43, 100, 138, 241, 15, 160, 42, 190, 253,
      193, 184, 164, 124, 29, 210, 96, 67, 224, 221, 182, 29, 218, 129, 149, 29,
      128, 174, 98, 88, 88, 125, 56, 40, 255, 120, 5, 0, 87, 174, 42, 150, 90,
      112, 201, 183, 169, 19, 57, 195, 191, 12, 58, 244, 235, 132, 25, 145, 72,
      146, 214, 8, 125, 100, 135, 12, 5, 102, 97, 248, 174, 24, 159, 90, 33, 43,
      187, 6, 61, 212, 241, 225, 190, 219, 252, 197, 123, 129, 164, 108, 123,
      55, 230, 4, 153, 166, 105, 234, 15, 85, 216, 23, 56, 32, 3, 41, 110, 68,
      146, 172, 133, 202, 98, 41, 7, 47, 152, 35, 255, 168, 106, 241, 226, 222,
      77, 244, 52, 185, 65, 252, 227, 32, 66, 38, 11, 172, 60, 28, 28, 103, 84,
      1, 1, 205, 182, 190, 28, 189, 102, 253, 43, 1, 191, 148, 116, 10, 227, 18,
      81, 93, 80, 239, 157, 232, 215, 180, 163, 165, 161, 109, 177, 71, 150,
      244, 144, 208, 160, 110, 22, 174, 60, 206, 43, 103, 121, 55, 103, 114,
      115, 173, 238, 13, 10, 227, 251, 41, 176, 216, 158, 229, 216, 55, 234,
      128, 128, 20, 167, 106, 181, 86, 163, 130, 215, 110, 149, 191, 10, 227,
      215, 8, 214, 154, 178, 181, 15, 19, 0, 247, 250, 97, 74, 43, 157, 55, 94,
      174, 41, 41, 9, 199, 97, 20, 91, 32, 18, 10, 43, 98, 240, 247, 203, 20,
      250, 117, 160, 44, 229, 202, 187, 64, 54, 124, 15, 184, 169, 129, 27, 160,
      240, 26, 61, 255, 60, 166, 60, 144, 209, 84, 55, 187, 186, 168, 13, 124,
      125, 29, 17, 100, 249, 227, 62, 205, 78, 179, 163, 168, 139, 168, 21, 38,
      83, 239, 151, 74, 43, 66, 2, 92, 72, 71, 94, 216, 134, 238, 20, 45, 158,
      213, 164, 73, 57, 80, 47, 198, 184, 130, 223, 227, 71, 132, 133, 235, 177,
      85, 174, 142, 124, 172, 200, 54, 229, 40, 126, 60, 76, 92, 216, 153, 56,
      241, 174, 66, 141, 90, 226, 3, 30, 68, 234, 71, 187, 163, 112, 146, 255,
      22, 143, 170, 204, 3, 127, 179, 81, 139, 160, 37, 77, 246, 128, 220, 196,
      158, 153, 73, 177, 65, 199, 119, 29, 197, 144, 130, 248, 206, 155, 253,
      108, 213, 124, 7, 223, 221, 162, 146, 134, 242, 65, 99, 162, 107, 120,
      247, 214, 207, 96, 150, 169, 131, 208, 218, 221, 28, 24, 112, 208, 23, 1,
      130, 142, 232, 56, 104, 45, 33, 158, 95, 255, 123, 31, 74, 76, 120, 178,
      155, 213, 6, 195, 164, 8, 8, 69, 241, 197, 127, 83, 169, 21, 167, 19, 94,
      143, 252, 33, 159, 248, 241, 170, 153, 147, 1, 149, 199, 201, 131, 170,
      79, 236, 212, 209, 143, 107, 98, 24, 123, 56, 33, 193, 85, 247, 64, 225,
      135, 210, 78, 145, 57, 16, 145, 71, 170, 20, 133, 87, 235, 4, 166, 239,
      100, 82, 235, 81, 50, 223, 9, 193, 52, 49, 86, 129, 190, 196, 82, 165,
      107, 63, 115, 161, 98, 33, 20, 193, 29, 42, 151, 205, 252, 124, 72, 245,
      48, 181, 67, 7, 13, 21, 127, 59, 226, 188, 144, 129, 112, 244, 192, 121,
      213, 80, 42, 196, 1, 13, 107, 108, 78, 0, 40, 121, 225, 148, 237, 234,
      209, 216, 238, 9, 147, 226, 254, 96, 89, 212, 72, 193, 106, 75, 135, 74,
      227, 67, 255, 92, 191, 81, 188, 124, 226, 149, 152, 142, 15, 159, 195,
      238, 114, 55, 255, 166, 157, 230, 59, 148, 170, 166, 151, 65, 213, 104,
      253, 253, 112, 150, 82, 147, 137, 27, 214, 100, 247, 65, 81, 92, 47, 86,
      217, 7, 45, 120, 81, 130, 31, 236, 243, 76, 78, 3, 45, 105, 172, 220, 71,
      48, 220, 94, 196, 249, 163, 193, 133, 50, 236, 205, 20, 55, 2, 63, 14,
      127, 69, 113, 212, 204, 12, 58, 79, 89, 86, 29, 61, 199, 201, 64, 149, 6,
      144, 182, 150, 129, 31, 18, 167, 120, 248, 82, 107, 25, 143, 128, 27, 161,
      28, 25, 153, 183, 217, 238, 78, 186, 106, 92, 27, 202, 219, 165, 96, 0,
      216, 234, 169, 73, 101, 39, 182, 113, 217, 240, 170, 116, 172, 221, 250,
      233, 48, 49, 242, 83, 227, 92, 181, 184, 72, 230, 180, 21, 15, 108, 135,
      25, 38, 153, 25, 124, 227, 26, 149, 73, 236, 39, 211, 244, 149, 58, 183,
      132, 26, 223, 219, 174, 144, 117, 233, 219, 165, 205, 157, 159, 222, 184,
      52, 47, 241, 201, 123, 65, 24, 44, 55, 215, 177, 168, 250, 179, 115, 190,
      227, 123, 158, 163, 179, 224, 69, 196, 66, 207, 254, 243, 101, 221, 193,
      140, 250, 4, 28, 222, 52, 96, 138, 160, 33, 218, 64, 118, 214, 234, 201,
      152, 148, 91, 178, 111, 107, 144, 142, 6, 182, 102, 72, 188, 34, 213, 181,
      26, 223, 58, 255, 103, 81, 17, 47, 169, 11, 245, 224, 123, 148, 215, 237,
      186, 107, 75, 152, 90, 202, 166, 22, 149, 197, 5, 246, 238, 78, 76, 229,
      106, 199, 94, 127, 195, 0, 45, 82, 6, 159, 103, 96, 138, 231, 71, 46, 107,
      59, 216, 39, 43, 12, 221, 27, 214, 56, 155, 145, 66, 187, 169, 250, 235,
      78, 211, 179, 239, 183, 198, 163, 93, 5, 196, 24, 174, 143, 225, 106, 139,
      89, 98, 13, 127, 207, 184, 194, 30, 1, 165, 198, 169, 8, 197, 118, 86,
      163, 221, 138, 23, 209, 61, 116, 79, 99, 233, 43, 130, 60, 244, 85, 229,
      243, 172, 123, 148, 200, 120, 192, 127, 211, 52, 11, 159, 41, 95, 212,
      230, 188, 169, 156, 137, 29, 212, 12, 148, 168, 148, 133, 243, 44, 241,
      139, 127, 24, 246, 220, 227, 125, 209, 97, 60, 52, 162, 192, 146, 49, 161,
      92, 138, 112, 189, 128, 59, 126, 125, 46, 207, 60, 79, 231, 174, 152, 209,
      68, 223, 205, 2, 38, 14, 91, 116, 159, 255, 28, 27, 178, 248, 164, 104,
      158, 79, 69, 214, 234, 157, 12, 75, 163, 83, 253, 245, 202, 61, 213, 176,
      6, 197, 230, 29, 208, 166, 253, 194, 254, 235, 29, 141, 241, 70, 249, 15,
      62, 0, 148, 163, 135, 52, 122, 40, 96, 87, 31, 179, 152, 51, 216, 133,
      184, 122, 198, 203, 60, 115, 218, 191, 193, 16, 178, 25, 148, 252, 112,
      104, 103, 252, 36, 92, 221, 28, 179, 43, 199, 198, 151, 128, 100, 252,
      217, 161, 249, 34, 201, 172, 118, 52, 180, 252, 104, 7, 223, 44, 116, 102,
      212, 21, 40, 224, 184, 55, 163, 210, 21, 207, 161, 239, 51, 54, 155, 41,
      133, 18, 67, 48, 3, 165, 130, 251, 4, 79, 214, 57, 72, 130, 157, 212, 144,
    ],
    Xp = [
      0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 29, 31,
      34, 36, 39, 41, 44, 46, 49, 51, 54, 56, 59, 61, 64, 65, 66, 67, 68, 69,
      70, 72, 73, 74, 75, 76, 77, 79, 80, 81, 82, 83, 84, 85, 87, 88, 89, 90,
      91, 92, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 109,
      110, 111, 112, 113, 114, 116, 117, 118, 119, 120, 121, 123, 124, 125, 126,
      127, 128, 129, 131, 132, 133, 134, 135, 136, 138, 139, 140, 141, 142, 143,
      145, 146, 147, 148, 149, 150, 151, 153, 154, 155, 156, 157, 158, 160, 161,
      162, 163, 164, 165, 166, 168, 169, 170, 171, 172, 173, 175, 176, 177, 178,
      179, 180, 182, 183, 184, 185, 186, 187, 188, 190, 191, 192, 193, 194, 195,
      197, 198, 199, 200, 201, 202, 204, 205, 206, 207, 208, 209, 210, 212, 213,
      214, 215, 216, 217, 219, 220, 221, 222, 223, 224, 226, 226, 226, 227, 227,
      227, 228, 228, 228, 229, 229, 229, 230, 230, 231, 231, 231, 232, 232, 232,
      233, 233, 233, 234, 234, 235, 235, 235, 236, 236, 236, 237, 237, 237, 238,
      238, 239, 239, 239, 240, 240, 240, 241, 241, 241, 242, 242, 243, 243, 243,
      244, 244, 244, 245, 245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248,
      249, 249, 249, 250, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253,
      254, 254, 254, 255,
    ],
    ll = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 35, 36, 37, 39, 40, 42,
      43, 44, 46, 47, 49, 50, 51, 53, 54, 56, 57, 58, 59, 61, 62, 63, 64, 66,
      67, 68, 69, 71, 72, 73, 74, 76, 77, 78, 79, 81, 82, 83, 84, 86, 87, 88,
      90, 91, 92, 93, 95, 96, 97, 98, 100, 101, 102, 103, 105, 106, 107, 108,
      110, 111, 112, 113, 115, 116, 117, 118, 120, 121, 122, 124, 125, 126, 127,
      129, 130, 131, 132, 134, 135, 136, 137, 139, 140, 141, 142, 144, 145, 146,
      147, 149, 150, 151, 152, 154, 155, 156, 158, 159, 160, 161, 163, 164, 165,
      166, 168, 169, 170, 171, 173, 174, 175, 176, 178, 179, 180, 181, 183, 184,
      185, 186, 188, 189, 190, 192, 193, 194, 195, 197, 198, 199, 200, 202, 203,
      204, 205, 207, 208, 209, 210, 212, 213, 214, 215, 217, 218, 219, 220, 222,
      223, 224, 226, 226, 226, 227, 227, 228, 228, 229, 229, 230, 230, 231, 231,
      232, 232, 233, 233, 234, 234, 234, 235, 235, 236, 236, 237, 237, 238, 238,
      239, 239, 240, 240, 241, 241, 242, 242, 243, 243, 243, 244, 244, 244, 245,
      245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248, 249, 249, 249, 250,
      250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 254, 254, 254, 255,
    ],
    Yp = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22,
      23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41,
      43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62,
      63, 65, 66, 67, 68, 69, 70, 72, 73, 74, 76, 77, 78, 80, 81, 83, 84, 85,
      87, 88, 89, 91, 92, 94, 95, 96, 98, 99, 100, 102, 103, 105, 106, 107, 109,
      110, 111, 113, 114, 116, 117, 118, 120, 121, 122, 124, 125, 127, 128, 129,
      131, 132, 133, 135, 136, 138, 139, 140, 142, 143, 144, 146, 147, 149, 150,
      151, 153, 154, 155, 157, 158, 160, 161, 162, 163, 164, 165, 166, 167, 168,
      169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183,
      184, 185, 186, 187, 188, 189, 190, 191, 192, 192, 193, 193, 194, 195, 195,
      196, 197, 197, 198, 199, 199, 200, 201, 201, 202, 203, 203, 204, 205, 205,
      206, 207, 207, 208, 209, 209, 210, 211, 211, 212, 213, 213, 214, 215, 215,
      216, 217, 217, 218, 219, 219, 220, 221, 221, 222, 223, 223, 224, 225, 225,
      226, 227, 227, 228, 229, 229, 230, 231, 231, 232, 233, 233, 234, 235, 235,
      236, 237, 237, 238, 239, 239, 240, 241, 241, 242, 243, 243, 244, 245, 245,
      246, 247, 247, 248, 249, 249, 250, 251, 251, 252, 253, 253, 254, 255,
    ];
  class Zp extends Wb {
    constructor(a, b, d, e) {
      super(a, Wp, d, e);
      this.lightLevel = 0.1;
      this.rednessLevel = 0.5;
      this.mskin_he_max = (175 / 180) * 3.141593;
      this.mskin_he_min = (115 / 180) * 3.141593;
      this.mskin_hc_max = (173 / 180) * 3.141593;
      this.mskin_hc_min = (116 / 180) * 3.141593;
      this.mskin_hc_axis = 2.04203545;
      this.mfacts_rotate_ge = this.mfacts_rotate_le = this.mfacts_rotate_c = 0;
      this.tab_addr = null;
      this.lutTextures = [];
      this.inputTexture = b;
      this.init();
    }
    setUniforms() {
      var a = this.gl.getUniformLocation(this.program, "u_flipY"),
        b = this.gl.getUniformLocation(this.program, "u_denoiseLevel");
      this.gl.uniform1f(b, this.denoiseLevel);
      this.gl.uniform1f(a, 1);
      a = this.gl.getUniformLocation(this.program, "light");
      this.gl.uniform1f(a, this.lightLevel);
      a = this.gl.getUniformLocation(this.program, "redness");
      this.gl.uniform1f(a, this.rednessLevel);
      a = this.gl.getUniformLocation(this.program, "skin_he_max");
      b = this.gl.getUniformLocation(this.program, "skin_he_min");
      var d = this.gl.getUniformLocation(this.program, "skin_hc_max"),
        e = this.gl.getUniformLocation(this.program, "skin_hc_min");
      let f = this.gl.getUniformLocation(this.program, "skin_hc_axis"),
        g = this.gl.getUniformLocation(this.program, "facts_rotate_c"),
        k = this.gl.getUniformLocation(this.program, "facts_rotate_le"),
        h = this.gl.getUniformLocation(this.program, "facts_rotate_ge");
      this.gl.uniform1f(a, this.mskin_he_max);
      this.gl.uniform1f(b, this.mskin_he_min);
      this.gl.uniform1f(d, this.mskin_hc_max);
      this.gl.uniform1f(e, this.mskin_hc_min);
      this.gl.uniform1f(f, this.mskin_hc_axis);
      this.gl.uniform1f(g, this.mfacts_rotate_c);
      this.gl.uniform1f(k, this.mfacts_rotate_le);
      this.gl.uniform1f(h, this.mfacts_rotate_ge);
      a = this.gl.getUniformLocation(this.program, "u_originImage");
      this.gl.activeTexture(this.gl.TEXTURE2);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
      this.gl.uniform1i(a, 2);
      a = ["lighten_lut"];
      b = [this.gl.TEXTURE3];
      for (d = 0; d < a.length; d++)
        (e = this.gl.getUniformLocation(this.program, a[d])),
          this.gl.activeTexture(b[d]),
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.lutTextures[d]),
          this.gl.uniform1i(e, d + 3);
    }
    setParameters(a) {
      void 0 !== a.denoiseLevel && (this.denoiseLevel = a.denoiseLevel);
      void 0 !== a.lightLevel && (this.lightLevel = a.lightLevel);
      void 0 !== a.rednessLevel &&
        ((this.rednessLevel = a.rednessLevel),
        this.updateRedness(this.rednessLevel));
      a.lighteningContrastLevel && this.updateLut(a.lighteningContrastLevel);
    }
    init() {
      this.tab_addr = new Uint8Array(ll);
      let a = [this.tab_addr],
        b = [256],
        d = [1];
      for (let e = 0; e < a.length; e++) {
        let f = this.gl.createTexture();
        if (!f)
          throw new m(l.WEBGL_INTERNAL_ERROR, "create lut texture failed");
        this.gl.bindTexture(this.gl.TEXTURE_2D, f);
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          0,
          this.gl.LUMINANCE,
          b[e],
          d[e],
          0,
          this.gl.LUMINANCE,
          this.gl.UNSIGNED_BYTE,
          a[e]
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_S,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_T,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MIN_FILTER,
          this.gl.LINEAR
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MAG_FILTER,
          this.gl.LINEAR
        );
        this.lutTextures.push(f);
      }
    }
    updateRedness(a) {
      var b = a;
      1 < a && (a = 1);
      0 > a && (a = 0);
      1 < b && (b = 1);
      0 > b && (b = 0);
      this.mfacts_rotate_c = 0.8 * a;
      0.8 > b && (b = 0);
      this.mskin_he_max = (175 / 180) * 3.141593;
      this.mskin_hc_max = (173 / 180) * 3.141593;
      this.mskin_he_min = ((115 - 4 * b) / 180) * 3.141593;
      this.mskin_hc_min = ((116 - 4 * b) / 180) * 3.141593;
      this.mskin_hc_axis = ((117 - 4 * b) / 180) * 3.141593;
      this.mskin_hc_axis < this.mskin_hc_min &&
        (this.mskin_hc_axis = this.mskin_hc_min);
      1.5707965 > this.mskin_hc_min && (this.mskin_hc_min = 1.5707965);
      1.5707965 > this.mskin_hc_axis && (this.mskin_hc_axis = 1.5707965);
      1.5707965 > this.mskin_he_min && (this.mskin_he_min = 1.5707965);
      3.141593 < this.mskin_hc_max && (this.mskin_hc_max = 3.141593);
      3.141593 < this.mskin_hc_axis && (this.mskin_hc_axis = 3.141593);
      3.141593 < this.mskin_he_max && (this.mskin_he_max = 3.141593);
      a = this.mskin_he_max - this.mskin_hc_max;
      b = this.mskin_hc_max - this.mskin_hc_axis;
      this.mfacts_rotate_ge =
        0.01 < a ? (this.mfacts_rotate_c * b) / a : this.mfacts_rotate_c;
      a = this.mskin_hc_min - this.mskin_he_min;
      b = this.mskin_hc_axis - this.mskin_hc_min;
      this.mfacts_rotate_le =
        0.01 < a ? (this.mfacts_rotate_c * b) / a : this.mfacts_rotate_c;
    }
    updateLut(a) {
      var b = null;
      if ((0 === a && (b = ll), 1 === a && (b = Yp), 2 === a && (b = Xp), !b))
        throw new m(l.WEBGL_INTERNAL_ERROR, "invalid ylut_table value:" + a);
      this.tab_addr = new Uint8Array(b);
      a = [this.tab_addr];
      b = [256];
      let d = [1];
      for (let e = 0; e < a.length; e++)
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.lutTextures[e]),
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.LUMINANCE,
            b[e],
            d[e],
            0,
            this.gl.LUMINANCE,
            this.gl.UNSIGNED_BYTE,
            a[e]
          );
    }
  }
  class $p {
    constructor() {
      this.canvas = this.gl = null;
      this.programs = [];
      this.inputTexture = this.commonProgram = null;
      this.outputTextures = [];
      this.fbos = [];
      this.originalFrameHeight = this.originalFrameWidth = 0;
      this.enableBeauty = !1;
      this.denoiseLevel = 5;
      this.lightLevel = 0.35;
      this.rednessLevel = 0.5;
      this.lighteningContrastLevel = 1;
    }
    setEnableBeauty(a) {
      this.enableBeauty = !!a;
    }
    init(a, b, d) {
      if (!fa.supportWebGL)
        throw new m(l.NOT_SUPPORTED, "your browser is not support webGL");
      if (((this.gl = d.getContext("webgl")), !this.gl))
        throw new m(l.WEBGL_INTERNAL_ERROR, "can not get webgl context");
      if ((this.initGL(a, b), !this.inputTexture))
        throw new m(l.WEBGL_INTERNAL_ERROR, "can not find input texture");
      this.canvas = d;
      this.programs.push(new kl(this.gl));
      this.programs.push(new Rp(this.gl, a, b));
      this.programs.push(new Tp(this.gl, a, b));
      this.programs.push(new Vp(this.gl, a, b));
      this.programs.push(new Zp(this.gl, this.inputTexture, a, b));
      this.commonProgram = this.programs[0].program;
      this.setDenoiseLevel(this.denoiseLevel);
      this.setLightLevel(this.lightLevel);
      this.setRednessLevel(this.rednessLevel);
      this.setContrastLevel(this.lighteningContrastLevel);
    }
    render(a) {
      if (!this.gl || !this.commonProgram || !this.canvas)
        return void h.warning("video effect manager is not init!");
      var b = 0;
      if (
        this.originalFrameHeight === a.videoWidth &&
        this.originalFrameWidth === a.videoHeight
      )
        b = 2;
      else if (
        this.originalFrameHeight !== a.videoHeight ||
        this.originalFrameWidth !== a.videoWidth
      ) {
        var d, e, f;
        if (
          (h.debug(
            n(
              (d = n(
                (e = n(
                  (f = "beauty effect: resolution changed ".concat(
                    this.originalFrameWidth,
                    "x"
                  ))
                ).call(f, this.originalFrameHeight, " -> "))
              ).call(e, a.videoWidth, "x"))
            ).call(d, a.videoHeight)
          ),
          0 === a.videoHeight || 0 === a.videoWidth)
        )
          return void h.debug("beauty effect: skip 0 resolution frame");
        this.canvas.width = a.videoWidth;
        this.canvas.height = a.videoHeight;
        a.setAttribute("width", a.videoWidth.toString());
        a.setAttribute("height", a.videoHeight.toString());
        this.release();
        this.init(a.videoWidth, a.videoHeight, this.canvas);
      }
      this.gl.viewport(0, 0, a.videoWidth, a.videoHeight);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        a
      );
      a = this.enableBeauty ? this.programs.length - 1 : 0;
      for (d = 0; d <= a; d++)
        (e = this.programs[d].program),
          this.gl.useProgram(e),
          (e = this.gl.getUniformLocation(e, "u_image")),
          this.programs[d].setUniforms(),
          this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbos[b + (d % 2)]),
          this.gl.clearColor(0, 0, 0, 1),
          this.gl.clear(this.gl.COLOR_BUFFER_BIT),
          this.gl.drawArrays(this.gl.TRIANGLES, 0, 6),
          this.gl.activeTexture(this.gl.TEXTURE0),
          this.gl.bindTexture(
            this.gl.TEXTURE_2D,
            this.outputTextures[b + (d % 2)]
          ),
          this.gl.uniform1i(e, 0);
      this.gl.useProgram(this.commonProgram);
      b = this.gl.getUniformLocation(this.commonProgram, "u_flipY");
      this.gl.uniform1f(b, -1);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    setDenoiseLevel(a) {
      var b;
      r((b = this.programs)).call(b, (b) => {
        b instanceof Wb && b.setParameters({ denoiseLevel: a });
      });
      this.denoiseLevel = a;
    }
    setLightLevel(a) {
      var b;
      r((b = this.programs)).call(b, (b) => {
        b instanceof Wb && b.setParameters({ lightLevel: a });
      });
      this.lightLevel = a;
    }
    setRednessLevel(a) {
      var b;
      r((b = this.programs)).call(b, (b) => {
        b instanceof Wb && b.setParameters({ rednessLevel: a });
      });
      this.rednessLevel = a;
    }
    setContrastLevel(a) {
      var b;
      r((b = this.programs)).call(b, (b) => {
        b instanceof Wb && b.setParameters({ lighteningContrastLevel: a });
      });
      this.lighteningContrastLevel = a;
    }
    setSize(a, b) {
      var d;
      r((d = this.programs)).call(d, (d) => {
        d instanceof Wb && d.setSize(a, b);
      });
    }
    release() {
      this.inputTexture = this.commonProgram = this.gl = null;
      this.programs = [];
      this.outputTextures = [];
      this.fbos = [];
    }
    initGL(a, b) {
      if (!this.gl)
        throw new m(l.WEBGL_INTERNAL_ERROR, "can not find webgl context");
      this.inputTexture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_S,
        this.gl.CLAMP_TO_EDGE
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_T,
        this.gl.CLAMP_TO_EDGE
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MIN_FILTER,
        this.gl.LINEAR
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MAG_FILTER,
        this.gl.LINEAR
      );
      for (let d = 0; 4 > d; d++) {
        let e = this.gl.createTexture();
        if (!e) throw new m(l.WEBGL_INTERNAL_ERROR, "create texture failed");
        this.gl.bindTexture(this.gl.TEXTURE_2D, e);
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_S,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_T,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MIN_FILTER,
          this.gl.LINEAR
        );
        2 > d
          ? this.gl.texImage2D(
              this.gl.TEXTURE_2D,
              0,
              this.gl.RGBA,
              a,
              b,
              0,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              null
            )
          : this.gl.texImage2D(
              this.gl.TEXTURE_2D,
              0,
              this.gl.RGBA,
              b,
              a,
              0,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              null
            );
        let f = this.gl.createFramebuffer();
        if (!f)
          throw new m(l.WEBGL_INTERNAL_ERROR, "create frame buffer failed");
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, f);
        this.gl.framebufferTexture2D(
          this.gl.FRAMEBUFFER,
          this.gl.COLOR_ATTACHMENT0,
          this.gl.TEXTURE_2D,
          e,
          0
        );
        this.outputTextures.push(e);
        this.fbos.push(f);
      }
      this.gl.viewport(0, 0, a, b);
      this.originalFrameWidth = a;
      this.originalFrameHeight = b;
    }
  }
  class aq {
    constructor() {
      this.recordedFrameCount = this.targetFrameRate = 0;
      this.recordingTime = 2;
    }
    async startRecordBeautyEffectOutput(a, b = 4) {
      if (this.recordID)
        throw new m(
          l.UNEXPECTED_ERROR,
          "another beauty effect recording is in progress"
        );
      let d = pa(6, "");
      return (
        (this.recordID = d),
        (this.targetFrameRate = a),
        (this.recordedFrameCount = 0),
        (this.recordingTime = b),
        await Db(1e3 * this.recordingTime),
        this.recordID !== d
          ? ((this.recordID = void 0), !0)
          : ((this.recordID = void 0),
            this.recordedFrameCount <
            (this.targetFrameRate * this.recordingTime) / 2
              ? (h.warning(
                  "detect beauty effect overload, current framerate",
                  this.recordedFrameCount / 2
                ),
                !1)
              : (h.debug(
                  "beauty effect current framerate",
                  this.recordedFrameCount / 2
                ),
                !0))
      );
    }
    stopRecordBeautyEffectOutput() {
      this.recordedFrameCount = this.targetFrameRate = 0;
      this.recordID = void 0;
    }
    addFrame() {
      this.recordID && (this.recordedFrameCount += 1);
    }
  }
  class bq extends Np {
    constructor() {
      super();
      this.kind = "video";
      this.fps = 15;
      this.overloadDetector = new aq();
      this.enabled = !1;
      this.stopChromeBackgroundLoop = null;
      this.lastRenderTime = 0;
      this.fps = 30;
      this.manager = new $p();
    }
    async setBeautyEffectOptions(a, b) {
      void 0 !== b.smoothnessLevel &&
        W(b.smoothnessLevel, "options.smoothnessLevel", 0, 1, !1);
      void 0 !== b.lighteningLevel &&
        W(b.lighteningLevel, "options.lighteningLevel", 0, 1, !1);
      void 0 !== b.rednessLevel &&
        W(b.rednessLevel, "options.rednessLevel", 0, 1, !1);
      void 0 !== b.lighteningContrastLevel &&
        bb(
          b.lighteningContrastLevel,
          "options.lighteningContrastLevel",
          [0, 1, 2]
        );
      void 0 !== b.smoothnessLevel &&
        this.manager.setDenoiseLevel(Math.max(0.1, 10 * b.smoothnessLevel));
      void 0 !== b.lighteningLevel &&
        this.manager.setLightLevel(Math.max(0.1, b.lighteningLevel / 2));
      void 0 !== b.rednessLevel &&
        this.manager.setRednessLevel(Math.max(0.01, b.rednessLevel));
      void 0 !== b.lighteningContrastLevel &&
        this.manager.setContrastLevel(b.lighteningContrastLevel);
      this.enabled !== a &&
        (this.manager.setEnableBeauty(a),
        (this.enabled = a),
        a ? this.input && (await this.startEffect()) : await this.stopEffect());
    }
    destroy() {
      this.onOutputChange = void 0;
      this.stopEffect();
      this.enabled = !1;
    }
    async startEffect() {
      let a = qa();
      if (!this.input)
        return void h.warning(
          "video track is null, fail to start video effect!"
        );
      if (this.output) return void h.warning("video effect is already enabled");
      let b = await this.renderWithWebGL();
      await this.updateOutput(b);
      h.info("start video effect, output:", this.output);
      this.overloadDetector
        .startRecordBeautyEffectOutput(this.fps)
        .then((a) => {
          a || (this.onOverload && this.onOverload());
        });
      let d = () => {
        requestAnimationFrame(d);
        const a = v(),
          b = 1e3 / this.fps,
          g = this.lastRenderTime ? a - this.lastRenderTime : b;
        g < b ||
          ((this.lastRenderTime = a - (g - b)),
          this.video && this.video.paused && this.video.play(),
          this.enabled &&
            this.video &&
            (this.manager.render(this.video),
            this.output &&
              this.output.requestFrame &&
              this.output.requestFrame(),
            this.overloadDetector.addFrame()));
      };
      requestAnimationFrame(d);
      a.name === ea.CHROME &&
        document.addEventListener(
          "visibilitychange",
          () => {
            document.hidden
              ? (this.stopChromeBackgroundLoop = bf(() => {
                  this.enabled && this.video && this.manager.render(this.video);
                  this.output &&
                    this.output.requestFrame &&
                    this.output.requestFrame();
                  this.overloadDetector.addFrame();
                }, this.fps))
              : this.stopChromeBackgroundLoop &&
                (this.stopChromeBackgroundLoop(),
                (this.stopChromeBackgroundLoop = null));
          },
          !1
        );
    }
    async stopEffect() {
      h.info("stop video effect");
      this.overloadDetector.stopRecordBeautyEffectOutput();
      this.manager.release();
      this.canvas && this.canvas.remove();
      this.video && this.video.remove();
      this.video = this.canvas = void 0;
      await this.updateOutput(void 0);
    }
    async _setInput(a) {
      this.enabled && !this.video && (await this.startEffect());
    }
    _removeInput() {
      this.stopEffect();
    }
    async renderWithWebGL() {
      var a;
      if (!this.input)
        throw new m(
          l.BEAUTY_PROCESSOR_INTERNAL_ERROR,
          "can not renderWithWebGL, no input"
        );
      this.canvas && (this.canvas.remove(), (this.canvas = void 0));
      this.video && (this.video.remove(), (this.video = void 0));
      this.canvas = document.createElement("canvas");
      this.video = document.createElement("video");
      this.video.setAttribute("autoplay", "");
      this.video.setAttribute("muted", "");
      this.video.muted = !0;
      this.video.setAttribute("playsinline", "");
      this.video.setAttribute("style", "display:none");
      this.video.srcObject = new MediaStream([this.input]);
      let b = new u((a) => {
          const b = () => {
            this.video && this.video.removeEventListener("playing", b);
            a();
          };
          this.video && this.video.addEventListener("playing", b);
        }),
        d = this.input.getSettings(),
        e = d.width,
        f = d.height;
      if (
        (d.frameRate &&
          this.fps !== d.frameRate &&
          ((this.fps = d.frameRate),
          h.debug("beauty video processor: set fps to", this.fps)),
        h.debug(
          n((a = "beauty video processor: width ".concat(e, " height "))).call(
            a,
            f
          )
        ),
        !e || !f)
      )
        throw new m(
          l.BEAUTY_PROCESSOR_INTERNAL_ERROR,
          "can not get track resolution"
        );
      this.canvas.width = e;
      this.canvas.height = f;
      this.video.setAttribute("width", e.toString());
      this.video.setAttribute("height", f.toString());
      this.manager.init(e, f, this.canvas);
      this.video.play();
      await b;
      return this.canvas
        .captureStream(fa.supportRequestFrame ? 0 : this.fps)
        .getVideoTracks()[0];
    }
  }
  class $a extends ye {
    constructor(a, b, d, e) {
      super(a, e);
      this.trackMediaType = "video";
      this._enabled = !0;
      $c(a)
        .then(([a, b]) => {
          this._videoHeight = b;
          this._videoWidth = a;
        })
        .catch(rg);
      this._encoderConfig = b;
      this._optimizationMode = d;
    }
    get isPlaying() {
      return !!this._player;
    }
    play(a, b = {}) {
      let d = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.LOCAL_VIDEO_TRACK_PLAY,
        options: [
          this.getTrackId(),
          "string" == typeof a ? a : "HTMLElement",
          b,
        ],
      });
      if (!(a instanceof HTMLElement)) {
        let b = document.getElementById(a.toString());
        var e;
        b
          ? (a = b)
          : (h.warning(
              n(
                (e = "[track-".concat(this.getTrackId(), '] can not find "#'))
              ).call(e, a, '" element, use document.body')
            ),
            (a = document.body));
      }
      h.debug(
        "[track-".concat(this.getTrackId(), "] start video playback"),
        z(b)
      );
      a = Qd({}, this._getDefaultPlayerConfig(), {}, b, {
        trackId: this.getTrackId(),
        element: a,
      });
      this._player
        ? this._player.updateConfig(a)
        : ((this._player = new il(a)),
          this._player.updateVideoTrack(this._mediaStreamTrack));
      this._player.play();
      d.onSuccess();
    }
    stop() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.LOCAL_VIDEO_TRACK_STOP,
        options: [this.getTrackId()],
      });
      if (!this._player) return a.onSuccess();
      this._player.destroy();
      this._player = void 0;
      h.debug("[track-".concat(this.getTrackId(), "] stop video playback"));
      a.onSuccess();
    }
    async setEnabled(a) {
      if (a !== this._enabled) {
        h.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
        var b = await this._enabledMutex.lock();
        if (!a) {
          this._originMediaStreamTrack.enabled = !1;
          try {
            await Ta(this, K.NEED_REMOVE_TRACK, this);
          } catch (d) {
            throw (
              (h.error(
                "[".concat(this.getTrackId(), "] setEnabled to false error"),
                d.toString()
              ),
              b(),
              d)
            );
          }
          return (
            (this._enabled = !1),
            h.info(
              "[".concat(this.getTrackId(), "] setEnabled to false success")
            ),
            b()
          );
        }
        this._originMediaStreamTrack.enabled = !0;
        try {
          await Ta(this, K.NEED_ADD_TRACK, this);
        } catch (d) {
          throw (
            (h.error(
              "[".concat(this.getTrackId(), "] setEnabled to true error"),
              d.toString()
            ),
            b(),
            d)
          );
        }
        h.info("[".concat(this.getTrackId(), "] setEnabled to true success"));
        this._enabled = !0;
        b();
      }
    }
    getStats() {
      cd(() => {
        h.warning(
          "[deprecated] LocalVideoTrack.getStats will be removed in the future, use AgoraRTCClient.getLocalVideoStats instead"
        );
      }, "localVideoTrackGetStatsWarning");
      return gc(this, K.GET_STATS) || Qd({}, ue);
    }
    async setBeautyEffect(a, b = {}) {
      let d = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.LOCAL_VIDEO_TRACK_BEAUTY,
        options: [this.getTrackId(), a, b],
      });
      if (a || this._videoBeautyProcessor) {
        if (qa().os === X.IOS || qa().os === X.ANDROID)
          throw (
            ((a = new m(
              l.INVALID_OPERATION,
              "can not enable beauty effect on mobile device"
            )),
            d.onError(a),
            a)
          );
        if (!this._enabled && a)
          throw (
            ((a = new m(
              l.TRACK_IS_DISABLED,
              "can not enable beauty effect when track is disabled"
            )),
            d.onError(a),
            a)
          );
        h.info(
          "[".concat(this.getTrackId(), "] start setBeautyEffect"),
          a,
          z(b)
        );
        try {
          this._videoBeautyProcessor
            ? await this._videoBeautyProcessor.setBeautyEffectOptions(a, b)
            : ((this._videoBeautyProcessor = new bq()),
              (this._videoBeautyProcessor.onOverload = () => {
                cb(() => this.emit(vd.BEAUTY_EFFECT_OVERLOAD));
              }),
              await this._videoBeautyProcessor.setBeautyEffectOptions(a, b),
              await this._registerTrackProcessor(this._videoBeautyProcessor));
        } catch (e) {
          throw (
            (h.error(
              "[".concat(this.getTrackId(), "] setBeautyEffect error"),
              e.toString()
            ),
            d.onError(e),
            e)
          );
        }
        h.info("[".concat(this.getTrackId(), "] setBeautyEffect success"));
        d.onSuccess();
      }
    }
    getCurrentFrameData() {
      return this._player
        ? this._player.getCurrentFrame()
        : new ImageData(2, 2);
    }
    async setOptimizationMode(a) {
      var b;
      if ("motion" === a || "detail" === a || "balanced" === a) {
        try {
          await Ta(this, K.SET_OPTIMIZATION_MODE, a);
        } catch (d) {
          throw (
            (h.error(
              "[".concat(this.getTrackId(), "] set optimization mode failed"),
              d.toString()
            ),
            d)
          );
        }
        this._optimizationMode = a;
        h.info(
          n(
            (b = "[".concat(
              this.getTrackId(),
              "] set optimization mode success ("
            ))
          ).call(b, a, ")")
        );
      } else h.error(l.INVALID_PARAMS, "optimization mode must be motion, detail or balanced");
    }
    _updatePlayerSource() {
      this._player && this._player.updateVideoTrack(this._mediaStreamTrack);
    }
    _getDefaultPlayerConfig() {
      return { fit: "contain" };
    }
  }
  class ml extends $a {
    constructor(a, b, d, e, f) {
      super(a, b.encoderConfig ? vc(b.encoderConfig) : {}, e, f);
      this._enabled = !0;
      this._deviceName = "default";
      this._config = b;
      this._constraints = d;
      this._deviceName = a.label;
      this._config.encoderConfig &&
        (this._encoderConfig = vc(this._config.encoderConfig));
    }
    async setDevice(a) {
      var b;
      let d = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.CAM_VIDEO_TRACK_SET_DEVICE,
        options: [this.getTrackId(), a],
      });
      if (
        (h.info(
          n((b = "[track-".concat(this.getTrackId(), "] set device to "))).call(
            b,
            a
          )
        ),
        this._enabled)
      )
        try {
          let d = await gb.getDeviceById(a);
          b = {};
          b.video = Qd({}, this._constraints);
          b.video.deviceId = { exact: a };
          b.video.facingMode = void 0;
          this._originMediaStreamTrack.stop();
          let f = null;
          try {
            f = await Eb(b, this.getTrackId());
          } catch (g) {
            throw (
              (h.error(
                "[".concat(this.getTrackId(), "] setDevice failed"),
                g.toString()
              ),
              (f = await Eb({ video: this._constraints }, this.getTrackId())),
              await this._updateOriginMediaStreamTrack(
                f.getVideoTracks()[0],
                !1
              ),
              g)
            );
          }
          await this._updateOriginMediaStreamTrack(f.getVideoTracks()[0], !1);
          $c(this._originMediaStreamTrack).then(([a, b]) => {
            this._videoHeight = b;
            this._videoWidth = a;
          });
          this._deviceName = d.label;
          this._config.cameraId = a;
          this._constraints.deviceId = { exact: a };
        } catch (e) {
          throw (
            (d.onError(e),
            h.error(
              "[".concat(this.getTrackId(), "] setDevice error"),
              e.toString()
            ),
            e)
          );
        }
      else
        try {
          (this._deviceName = (await gb.getDeviceById(a)).label),
            (this._config.cameraId = a),
            (this._constraints.deviceId = { exact: a });
        } catch (e) {
          throw (
            (d.onError(e),
            h.error(
              "[track-".concat(this.getTrackId(), "] setDevice error"),
              e.toString()
            ),
            e)
          );
        }
      h.info("[".concat(this.getTrackId(), "] setDevice success"));
      d.onSuccess();
    }
    async setEnabled(a) {
      if (a !== this._enabled) {
        h.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
        var b = await this._enabledMutex.lock();
        if (!a) {
          this._originMediaStreamTrack.onended = null;
          this._originMediaStreamTrack.stop();
          this._enabled = !1;
          try {
            await Ta(this, K.NEED_REMOVE_TRACK, this);
          } catch (e) {
            throw (
              (h.error(
                "[".concat(this.getTrackId(), "] setEnabled to false error"),
                e.toString()
              ),
              b(),
              e)
            );
          }
          return (
            h.info(
              "[".concat(this.getTrackId(), "] setEnabled to false success")
            ),
            b()
          );
        }
        a = Qd({}, this._constraints);
        var d = gb.searchDeviceIdByName(this._deviceName);
        d && !a.deviceId && (a.deviceId = { exact: d });
        try {
          let a = await Eb({ video: this._constraints }, this.getTrackId());
          await this._updateOriginMediaStreamTrack(a.getVideoTracks()[0], !1);
          await Ta(this, K.NEED_ADD_TRACK, this);
        } catch (e) {
          throw (
            (h.error(
              "[".concat(this.getTrackId(), "] setEnabled true error"),
              e.toString()
            ),
            b(),
            e)
          );
        }
        $c(this._originMediaStreamTrack).then(([a, b]) => {
          this._videoHeight = b;
          this._videoWidth = a;
        });
        h.info("[".concat(this.getTrackId(), "] setEnabled to true success"));
        this._enabled = !0;
        b();
      }
    }
    async setEncoderConfiguration(a) {
      let b = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.CAM_VIDEO_TRACK_SET_ENCODER_CONFIG,
        options: [this.getTrackId(), a],
      });
      if (!this._enabled)
        throw (
          ((a = new m(
            l.TRACK_IS_DISABLED,
            "can not set encoder configuration when track is disabled"
          )),
          b.onError(a),
          a)
        );
      a = vc(a);
      let d = JSON.parse(z(this._config));
      d.encoderConfig = a;
      let e = kf(d);
      h.debug(
        "[".concat(
          this.getTrackId(),
          "] setEncoderConfiguration applyConstraints"
        ),
        z(a),
        z(e)
      );
      try {
        await this._originMediaStreamTrack.applyConstraints(e),
          $c(this._originMediaStreamTrack).then(([a, b]) => {
            this._videoHeight = b;
            this._videoWidth = a;
          });
      } catch (f) {
        throw (
          ((a = new m(l.UNEXPECTED_ERROR, f.toString())),
          h.error(
            "[track-".concat(this.getTrackId(), "] applyConstraints error"),
            a.toString()
          ),
          b.onError(a),
          a)
        );
      }
      this._config = d;
      this._constraints = e;
      this._encoderConfig = a;
      try {
        await Ta(this, K.NEED_RENEGOTIATE);
      } catch (f) {
        return b.onError(f), f.throw();
      }
      b.onSuccess();
    }
    _getDefaultPlayerConfig() {
      return { mirror: !0, fit: "cover" };
    }
  }
  class nl extends hl {
    constructor(a, b, d, e) {
      super(b, b.stringUid || b.uid);
      this.type = "pub";
      this.detecting = !1;
      this.renegotiateWithGateway = async () => (
        h.debug("[pc-".concat(this.pc.ID, "] renegotiate start")),
        new u(async (a, b) => {
          this.connectionState = "connecting";
          let d = (e) => {
            "connected" === e && (this.off(G.CONNECTION_STATE_CHANGE, d), a());
            "disconnected" === e &&
              (this.off(G.CONNECTION_STATE_CHANGE, d),
              b(new m(l.OPERATION_ABORTED, "renegotiate abort")));
          };
          this.on(G.CONNECTION_STATE_CHANGE, d);
          var e = await this.pc.createOfferSDP();
          this.audioTrack &&
            this.audioTrack._encoderConfig &&
            (e = lf(e, this.audioTrack._encoderConfig));
          await this.pc.setOfferSDP(e);
          let f = await Ma(this, G.NEED_RENEGOTIATE, e);
          e = um(e, this.updateAnswerSDP(f.sdp));
          await this.pc.setAnswerSDP(e);
          h.debug("[pc-".concat(this.pc.ID, "] renegotiate success"));
          this.connectionState = "connected";
        })
      );
      this.handleStreamRenegotiate = (a, b) => {
        "connected" === this.connectionState
          ? this.renegotiateWithGateway().then(a).catch(b)
          : a();
      };
      this.handleReplaceTrack = (a, b, d) => {
        if (this.audioTrack instanceof Sc && "audio" === a.kind)
          return u.resolve();
        this.pc
          .replaceTrack(a)
          .then((a) => (a ? this.renegotiateWithGateway() : u.resolve()))
          .then(b)
          .catch(d);
      };
      this.handleCloseAudioTrack = (a) => {};
      this.handleCloseVideoTrack = () => {
        this.lowStreamConnection &&
          this.lowStreamConnection.videoTrack &&
          this.lowStreamConnection.videoTrack.close();
      };
      this.handleGetSessionID = (a) => {
        a(this.joinInfo.sid);
      };
      this.handleGetLocalVideoStats = (a) => {
        a(this.statsCollector.getLocalVideoTrackStats(this.connectionId));
      };
      this.handleGetLocalAudioStats = (a) => {
        a(this.statsCollector.getLocalAudioTrackStats(this.connectionId));
      };
      this.handleSetOptimizationMode = (a, b, d) => {
        this.pc
          .setRtpSenderParameters(
            {},
            "detail" === a
              ? "maintain-resolution"
              : "motion" === a
              ? "maintain-framerate"
              : a
          )
          .then(b)
          .catch(d);
      };
      this.isLowStreamConnection = !!e;
      this.codec = d;
      this.statsCollector = a;
      this.statsCollector.addLocalConnection(this);
    }
    getAllTracks() {
      let a = [];
      return (
        this.videoTrack && a.push(this.videoTrack),
        this.audioTrack && this.audioTrack instanceof Sc
          ? (a = n(a).call(a, this.audioTrack.trackList))
          : this.audioTrack && a.push(this.audioTrack),
        a
      );
    }
    async addTracks(a) {
      let b = fa;
      if ("connecting" === this.connectionState)
        try {
          return (
            await this.createWaitConnectionConnectedPromise(),
            await this.addTracks(a)
          );
        } catch (g) {
          throw new m(l.OPERATION_ABORTED, "publish abort");
        }
      var d = !1;
      let e = this.getAllTracks();
      a = Lh((a = O(a).call(a, (a) => -1 === E(e).call(e, a))));
      for (let e = 0; e < a.length; e += 1) {
        var f = a[e];
        if (!(f instanceof ye)) return new m(l.INVALID_LOCAL_TRACK).throw();
        if (f instanceof $a && this.disabledVideoTrack) {
          if (this.disabledVideoTrack !== f)
            return new m(l.EXIST_DISABLED_VIDEO_TRACK).throw();
          this.disabledVideoTrack = void 0;
        }
        if (f instanceof $a && this.videoTrack)
          return new m(l.CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS).throw();
        if (f instanceof Za && this.audioTrack)
          if (this.audioTrack instanceof Sc) this.audioTrack.addAudioTrack(f);
          else {
            if (!b.webAudioMediaStreamDest)
              throw new m(
                l.NOT_SUPPORTED,
                "your browser is not support audio mixing"
              );
            d = new Sc();
            d.addAudioTrack(this.audioTrack);
            d.addAudioTrack(f);
            d = await this.addTrackWithPC(d);
          }
        else
          f instanceof $a && this.isLowStreamConnection
            ? ((d = this.lowStreamParameter || {
                width: 160,
                height: 120,
                framerate: 15,
                bitrate: 50,
              }),
              (f = vm(f, d)),
              (f = new $a(f, { bitrateMax: d.bitrate, bitrateMin: d.bitrate })),
              f._hints.push(nb.LOW_STREAM),
              (d = await this.addTrackWithPC(f)))
            : ((this.detecting = !0),
              Ec(() => {
                this.detecting = !1;
              }, 8e3),
              (d = await this.addTrackWithPC(f)));
      }
      d && (await this.renegotiateWithGateway());
      r(a).call(a, (a) => this.bindTrackEvents(a));
    }
    async removeTracks(a, b) {
      let d = this.getAllTracks();
      a = Lh(
        (a = O(a).call(
          a,
          (a) => -1 !== E(d).call(d, a) || a === this.disabledVideoTrack
        ))
      );
      let e = [];
      for (let d = 0; d < a.length; d += 1) {
        let f = a[d];
        if (
          (this.unbindTrackEvents(f),
          this.audioTrack instanceof Sc && f instanceof Za)
        )
          this.audioTrack.removeAudioTrack(f),
            0 === this.audioTrack.trackList.length &&
              (e.push(this.audioTrack), (this.audioTrack = void 0));
        else if (f instanceof Za) e.push(f), (this.audioTrack = void 0);
        else if (f instanceof $a) {
          if (b) {
            if (this.disabledVideoTrack === f)
              return void (this.disabledVideoTrack = void 0);
          } else this.disabledVideoTrack = this.videoTrack;
          e.push(f);
          this.isLowStreamConnection && f.close();
          this.videoTrack = void 0;
        }
      }
      if (this.videoTrack || this.audioTrack) {
        if (0 !== e.length) {
          if ("connecting" === this.connectionState)
            try {
              await this.createWaitConnectionConnectedPromise();
            } catch (g) {
              return;
            }
          for (let a of e) {
            var f;
            h.debug(
              n((f = "[".concat(this.connectionId, "] remove "))).call(
                f,
                a.trackMediaType,
                " from pc"
              )
            );
            await this.pc.removeTrack(a._mediaStreamTrack);
          }
          await this.renegotiateWithGateway();
        }
      } else await this.closeP2PConnection();
    }
    startP2PConnection() {
      return new u(async (a, b) => {
        if (!this.audioTrack && !this.videoTrack)
          return b(new m(l.UNEXPECTED_ERROR, "no track to publish"));
        let d = (e) => {
          var f;
          "connected" === e &&
            (t.publish(this.joinInfo.sid, {
              lts: this.startTime,
              succ: !0,
              ec: null,
              audioName: this.audioTrack && this.audioTrack.getTrackLabel(),
              videoName: this.videoTrack && this.videoTrack.getTrackLabel(),
              screenshare: !(
                !this.videoTrack ||
                -1 === E((f = this.videoTrack._hints)).call(f, nb.SCREEN_TRACK)
              ),
              audio: !!this.audioTrack,
              video: !!this.videoTrack,
              p2pid: this.pc.ID,
              publishRequestid: this.ID,
            }),
            this.off(G.CONNECTION_STATE_CHANGE, d),
            a());
          if ("disconnected" === e) {
            if (
              (this.off(G.CONNECTION_STATE_CHANGE, d), this.disconnectedReason)
            )
              return b(this.disconnectedReason);
            b(new m(l.OPERATION_ABORTED, "publish abort"));
          }
        };
        this.on(G.CONNECTION_STATE_CHANGE, d);
        this.disconnectedReason = void 0;
        this.connectionState = "connecting";
        this.startTime = v();
        try {
          !this.pc.videoTrack &&
            this.videoTrack &&
            (await this.pc.addTrack(this.videoTrack._mediaStreamTrack));
          !this.pc.audioTrack &&
            this.audioTrack &&
            (await this.pc.addTrack(this.audioTrack._mediaStreamTrack));
          let a = await this.pc.createOfferSDP();
          this.audioTrack &&
            this.audioTrack._encoderConfig &&
            (a = lf(a, this.audioTrack._encoderConfig));
          await this.pc.setOfferSDP(a);
          h.debug(
            "[".concat(this.connectionId, "] create and set offer success")
          );
          let b = await Ma(this, G.NEED_ANSWER, {
              messageType: "OFFER",
              sdp: a,
              offererSessionId: 104,
              retry: !0,
            }),
            d = this.updateAnswerSDP(b.sdp);
          await this.pc.setAnswerSDP(d);
          h.debug("[".concat(this.connectionId, "] set answer success"));
          await this.icePromise;
          this.connectionState = "connected";
          this.startUploadStats();
        } catch (f) {
          var e;
          this.off(G.CONNECTION_STATE_CHANGE, d);
          this.connectionState = "disconnected";
          t.publish(this.joinInfo.sid, {
            lts: this.startTime,
            succ: !1,
            ec: f.code,
            audioName: this.audioTrack && this.audioTrack.getTrackLabel(),
            videoName: this.videoTrack && this.videoTrack.getTrackLabel(),
            screenshare: !(
              !this.videoTrack ||
              -1 === E((e = this.videoTrack._hints)).call(e, nb.SCREEN_TRACK)
            ),
            audio: !!this.audioTrack,
            video: !!this.videoTrack,
            p2pid: this.pc.ID,
            publishRequestid: this.ID,
          });
          h.error(
            "[".concat(this.connectionId, "] connection error"),
            f.toString()
          );
          b(f);
        }
      });
    }
    async closeP2PConnection(a) {
      let b = this.getAllTracks();
      var d;
      (r(b).call(b, (a) => {
        this.unbindTrackEvents(a);
      }),
      this.isLowStreamConnection && this.videoTrack && this.videoTrack.close(),
      (this.videoTrack = void 0),
      this.audioTrack instanceof Sc) &&
        r((d = this.audioTrack.trackList)).call(d, (a) => {
          this.audioTrack.removeAudioTrack(a);
        });
      this.audioTrack = void 0;
      this.stopUploadStats();
      this.statsCollector.removeConnection(this.connectionId);
      await this.closePC(a);
      this.connectionState = "disconnected";
      this.removeAllListeners();
    }
    getNetworkQuality() {
      var a,
        b = this.pc.getStats();
      if (!b.videoSend[0] && !b.audioSend[0]) return 1;
      var d = gc(this, G.NEED_SIGNAL_RTT),
        e = b.videoSend[0] ? b.videoSend[0].rttMs : void 0;
      let f = b.audioSend[0] ? b.audioSend[0].rttMs : void 0;
      e = e && f ? (e + f) / 2 : e || f;
      d =
        (70 * b.sendPacketLossRate) / 50 +
        (0.3 * ((e && d ? (e + d) / 2 : e || d) || 0)) / 1500;
      d = 0.17 > d ? 1 : 0.36 > d ? 2 : 0.59 > d ? 3 : 0.1 > d ? 4 : 5;
      return this.videoTrack &&
        this.videoTrack._encoderConfig &&
        -1 === E((a = this.videoTrack._hints)).call(a, nb.SCREEN_TRACK) &&
        ((a = this.videoTrack._encoderConfig.bitrateMax),
        (b = b.bitrate.actualEncoded),
        a && b)
        ? ((b = (1e3 * a - b) / (1e3 * a)),
          Io[0.15 > b ? 0 : 0.3 > b ? 1 : 0.45 > b ? 2 : 0.6 > b ? 3 : 4][d])
        : d;
    }
    uploadStats(a, b) {
      let d = this.audioTrack ? Il(a, this.audioTrack) : void 0,
        e = this.videoTrack ? Hl(a, this.videoTrack) : void 0,
        f = Ih(a, b),
        g = Gl(a);
      d && cb(() => this.emit(G.NEED_UPLOAD, wb.PUBLISH_STATS, d));
      e &&
        cb(() => this.emit(G.NEED_UPLOAD, wb.PUBLISH_STATS, wm({}, e, {}, f)));
      g && cb(() => this.emit(G.NEED_UPLOAD, wb.PUBLISH_STATS, g));
    }
    uploadSlowStats(a) {
      let b = Ih(a);
      b && cb(() => this.emit(G.NEED_UPLOAD, wb.PUBLISH_STATS, b));
    }
    uploadRelatedStats(a) {
      let b = Ll(a);
      b &&
        cb(() => {
          this.emit(G.NEED_UPLOAD, wb.PUBLISH_RELATED_STATS, b);
        });
    }
    bindTrackEvents(a) {
      this.isLowStreamConnection ||
        (a instanceof Za
          ? (a.addListener(K.GET_STATS, this.handleGetLocalAudioStats),
            a.addListener(K.NEED_CLOSE, this.handleCloseAudioTrack))
          : a instanceof $a &&
            (a.addListener(K.GET_STATS, this.handleGetLocalVideoStats),
            a.addListener(K.NEED_CLOSE, this.handleCloseVideoTrack),
            a.addListener(
              K.SET_OPTIMIZATION_MODE,
              this.handleSetOptimizationMode
            )),
        a.addListener(K.NEED_RENEGOTIATE, this.handleStreamRenegotiate),
        a.addListener(K.NEED_REPLACE_TRACK, this.handleReplaceTrack),
        a.addListener(K.NEED_SESSION_ID, this.handleGetSessionID));
    }
    unbindTrackEvents(a) {
      this.isLowStreamConnection ||
        (a instanceof Za
          ? (a.off(K.GET_STATS, this.handleGetLocalAudioStats),
            a.off(K.NEED_CLOSE, this.handleCloseAudioTrack))
          : a instanceof $a &&
            (a.off(K.GET_STATS, this.handleGetLocalVideoStats),
            a.off(K.NEED_CLOSE, this.handleCloseVideoTrack)),
        a.off(K.NEED_RENEGOTIATE, this.handleStreamRenegotiate),
        a.off(K.NEED_REPLACE_TRACK, this.handleReplaceTrack),
        a.off(K.NEED_SESSION_ID, this.handleGetSessionID));
    }
    async addTrackWithPC(a) {
      if ("connecting" === this.connectionState)
        return new m(
          l.INVALID_OPERATION,
          "last publish operation has not finished"
        ).throw();
      var b = this.videoTrack;
      let d = !1;
      this.audioTrack && a instanceof Za
        ? ((this.audioTrack = a),
          h.debug("[".concat(this.connectionId, "] replace pc audio track")),
          (d = await this.pc.replaceTrack(a._mediaStreamTrack)))
        : this.videoTrack && a instanceof $a
        ? ((this.videoTrack = a),
          h.debug("[".concat(this.connectionId, "] replace pc video track")),
          (d = await this.pc.replaceTrack(a._mediaStreamTrack)))
        : a instanceof Za
        ? ((this.audioTrack = a),
          h.debug("[".concat(this.connectionId, "] add audio track to pc")),
          await this.pc.addTrack(a._mediaStreamTrack),
          (d = !0))
        : a instanceof $a &&
          ((this.videoTrack = a),
          h.debug("[".concat(this.connectionId, "] add video track to pc")),
          await this.pc.addTrack(a._mediaStreamTrack),
          (d = !0));
      a = fa;
      this.videoTrack !== b &&
        this.videoTrack &&
        a.supportSetRtpSenderParameters &&
        ((b = {}),
        (a = "balanced"),
        this.videoTrack._encoderConfig &&
          (b.maxBitrate = this.videoTrack._encoderConfig.bitrateMax
            ? 1e3 * this.videoTrack._encoderConfig.bitrateMax
            : void 0),
        "motion" === this.videoTrack._optimizationMode
          ? (a = "maintain-framerate")
          : "detail" === this.videoTrack._optimizationMode &&
            (a = "maintain-resolution"),
        h.debug("[".concat(this.connectionId, "] set pc rtp sender"), b, a),
        await this.pc.setRtpSenderParameters(b, a));
      return "disconnected" !== this.connectionState && d;
    }
    updateAnswerSDP(a) {
      var b, d;
      a = a.replace(/a=x-google-flag:conference\r\n/g, "");
      this.videoTrack &&
        E((b = this.videoTrack._hints)).call(b, nb.SCREEN_TRACK);
      if (
        this.videoTrack &&
        this.videoTrack._encoderConfig &&
        -1 === E((d = this.videoTrack._hints)).call(d, nb.SCREEN_TRACK)
      ) {
        {
          b = this.codec;
          var e = this.videoTrack._encoderConfig,
            f = fa;
          d = e.bitrateMin;
          e = e.bitrateMax;
          let q = a.match(/m=video.*\r\n/) || a.match(/m=video.*\n/);
          if (q && 0 < q.length && f.supportMinBitrate && d) {
            f = null;
            var g, k;
            if (
              ("h264" === b
                ? (f =
                    a.match(/a=rtpmap:(\d+) H264\/90000\r\n/) ||
                    a.match(/a=rtpmap:(\d+) H264\/90000\n/))
                : "vp8" === b &&
                  (f =
                    a.match(/a=rtpmap:(\d+) VP8\/90000\r\n/) ||
                    a.match(/a=rtpmap:(\d+) VP8\/90000\n/)),
              f && f[1])
            )
              a = a.replace(
                q[0],
                n(
                  (g = n((k = "".concat(q[0], "a=fmtp:"))).call(
                    k,
                    f[1],
                    " x-google-min-bitrate="
                  ))
                ).call(g, d, "\r\n")
              );
          }
          if (q && 0 < q.length && e) {
            var h, l;
            g = "AS";
            qa().name === ea.FIREFOX && ((e = 1e3 * (e >>> 0)), (g = "TIAS"));
            a = a.replace(
              q[0],
              n((h = n((l = "".concat(q[0], "b="))).call(l, g, ":"))).call(
                h,
                e,
                "\r\n"
              )
            );
          }
        }
      }
      this.audioTrack &&
        this.audioTrack._encoderConfig &&
        (a = lf(a, this.audioTrack._encoderConfig));
      h = a;
      l = qa();
      return (h =
        l.name !== ea.SAFARI && l.os !== X.IOS
          ? h
          : h.replace(/a=.*video-orientation\r\n/g, ""));
    }
    createPC() {
      this.pc = new el({ turnServer: this.joinInfo.turnServer });
      this.updateICEPromise();
    }
    async closePC(a) {
      return (
        (this.pc.onICEConnectionStateChange = void 0),
        this.pc.close(),
        !a && (await Ma(this, G.NEED_UNPUB))
      );
    }
    onPCDisconnected(a) {
      var b;
      t.publish(this.joinInfo.sid, {
        lts: this.startTime,
        succ: !1,
        ec: a.code,
        audioName: this.audioTrack && this.audioTrack.getTrackLabel(),
        videoName: this.videoTrack && this.videoTrack.getTrackLabel(),
        screenshare: !(
          !this.videoTrack ||
          -1 === E((b = this.videoTrack._hints)).call(b, nb.SCREEN_TRACK)
        ),
        audio: !!this.audioTrack,
        video: !!this.videoTrack,
        p2pid: this.pc.ID,
        publishRequestid: this.ID,
      });
    }
  }
  class ol extends Vk {
    constructor(a, b, d) {
      super(a);
      this._isDestroyed = !1;
      this._userId = b;
      this._uintId = d;
    }
    getUserId() {
      return this._userId;
    }
    _updateOriginMediaStreamTrack(a) {
      this._mediaStreamTrack = this._originMediaStreamTrack = a;
      this._updatePlayerSource();
    }
    _destroy() {
      this._isDestroyed = !0;
      h.info("[track-".concat(this.getTrackId(), "] is destroyed"));
      this.stop();
    }
  }
  class zd extends ol {
    constructor(a, b, d) {
      super(a, b, d);
      this.trackMediaType = "video";
      $c(a)
        .then(([a, b]) => {
          this._videoHeight = b;
          this._videoWidth = a;
        })
        .catch(rg);
    }
    get isPlaying() {
      return !!this._player;
    }
    getStats() {
      cd(() => {
        h.warning(
          "[deprecated] RemoteVideoTrack.getStats will be removed in the future, use AgoraRTCClient.getRemoteVideoStats instead"
        );
      }, "remoteVideoTrackGetStatsWarning");
      return gc(this, K.GET_STATS) || mf({}, hg);
    }
    play(a, b = {}) {
      let d = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.REMOTE_VIDEO_TRACK_PLAY,
        options: [
          this.getTrackId(),
          "string" == typeof a ? a : "HTMLElement",
          b,
        ],
      });
      if ("string" == typeof a) {
        let b = document.getElementById(a);
        var e;
        b
          ? (a = b)
          : (h.warning(
              n(
                (e = "[track-".concat(this.getTrackId(), '] can not find "#'))
              ).call(e, a, '" element, use document.body')
            ),
            (a = document.body));
      }
      h.debug(
        "[track-".concat(this.getTrackId(), "] start video playback"),
        z(b)
      );
      a = mf({ fit: "cover" }, b, { trackId: this.getTrackId(), element: a });
      this._player
        ? this._player.updateConfig(a)
        : ((this._player = new il(a)),
          this._player.updateVideoTrack(this._mediaStreamTrack),
          (this._player.onFirstVideoFrameDecoded = () => {
            this.emit(ve.FIRST_FRAME_DECODED);
          }));
      this._player.play();
      d.onSuccess();
    }
    stop() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.REMOTE_VIDEO_TRACK_STOP,
        options: [this.getTrackId()],
      });
      if (!this._player) return a.onSuccess();
      this._player.destroy();
      this._player = void 0;
      h.debug("[track-".concat(this.getTrackId(), "] stop video playback"));
      a.onSuccess();
    }
    getCurrentFrameData() {
      return this._player
        ? this._player.getCurrentFrame()
        : new ImageData(2, 2);
    }
    _updatePlayerSource() {
      h.debug(
        "[track-".concat(this.getTrackId(), "] update player source track")
      );
      this._player && this._player.updateVideoTrack(this._mediaStreamTrack);
    }
  }
  class Ad extends ol {
    constructor(a, b, d) {
      super(a, b, d);
      this.trackMediaType = "audio";
      this._useAudioElement = !1;
      this._source = new Xk(a, !0);
      this._source.once(lb.RECEIVE_TRACK_BUFFER, () => {
        this.emit(ve.FIRST_FRAME_DECODED);
      });
      fa.webAudioWithAEC || (this._useAudioElement = !0);
    }
    get isPlaying() {
      return this._useAudioElement
        ? ob.isPlaying(this.getTrackId())
        : this._source.isPlayed;
    }
    setAudioFrameCallback(a, b = 4096) {
      if (!a)
        return (
          this._source.removeAllListeners(lb.ON_AUDIO_BUFFER),
          void this._source.stopGetAudioBuffer()
        );
      this._source.startGetAudioBuffer(b);
      this._source.removeAllListeners(lb.ON_AUDIO_BUFFER);
      this._source.on(lb.ON_AUDIO_BUFFER, (b) => a(b));
    }
    setVolume(a) {
      let b = t.reportApiInvoke(
        null,
        {
          tag: D.TRACER,
          name: y.REMOTE_AUDIO_SET_VOLUME,
          options: [this.getTrackId(), a],
        },
        300
      );
      this._useAudioElement
        ? ob.setVolume(this.getTrackId(), a)
        : this._source.setVolume(a / 100);
      b.onSuccess();
    }
    async setPlaybackDevice(a) {
      let b = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.REMOTE_AUDIO_SET_OUTPUT_DEVICE,
        options: [this.getTrackId(), a],
      });
      if (!this._useAudioElement)
        throw new m(
          l.NOT_SUPPORTED,
          "your browser does not support setting the audio output device"
        );
      try {
        await ob.setSinkID(this.getTrackId(), a);
      } catch (d) {
        throw (b.onError(d), d);
      }
      b.onSuccess();
    }
    getVolumeLevel() {
      return this._source.getAudioLevel();
    }
    getStats() {
      cd(() => {
        h.warning(
          "[deprecated] RemoteAudioTrack.getStats will be removed in the future, use AgoraRTCClient.getRemoteAudioStats instead"
        );
      }, "remoteAudioTrackGetStatsWarning");
      return gc(this, K.GET_STATS) || mf({}, gg);
    }
    play() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.REMOTE_AUDIO_TRACK_PLAY,
        options: [this.getTrackId()],
      });
      h.debug("[".concat(this.getTrackId(), "] start audio playback"));
      this._useAudioElement
        ? (h.debug(
            "[track-".concat(this.getTrackId(), "] use audio element to play")
          ),
          ob.play(this._mediaStreamTrack, this.getTrackId()))
        : this._source.play();
      a.onSuccess();
    }
    stop() {
      let a = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.REMOTE_AUDIO_TRACK_STOP,
        options: [this.getTrackId()],
      });
      h.debug("[".concat(this.getTrackId(), "] stop audio playback"));
      this._useAudioElement ? ob.stop(this.getTrackId()) : this._source.stop();
      a.onSuccess();
    }
    _destroy() {
      super._destroy();
      this._source.destroy();
    }
    _isFreeze() {
      return this._source.isFreeze;
    }
    _updatePlayerSource() {
      h.debug(
        "[track-".concat(this.getTrackId(), "] update player source track")
      );
      this._source.updateTrack(this._mediaStreamTrack);
      this._useAudioElement &&
        ob.updateTrack(this.getTrackId(), this._mediaStreamTrack);
    }
  }
  class cq extends hl {
    constructor(a, b, d, e) {
      super(d, a.uid);
      this.type = "sub";
      this.unusedTracks = [];
      this.onTrack = (a) => {
        var b, d;
        if (
          ("audio" === a.kind && !this.subscribeOptions.audio) ||
          ("video" === a.kind && !this.subscribeOptions.video)
        )
          return (
            this.unusedTracks.push(a),
            void h.debug(
              n(
                (d = "[".concat(
                  this.connectionId,
                  "] unused ontrack event, kind: "
                ))
              ).call(d, a.kind)
            )
          );
        h.debug(
          n(
            (b = "[".concat(
              this.connectionId,
              "] emit pc ontrack after subscribe "
            ))
          ).call(b, a.kind),
          a
        );
        b = "audio" === a.kind ? this.user._audioTrack : this.user._videoTrack;
        var e, f;
        b
          ? b._updateOriginMediaStreamTrack(a)
          : "audio" === a.kind
          ? ((this.user._audioTrack = new Ad(
              a,
              this.getUserId(),
              this.user._uintid
            )),
            h.info(
              n(
                (e = "[".concat(
                  this.connectionId,
                  "] create remote audio track: "
                ))
              ).call(e, this.user._audioTrack.getTrackId())
            ),
            this.bindTrackEvents(this.user._audioTrack))
          : ((this.user._videoTrack = new zd(
              a,
              this.getUserId(),
              this.user._uintid
            )),
            h.info(
              n(
                (f = "[".concat(
                  this.connectionId,
                  "] create remote video track: "
                ))
              ).call(f, this.user._videoTrack.getTrackId())
            ),
            this.bindTrackEvents(this.user._videoTrack));
      };
      this.handleGetRemoteAudioStats = (a) => {
        a(this.statsCollector.getRemoteAudioTrackStats(this.connectionId));
      };
      this.handleGetRemoteVideoStats = (a) => {
        a(this.statsCollector.getRemoteVideoTrackStats(this.connectionId));
      };
      this.handleGetSessionID = (a) => {
        a(this.joinInfo.sid);
      };
      this.user = a;
      this.statsCollector = b;
      this.statsCollector.addRemoteConnection(this);
      this.subscribeOptions = e;
    }
    async startP2PConnection() {
      return new u(async (a, b) => {
        let d = (e) => {
          if (
            ("connected" === e &&
              (t.subscribe(this.joinInfo.sid, {
                lts: this.startTime,
                succ: !0,
                video: this.subscribeOptions.video,
                audio: this.subscribeOptions.audio,
                peerid: this.user.uid,
                ec: null,
                subscribeRequestid: this.ID,
                p2pid: this.pc.ID,
              }),
              this.off(G.CONNECTION_STATE_CHANGE, d),
              a()),
            "disconnected" === e)
          ) {
            if (
              (this.off(G.CONNECTION_STATE_CHANGE, d), this.disconnectedReason)
            )
              return b(this.disconnectedReason);
            b(new m(l.OPERATION_ABORTED, "subscribe abort"));
          }
        };
        if (
          (this.on(G.CONNECTION_STATE_CHANGE, d),
          (this.disconnectedReason = void 0),
          (this.connectionState = "connecting"),
          (this.startTime = v()),
          !this.subscribeOptions)
        )
          return void b(new m(l.UNEXPECTED_ERROR, "no subscribe options"));
        let e = new MediaStream(),
          f = new u((a) => {
            this.pc.onTrack = (b, d) => {
              var f, g;
              if (
                ("audio" === b.kind && !this.subscribeOptions.audio) ||
                ("video" === b.kind && !this.subscribeOptions.video)
              )
                return (
                  this.unusedTracks.push(b),
                  void h.debug(
                    n(
                      (g = "[".concat(
                        this.connectionId,
                        "] unused ontrack event "
                      ))
                    ).call(g, b.kind)
                  )
                );
              e.addTrack(b);
              g = {
                audio: 0 < e.getAudioTracks().length,
                video: 0 < e.getVideoTracks().length,
              };
              h.debug(
                n(
                  (f = "[".concat(this.connectionId, "] subscribe ontrack: "))
                ).call(f, b.kind),
                d,
                b
              );
              a: {
                b = this.subscribeOptions;
                var k, l;
                d = sd((k = S(g))).call(k);
                k = sd((l = S(b))).call(l);
                for (l = 0; l < d.length; l += 1) {
                  if (d[l] !== k[l]) {
                    g = !1;
                    break a;
                  }
                  if (g[d[l]] !== b[d[l]]) {
                    g = !1;
                    break a;
                  }
                }
                g = !0;
              }
              g &&
                ((this.pc.onTrack = this.onTrack),
                h.debug(
                  "[".concat(this.connectionId, "] get all subscribed tracks")
                ),
                a(e));
            };
          });
        try {
          let a = ki(await this.pc.createOfferSDP());
          await this.pc.setOfferSDP(a);
          h.debug(
            "[".concat(this.connectionId, "] create and set offer success")
          );
          let b = await Ma(this, G.NEED_ANSWER, {
            messageType: "OFFER",
            sdp: a,
            offererSessionId: 104,
            retry: !0,
          });
          await this.pc.setAnswerSDP(ki(b.sdp));
          h.debug("[".concat(this.connectionId, "] set answer success"));
          let d = await u.all([f, this.icePromise]),
            e = d[0].getAudioTracks()[0],
            l = d[0].getVideoTracks()[0];
          var g, k;
          e &&
            (this.user._audioTrack
              ? this.user._audioTrack._updateOriginMediaStreamTrack(e)
              : ((this.user._audioTrack = new Ad(
                  e,
                  this.getUserId(),
                  this.user._uintid
                )),
                h.info(
                  n(
                    (g = "[".concat(
                      this.connectionId,
                      "] create remote audio track: "
                    ))
                  ).call(g, this.user._audioTrack.getTrackId())
                ),
                this.bindTrackEvents(this.user._audioTrack)));
          l &&
            (this.user._videoTrack
              ? this.user._videoTrack._updateOriginMediaStreamTrack(l)
              : ((this.user._videoTrack = new zd(
                  l,
                  this.getUserId(),
                  this.user._uintid
                )),
                h.info(
                  n(
                    (k = "[".concat(
                      this.connectionId,
                      "] create remote video track: "
                    ))
                  ).call(k, this.user._videoTrack.getTrackId())
                ),
                this.bindTrackEvents(this.user._videoTrack)));
          this.connectionState = "connected";
          this.startUploadStats();
        } catch (q) {
          this.off(G.CONNECTION_STATE_CHANGE, d),
            (this.connectionState = "disconnected"),
            t.subscribe(this.joinInfo.sid, {
              lts: this.startTime,
              succ: !1,
              video: this.subscribeOptions.video,
              audio: this.subscribeOptions.audio,
              peerid: this.user.uid,
              ec: q.code,
              subscribeRequestid: this.ID,
              p2pid: this.pc.ID,
            }),
            b(q);
        }
      });
    }
    async closeP2PConnection(a) {
      "disconnected" !== this.connectionState &&
        (this.stopUploadStats(),
        this.statsCollector.removeConnection(this.connectionId),
        (this.connectionState = "disconnected"),
        await this.setSubscribeOptions({ audio: !1, video: !1 }),
        await this.closePC(a),
        this.removeAllListeners());
    }
    getNetworkQuality() {
      var a = this.pc.getStats();
      if (!a.audioRecv[0] && !a.videoRecv[0]) return 1;
      var b = gc(this, G.NEED_SIGNAL_RTT),
        d = a.rtt;
      b = (d && b ? (d + b) / 2 : d || b) || 0;
      d = a.audioRecv[0] ? a.audioRecv[0].jitterMs : void 0;
      a = a.recvPacketLossRate;
      let e = (70 * a) / 50 + (0.3 * b) / 1500;
      d && (e = (60 * a) / 50 + (0.2 * b) / 1500 + (0.2 * d) / 400);
      return 0.1 > e ? 1 : 0.17 > e ? 2 : 0.36 > e ? 3 : 0.59 > e ? 4 : 5;
    }
    uploadStats(a) {
      let b = this.user.audioTrack ? Kl(a, this.user.audioTrack) : void 0,
        d = this.user.videoTrack ? Jl(a, this.user.videoTrack) : void 0;
      b && cb(() => this.emit(G.NEED_UPLOAD, wb.SUBSCRIBE_STATS, b));
      d && cb(() => this.emit(G.NEED_UPLOAD, wb.SUBSCRIBE_STATS, d));
    }
    uploadSlowStats(a) {}
    uploadRelatedStats(a, b) {
      let d = !0 === this.pc._statsFilter.videoIsReady,
        e = Nl(a, this.getUserId(), this.user.audioTrack),
        f = Ml(d, a, this.getUserId(), b, this.user.videoTrack);
      e &&
        cb(() => {
          this.emit(G.NEED_UPLOAD, wb.SUBSCRIBE_RELATED_STATS, e);
        });
      f &&
        cb(() => {
          this.emit(G.NEED_UPLOAD, wb.SUBSCRIBE_RELATED_STATS, f);
        });
    }
    emitOnTrackFromUnusedTracks() {
      if (this.subscribeOptions) {
        var a = this.subscribeOptions.video;
        if (this.subscribeOptions.audio) {
          var b;
          let a = U((b = this.unusedTracks)).call(
            b,
            (a) => "audio" === a.kind && "live" === a.readyState
          );
          bd(this.unusedTracks, a);
          a && this.onTrack(a);
        }
        if (a) {
          var d;
          a = U((d = this.unusedTracks)).call(
            d,
            (a) => "video" === a.kind && "live" === a.readyState
          );
          bd(this.unusedTracks, a);
          a && this.onTrack(a);
        }
      }
    }
    async setSubscribeOptions(a) {
      var b, d, e, f;
      if (
        a.audio !== this.subscribeOptions.audio ||
        a.video !== this.subscribeOptions.video
      ) {
        if ("connecting" === this.connectionState)
          try {
            await this.createWaitConnectionConnectedPromise();
          } catch (g) {
            throw new m(
              l.OPERATION_ABORTED,
              "can not update subscribe options, operation abort"
            );
          }
        (a.audio === this.subscribeOptions.audio &&
          a.video === this.subscribeOptions.video) ||
          (h.debug(
            n(
              (b = n(
                (d = n(
                  (e = n(
                    (f = "[".concat(
                      this.connectionId,
                      "] update subscribe options [a: "
                    ))
                  ).call(f, this.subscribeOptions.audio, ", v: "))
                ).call(e, this.subscribeOptions.video, "] -> [a: "))
              ).call(d, a.audio, ", v: "))
            ).call(b, a.video, "]")
          ),
          (this.subscribeOptions = a),
          !a.audio &&
            this.user._audioTrack &&
            (this.unusedTracks.push(
              this.user._audioTrack._originMediaStreamTrack
            ),
            this.user._audioTrack._destroy(),
            this.unbindTrackEvents(this.user._audioTrack),
            (this.user._audioTrack = void 0)),
          !a.video &&
            this.user._videoTrack &&
            (this.unusedTracks.push(
              this.user._videoTrack._originMediaStreamTrack
            ),
            this.user._videoTrack._destroy(),
            this.unbindTrackEvents(this.user._videoTrack),
            (this.user._videoTrack = void 0)),
          this.emitOnTrackFromUnusedTracks());
      }
    }
    createPC() {
      this.pc = new fl({ turnServer: this.joinInfo.turnServer });
      this.pc.onFirstAudioDecoded = () => {
        t.firstRemoteFrame(
          this.joinInfo.sid,
          Ea.FIRST_AUDIO_DECODE,
          sa.FIRST_AUDIO_DECODE,
          {
            peer: this.user._uintid,
            subscribeElapse: v() - this.startTime,
            subscribeRequestid: this.ID,
            p2pid: this.pc.ID,
          }
        );
      };
      this.pc.onFirstAudioReceived = () => {
        t.firstRemoteFrame(
          this.joinInfo.sid,
          Ea.FIRST_AUDIO_RECEIVED,
          sa.FIRST_AUDIO_RECEIVED,
          {
            peer: this.user._uintid,
            subscribeElapse: v() - this.startTime,
            subscribeRequestid: this.ID,
            p2pid: this.pc.ID,
          }
        );
      };
      this.pc.onFirstVideoDecoded = (a, b) => {
        t.firstRemoteFrame(
          this.joinInfo.sid,
          Ea.FIRST_VIDEO_DECODE,
          sa.FIRST_VIDEO_DECODE,
          {
            peer: this.user._uintid,
            videowidth: a,
            videoheight: b,
            subscribeElapse: v() - this.startTime,
            subscribeRequestid: this.ID,
            p2pid: this.pc.ID,
          }
        );
      };
      this.pc.onFirstVideoReceived = () => {
        t.firstRemoteFrame(
          this.joinInfo.sid,
          Ea.FIRST_VIDEO_RECEIVED,
          sa.FIRST_VIDEO_RECEIVED,
          {
            peer: this.user._uintid,
            subscribeElapse: v() - this.startTime,
            subscribeRequestid: this.ID,
            p2pid: this.pc.ID,
          }
        );
      };
      this.updateICEPromise();
    }
    async closePC(a) {
      return (this.pc.audioTrack && this.pc.audioTrack.stop(),
      this.pc.videoTrack && this.pc.videoTrack.stop(),
      (this.pc.onTrack = void 0),
      (this.pc.onICEConnectionStateChange = void 0),
      this.pc.close(),
      a)
        ? !1
        : await Ma(this, G.NEED_UNSUB);
    }
    onPCDisconnected(a) {
      t.subscribe(this.joinInfo.sid, {
        lts: this.startTime,
        succ: !1,
        video: this.subscribeOptions.video,
        audio: this.subscribeOptions.audio,
        peerid: this.user.uid,
        ec: a.code,
        subscribeRequestid: this.ID,
        p2pid: this.pc.ID,
      });
    }
    bindTrackEvents(a) {
      a instanceof Ad
        ? a.addListener(K.GET_STATS, this.handleGetRemoteAudioStats)
        : a instanceof zd &&
          a.addListener(K.GET_STATS, this.handleGetRemoteVideoStats);
    }
    unbindTrackEvents(a) {
      a instanceof Ad
        ? a.off(K.GET_STATS, this.handleGetRemoteAudioStats)
        : a instanceof zd && a.off(K.GET_STATS, this.handleGetRemoteVideoStats);
    }
  }
  class dq extends Ya {
    constructor(a, b, d, e) {
      super();
      this.reconnectMode = "retry";
      this.commandReqId = this.reqId = 0;
      this.handleWebSocketOpen = () => {
        this.reconnectMode = "retry";
        this.startPingPong();
      };
      this.handleWebSocketMessage = (a) => {
        if (a.data) {
          a = JSON.parse(a.data);
          var b;
          a.requestId
            ? this.emit(n((b = "@".concat(a.requestId, "-"))).call(b, a.sid), a)
            : this.serviceMode === na.INJECT
            ? this.emit(mb.INJECT_STREAM_STATUS, a)
            : (t.workerEvent(this.spec.sid, {
                actionType: "status",
                serverCode: a.code,
                workerType: this.serviceMode === na.TRANSCODE ? 1 : 2,
              }),
              this.emit(mb.PUBLISH_STREAM_STATUS, a));
        }
      };
      this.spec = b;
      this.token = a;
      this.serviceMode = e;
      this.websocket = new sg("live-streaming", d);
      this.websocket.on(T.CONNECTED, this.handleWebSocketOpen);
      this.websocket.on(T.ON_MESSAGE, this.handleWebSocketMessage);
      this.websocket.on(T.REQUEST_NEW_URLS, (a, b) => {
        Ma(this, mb.REQUEST_NEW_ADDRESS).then(a).catch(b);
      });
      this.websocket.on(T.RECONNECTING, () => {
        this.websocket.reconnectMode = this.reconnectMode;
      });
    }
    init(a) {
      return this.websocket.init(a);
    }
    async request(a, b, d, e) {
      this.reqId += 1;
      "request" === a && (this.commandReqId += 1);
      let f = this.commandReqId,
        g = this.reqId;
      if (!g || !this.websocket) throw new m(l.UNEXPECTED_ERROR);
      var k = nf(
        {
          command: a,
          sdkVersion: "4.2.1" === db ? "0.0.1" : db,
          seq: g,
          requestId: g,
          allocate: d,
          cname: this.spec.cname,
          appId: this.spec.appId,
          sid: this.spec.sid,
          uid: this.spec.uid.toString(),
          ts: Math.floor(v() / 1e3),
        },
        b
      );
      if ("closed" === this.websocket.state) throw new m(l.WS_DISCONNECT);
      let h = () =>
        new u((a, b) => {
          this.websocket.once(T.CLOSED, () => b(new m(l.WS_ABORT)));
          this.websocket.once(T.CONNECTED, a);
        });
      "connected" !== this.websocket.state && (await h());
      k.clientRequest && (k.clientRequest.workerToken = this.token);
      let p = new u((a, b) => {
        var d;
        const e = () => {
          b(new m(l.WS_ABORT));
        };
        this.websocket.once(T.RECONNECTING, e);
        this.websocket.once(T.CLOSED, e);
        this.once(n((d = "@".concat(g, "-"))).call(d, this.spec.sid), (b) => {
          a(b);
        });
      });
      e &&
        t.workerEvent(
          this.spec.sid,
          nf({}, e, {
            requestId: f,
            actionType: "request",
            payload: z(b.clientRequest),
            serverCode: 0,
            code: 0,
          })
        );
      let r = v();
      this.websocket.sendMessage(k);
      k = null;
      try {
        k = await p;
      } catch (Ia) {
        if ("closed" === this.websocket.state) throw Ia;
        return await h(), await this.request(a, b, d);
      }
      return (
        e &&
          t.workerEvent(
            this.spec.sid,
            nf({}, e, {
              requestId: f,
              actionType: "response",
              payload: z(k.serverResponse),
              serverCode: k.code,
              success: 200 === k.code,
              responseTime: v() - r,
            })
          ),
        200 !== k.code && this.handleResponseError(k),
        k
      );
    }
    tryNextAddress() {
      this.reconnectMode = "tryNext";
      this.websocket.reconnect("tryNext");
    }
    close() {
      let a = "4.2.1" === db ? "0.0.1" : db;
      this.reqId += 1;
      "connected" === this.websocket.state
        ? (this.websocket.sendMessage({
            command: "request",
            appId: this.spec.appId,
            cname: this.spec.cname,
            uid: this.spec.uid.toString(),
            sdkVersion: a,
            sid: this.spec.sid,
            seq: this.reqId,
            ts: Math.floor(v() / 1e3),
            requestId: this.reqId,
            clientRequest: { command: "DestroyWorker" },
          }),
          this.websocket.close(!1, !0))
        : this.websocket.close(!1);
      this.pingpongTimer &&
        (window.clearInterval(this.pingpongTimer),
        (this.pingpongTimer = void 0));
    }
    handleResponseError(a) {
      switch (a.code) {
        case ka.LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM:
          return void h.warning("live stream response already exists stream");
        case ka.LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR:
        case ka.LIVE_STREAM_RESPONSE_BAD_STREAM:
        case ka.LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR:
          return new m(l.LIVE_STREAMING_INVALID_ARGUMENT, "", {
            code: a.code,
          }).throw();
        case ka.LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST:
          if (
            "UnpublishStream" === a.serverResponse.command ||
            "UninjectStream" === a.serverResponse.command
          )
            break;
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "live stream response wm worker not exist",
            { retry: !0 }
          );
        case ka.LIVE_STREAM_RESPONSE_NOT_AUTHORIZED:
          return new m(l.LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED, "", {
            code: a.code,
          }).throw();
        case ka.LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE:
          var b = new m(l.LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE);
          return this.emit(mb.WARNING, b, a.serverResponse.url);
        case ka.LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN:
          return (
            (b = new m(l.LIVE_STREAMING_WARN_FREQUENT_REQUEST)),
            this.emit(mb.WARNING, b, a.serverResponse.url)
          );
        case ka.LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH:
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "live stream response wm worker not exist",
            { retry: !0 }
          );
        case ka.LIVE_STREAM_RESPONSE_NOT_SUPPORTED:
          return new m(l.LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED, "", {
            code: a.code,
          }).throw();
        case ka.LIVE_STREAM_RESPONSE_MAX_STREAM_NUM:
          return (
            (b = new m(l.LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT)),
            this.emit(mb.WARNING, b, a.serverResponse.url)
          );
        case ka.LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR:
          return new m(l.LIVE_STREAMING_INTERNAL_SERVER_ERROR, "", {
            code: a.code,
          }).throw();
        case ka.LIVE_STREAM_RESPONSE_RESOURCE_LIMIT:
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "live stream resource limit",
            { retry: !0, changeAddress: !0 }
          );
        case ka.LIVE_STREAM_RESPONSE_WORKER_LOST:
        case ka.LIVE_STREAM_RESPONSE_WORKER_QUIT:
          if (
            "UnpublishStream" === a.serverResponse.command ||
            "UninjectStream" === a.serverResponse.command
          )
            break;
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "error fail send message",
            { retry: !0, changeAddress: !0 }
          );
        case ka.ERROR_FAIL_SEND_MESSAGE:
          if (
            "UnpublishStream" === a.serverResponse.command ||
            "UninjectStream" === a.serverResponse.command
          )
            break;
          if (
            "UpdateTranscoding" === a.serverResponse.command ||
            "ControlStream" === a.serverResponse.command
          )
            return new m(
              l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
              "error fail send message",
              { code: a.code }
            ).throw();
          throw new m(
            l.LIVE_STREAMING_INTERNAL_SERVER_ERROR,
            "error fail send message",
            { retry: !0, changeAddress: !0 }
          );
        case ka.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH:
          return new m(l.LIVE_STREAMING_CDN_ERROR, "", {
            code: a.code,
          }).throw();
      }
    }
    startPingPong() {
      this.pingpongTimer && window.clearInterval(this.pingpongTimer);
      this.pingpongTimer = window.setInterval(() => {
        "connected" === this.websocket.state &&
          this.request("ping", {}).catch(rg);
      }, 6e3);
    }
  }
  class eq extends Ya {
    constructor(a, b = Pa, d = Pa) {
      super();
      this.retryTimeout = 1e4;
      this.streamingTasks = new Z();
      this.isStartingStreamingTask = !1;
      this.taskMutex = new cc("live-streaming");
      this.cancelToken = Fb.CancelToken.source();
      this.injectConfig = Zb({}, kp);
      this.injectLoopTimes = 0;
      this.lastTaskId = 1;
      this.statusError = new Z();
      this.spec = a;
      this.httpRetryConfig = d;
      this.wsRetryConfig = b;
    }
    async setTranscodingConfig(a) {
      var b;
      let d = Zb({}, jp, {}, a);
      var e, f;
      66 !== d.videoCodecProfile &&
        77 !== d.videoCodecProfile &&
        100 !== d.videoCodecProfile &&
        (h.debug(
          n(
            (e = "[".concat(
              this.spec.clientId,
              "] set transcoding config, fix video codec profile: "
            ))
          ).call(e, d.videoCodecProfile, " -> 100")
        ),
        (d.videoCodecProfile = 100));
      (d.transcodingUsers || (d.transcodingUsers = d.userConfigs),
      d.transcodingUsers) &&
        (d.transcodingUsers = A((f = d.transcodingUsers)).call(f, (a) =>
          Zb({}, ip, {}, a, { zOrder: a.zOrder ? a.zOrder + 1 : 1 })
        ));
      Bl(d);
      a = [];
      var g, k;
      d.images &&
        a.push(
          ...A((g = d.images)).call(g, (a) =>
            Zb({}, ig, {}, a, { zOrder: 255 })
          )
        );
      (d.backgroundImage &&
        (a.push(Zb({}, ig, {}, d.backgroundImage, { zOrder: 0 })),
        delete d.backgroundImage),
      d.watermark &&
        (a.push(Zb({}, ig, {}, d.watermark, { zOrder: 255 })),
        delete d.watermark),
      (d.images = a),
      d.transcodingUsers) &&
        ((d.userConfigs = A((k = d.transcodingUsers)).call(k, (a) =>
          Zb({}, a)
        )),
        (d.userCount = d.transcodingUsers.length),
        delete d.transcodingUsers);
      g = A((b = d.userConfigs || [])).call(b, (a) =>
        "number" == typeof a.uid
          ? u.resolve(a.uid)
          : ci(a.uid, this.spec, this.cancelToken.token, this.httpRetryConfig)
      );
      b = await u.all(g);
      if (
        (r(b).call(b, (a, b) => {
          d.userConfigs && d.userConfigs[b] && (d.userConfigs[b].uid = a);
        }),
        (this.transcodingConfig = d),
        this.connection)
      )
        try {
          var l, m, p;
          let a = await this.connection.request(
            "request",
            {
              clientRequest: {
                command: "UpdateTranscoding",
                transcodingConfig: this.transcodingConfig,
              },
            },
            !1,
            {
              command: "UpdateTranscoding",
              workerType: 1,
              requestByUser: !0,
              tid: A((l = Ob(sc((m = this.streamingTasks)).call(m))))
                .call(l, (a) => a.taskId)
                .join("#"),
            }
          );
          h.debug(
            n(
              (p = "[".concat(
                this.spec.clientId,
                "] update live transcoding config success, code: "
              ))
            ).call(p, a.code, ", config:"),
            z(this.transcodingConfig)
          );
        } catch (x) {
          var t;
          if (!x.data || !x.data.retry) throw x;
          x.data.changeAddress && this.connection.tryNextAddress();
          r((t = this.streamingTasks)).call(t, (a) => {
            h.warning(
              "[".concat(this.spec.clientId, "] live streaming receive error"),
              x.toString(),
              "try to republish",
              a.url
            );
            this.startLiveStreamingTask(a.url, a.mode, x)
              .then(() => {
                var b;
                h.debug(
                  n(
                    (b = "[".concat(
                      this.spec.clientId,
                      "] live streaming republish "
                    ))
                  ).call(b, a.url, " success")
                );
              })
              .catch((b) => {
                h.error(
                  "[".concat(
                    this.spec.clientId,
                    "] live streaming republish failed"
                  ),
                  a.url,
                  b.toString()
                );
                this.onLiveStreamError && this.onLiveStreamError(a.url, b);
              });
          });
        }
    }
    setInjectStreamConfig(a, b) {
      this.injectConfig = ab({}, this.injectConfig, a);
      this.injectLoopTimes = b;
    }
    async startLiveStreamingTask(a, b, d) {
      var e, f, g, k;
      if (
        U((e = Ob(sc((f = this.streamingTasks)).call(f)))).call(
          e,
          (a) => a.mode === na.INJECT
        ) &&
        b === na.INJECT
      )
        return new m(
          l.LIVE_STREAMING_TASK_CONFLICT,
          "inject stream over limit"
        ).throw();
      if (!this.transcodingConfig && b === na.TRANSCODE)
        throw new m(
          l.INVALID_OPERATION,
          "[LiveStreaming] no transcoding config found, can not start transcoding streaming task"
        );
      e = {
        command: "PublishStream",
        ts: v(),
        url: a,
        uid: this.spec.uid.toString(),
        autoDestroyTime: 30,
      };
      h.debug(
        n(
          (g = n(
            (k = "[".concat(this.spec.clientId, "] start live streaming "))
          ).call(k, a, ", mode: "))
        ).call(g, b)
      );
      g = await this.taskMutex.lock();
      if (!this.connection && d) return void g();
      if (this.streamingTasks.get(a) && !d)
        return g(), new m(l.LIVE_STREAMING_TASK_CONFLICT).throw();
      try {
        this.connection || (this.connection = await this.connect(b));
      } catch (B) {
        throw (g(), B);
      }
      switch (b) {
        case na.TRANSCODE:
          e.transcodingConfig = Zb({}, this.transcodingConfig);
          break;
        case na.INJECT:
          e = {
            cname: this.spec.cname,
            command: "InjectStream",
            sid: this.spec.sid,
            transcodingConfig: this.injectConfig,
            ts: v(),
            url: a,
            loopTimes: this.injectLoopTimes,
          };
      }
      this.uapResponse &&
        this.uapResponse.vid &&
        (e.vid = this.uapResponse.vid);
      this.isStartingStreamingTask = !0;
      k = this.lastTaskId++;
      try {
        var q;
        let f = new u((b, e) => {
            Db(this.retryTimeout).then(() => {
              if (d) return e(d);
              const b = this.statusError.get(a);
              return b ? (this.statusError.delete(a), e(b)) : void 0;
            });
          }),
          l = await u.race([
            this.connection.request("request", { clientRequest: e }, !0, {
              url: a,
              command: "PublishStream",
              workerType: b === na.TRANSCODE ? 1 : 2,
              requestByUser: !d,
              tid: k.toString(),
            }),
            f,
          ]);
        this.isStartingStreamingTask = !1;
        h.debug(
          n(
            (q = "[".concat(
              this.spec.clientId,
              "] live streaming started, code: "
            ))
          ).call(q, l.code)
        );
        this.streamingTasks.set(a, {
          clientRequest: e,
          mode: b,
          url: a,
          taskId: k,
        });
        g();
      } catch (B) {
        if (
          (g(),
          (this.isStartingStreamingTask = !1),
          !B.data || !B.data.retry || d)
        )
          throw B;
        return B.data.changeAddress
          ? (this.connection.tryNextAddress(),
            await this.startLiveStreamingTask(a, b, B))
          : await this.startLiveStreamingTask(a, b, B);
      }
    }
    stopLiveStreamingTask(a) {
      return new u((b, d) => {
        let e = this.streamingTasks.get(a);
        if (!e || !this.connection)
          return new m(
            l.UNEXPECTED_ERROR,
            "can not find streaming task to stop"
          ).throw();
        let f = e.mode;
        e.abortTask = () => {
          h.debug(
            "[".concat(
              this.spec.clientId,
              "] stop live streaming success(worker exception)"
            )
          );
          this.streamingTasks.delete(a);
          b();
        };
        this.connection
          .request(
            "request",
            {
              clientRequest: {
                command: f === na.INJECT ? "UninjectStream" : "UnpublishStream",
                url: e.url,
              },
            },
            !1,
            {
              url: a,
              command: "UnPublishStream",
              workerType: f === na.TRANSCODE ? 1 : 2,
              requestByUser: !0,
              tid: (this.lastTaskId++).toString(),
            }
          )
          .then((d) => {
            var e;
            h.debug(
              n(
                (e = "[".concat(
                  this.spec.clientId,
                  "] stop live streaming success, code: "
                ))
              ).call(e, d.code)
            );
            this.streamingTasks.delete(a);
            0 === this.streamingTasks.size &&
              f !== na.INJECT &&
              (this.connection && this.connection.close(),
              (this.connection = void 0));
            b();
            f === na.INJECT &&
              this.onInjectStatusChange &&
              this.onInjectStatusChange(5, this.spec.uid, a);
          })
          .catch(d);
      });
    }
    async controlInjectStream(a, b, d, e) {
      let f = this.streamingTasks.get(a);
      if (!f || !this.connection || f.mode !== na.INJECT)
        throw new m(
          l.INVALID_OPERATION,
          "can not find inject stream task to control"
        );
      return (
        await this.connection.request("request", {
          clientRequest: {
            command: "ControlStream",
            url: a,
            control: b,
            audioVolume: d,
            position: e,
          },
        })
      ).serverResponse;
    }
    resetAllTask() {
      var a;
      let b = Ob(sc((a = this.streamingTasks)).call(a));
      this.terminate();
      for (let a of b)
        this.startLiveStreamingTask(a.url, a.mode).catch((b) => {
          this.onLiveStreamError && this.onLiveStreamError(a.url, b);
        });
    }
    terminate() {
      this.cancelToken && this.cancelToken.cancel();
      this.streamingTasks = new Z();
      this.isStartingStreamingTask = !1;
      this.statusError = new Z();
      this.cancelToken = Fb.CancelToken.source();
      this.uapResponse = void 0;
      this.connection && this.connection.close();
      this.connection = void 0;
    }
    async connect(a) {
      if (this.connection)
        throw new m(
          l.UNEXPECTED_ERROR,
          "live streaming connection has already connected"
        );
      let b = await Ma(this, Rc.REQUEST_WORKER_MANAGER_LIST, a);
      return (
        (this.uapResponse = b),
        (this.connection = new dq(
          b.workerToken,
          this.spec,
          this.wsRetryConfig,
          a
        )),
        this.connection.on(
          mb.WARNING,
          (a, b) => this.onLiveStreamWarning && this.onLiveStreamWarning(b, a)
        ),
        this.connection.on(mb.PUBLISH_STREAM_STATUS, (a) =>
          this.handlePublishStreamServer(a)
        ),
        this.connection.on(mb.INJECT_STREAM_STATUS, (a) =>
          this.handleInjectStreamServerStatus(a)
        ),
        this.connection.on(mb.REQUEST_NEW_ADDRESS, (b, e) => {
          if (!this.connection)
            return e(
              new m(
                l.UNEXPECTED_ERROR,
                "can not get new live streaming address list"
              )
            );
          Ma(this, Rc.REQUEST_WORKER_MANAGER_LIST, a)
            .then((a) => {
              this.uapResponse = a;
              b(a.addressList);
            })
            .catch(e);
        }),
        await this.connection.init(b.addressList),
        this.connection
      );
    }
    handlePublishStreamServer(a) {
      var b = a.serverStatus && a.serverStatus.url;
      if (!b)
        throw new m(l.LIVE_STREAMING_INTERNAL_SERVER_ERROR, "empty url", {
          code: a.code,
        });
      let d = this.streamingTasks.get(b);
      switch (a.code) {
        case ka.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE:
        case ka.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH: {
          let e = new m(l.LIVE_STREAMING_CDN_ERROR, "", { code: a.code });
          if (d)
            return (
              h.error(e.toString()),
              this.onLiveStreamError && this.onLiveStreamError(b, e)
            );
          if (!this.isStartingStreamingTask) break;
          this.statusError.set(b, e);
        }
        case ka.LIVE_STREAM_RESPONSE_WORKER_LOST:
        case ka.LIVE_STREAM_RESPONSE_WORKER_QUIT:
          var e;
          if (this.connection) {
            this.connection.tryNextAddress();
            b = Ob(sc((e = this.streamingTasks)).call(e));
            for (let d of b)
              d.abortTask
                ? d.abortTask()
                : (h.warning(
                    "[".concat(
                      this.spec.clientId,
                      "] publish stream status code"
                    ),
                    a.code,
                    "try to republish",
                    d.url
                  ),
                  this.startLiveStreamingTask(
                    d.url,
                    d.mode,
                    new m(l.LIVE_STREAMING_INTERNAL_SERVER_ERROR, "", {
                      code: a.code,
                    })
                  )
                    .then(() => {
                      h.debug(
                        "[".concat(
                          this.spec.clientId,
                          "] republish live stream success"
                        ),
                        d.url
                      );
                    })
                    .catch((a) => {
                      h.error(a.toString());
                      this.onLiveStreamError &&
                        this.onLiveStreamError(d.url, a);
                    }));
          }
      }
    }
    handleInjectStreamServerStatus(a) {
      let b = Number(a.uid),
        d = a.serverStatus && a.serverStatus.url;
      switch (a.code) {
        case 200:
          return void (
            this.onInjectStatusChange && this.onInjectStatusChange(0, b, d)
          );
        case 451:
          return (
            this.onInjectStatusChange && this.onInjectStatusChange(1, b, d),
            void this.streamingTasks.delete(d)
          );
        case 453:
          return (
            this.onInjectStatusChange && this.onInjectStatusChange(2, b, d),
            void this.streamingTasks.delete(d)
          );
        case 470:
          return (
            this.onInjectStatusChange && this.onInjectStatusChange(10, b, d),
            void this.streamingTasks.delete(d)
          );
        case 499:
          return (
            this.onInjectStatusChange && this.onInjectStatusChange(3, b, d),
            void this.streamingTasks.delete(d)
          );
        default:
          return void h.debug("inject stream server status", a);
      }
    }
    hasUrl(a) {
      return this.streamingTasks.has(a);
    }
  }
  class qi {
    constructor() {
      this.destChannelMediaInfos = new Z();
    }
    setSrcChannelInfo(a) {
      Eh(a);
      this.srcChannelMediaInfo = a;
    }
    addDestChannelInfo(a) {
      Eh(a);
      this.destChannelMediaInfos.set(a.channelName, a);
    }
    removeDestChannelInfo(a) {
      Le(a);
      this.destChannelMediaInfos.delete(a);
    }
    getSrcChannelMediaInfo() {
      return this.srcChannelMediaInfo;
    }
    getDestChannelMediaInfo() {
      return this.destChannelMediaInfos;
    }
  }
  class fq extends Ya {
    constructor(a, b, d) {
      super();
      this.requestId = 1;
      this.onOpen = () => {
        this.emit("open");
        this.startHeartBeatCheck();
      };
      this.onClose = (a) => {
        this.emit("close");
        this.dispose();
      };
      this.onMessage = (a) => {
        a = JSON.parse(a.data);
        if (!a || "serverResponse" !== a.command || !a.requestId)
          return a &&
            "serverStatus" === a.command &&
            a.serverStatus &&
            a.serverStatus.command
            ? (this.emit("status", a.serverStatus),
              void this.emit(a.serverStatus.command, a.serverStatus))
            : void 0;
        this.emit("req_".concat(a.requestId), a);
      };
      this.joinInfo = a;
      this.clientId = b;
      this.ws = new sg("cross-channel-".concat(this.clientId), d);
      this.ws.on(T.RECONNECTING, () => {
        this.ws.reconnectMode = "retry";
        this.emit("reconnecting");
      });
      this.ws.on(T.CONNECTED, this.onOpen);
      this.ws.on(T.ON_MESSAGE, this.onMessage);
      this.ws.on(T.CLOSED, this.onClose);
    }
    isConnect() {
      return "connected" === this.ws.state;
    }
    sendMessage(a) {
      let b = this.requestId++;
      return (a.requestId = b), (a.seq = b), this.ws.sendMessage(a), b;
    }
    waitStatus(a) {
      return new u((b, d) => {
        let e = window.setTimeout(() => {
          d(new m(l.TIMEOUT, "wait status timeout, status: ".concat(a)));
        }, 5e3);
        this.once(a, (f) => {
          window.clearTimeout(e);
          f.state && 0 !== f.state
            ? d(
                new m(
                  l.CROSS_CHANNEL_WAIT_STATUS_ERROR,
                  "wait status error, status: ".concat(a)
                )
              )
            : b();
        });
        this.once("dispose", () => {
          window.clearTimeout(e);
          d(new m(l.WS_ABORT));
        });
      });
    }
    async request(a) {
      if ("closed" === this.ws.state) throw new m(l.WS_DISCONNECT);
      let b = () =>
        new u((a, b) => {
          this.ws.once(T.CLOSED, () => b(new m(l.WS_ABORT)));
          this.ws.once(T.CONNECTED, a);
        });
      "connected" !== this.ws.state && (await b());
      let d = this.sendMessage(a);
      a = await new u((a, b) => {
        const e = () => {
          b(new m(l.WS_ABORT));
        };
        this.ws.once(T.RECONNECTING, e);
        this.ws.once(T.CLOSED, e);
        this.once("req_".concat(d), a);
        Db(3e3).then(() => {
          this.removeAllListeners("req_".concat(d));
          this.ws.off(T.RECONNECTING, e);
          this.ws.off(T.CLOSED, e);
          b(new m(l.TIMEOUT, "cross channel ws request timeout"));
        });
      });
      if (!a || 200 !== a.code)
        throw new m(
          l.CROSS_CHANNEL_SERVER_ERROR_RESPONSE,
          "response: ".concat(z(a))
        );
      return a;
    }
    async connect(a) {
      this.ws.removeAllListeners(T.REQUEST_NEW_URLS);
      this.ws.on(T.REQUEST_NEW_URLS, (b) => {
        b(a);
      });
      await this.ws.init(a);
    }
    dispose() {
      this.clearHeartBeatCheck();
      this.emit("dispose");
      this.removeAllListeners();
      this.ws.close();
    }
    sendPing(a) {
      let b = this.requestId++;
      return (a.requestId = b), this.ws.sendMessage(a), b;
    }
    startHeartBeatCheck() {
      this.heartBeatTimer = window.setInterval(() => {
        this.sendPing({
          command: "ping",
          appId: this.joinInfo.appId,
          cname: this.joinInfo.cname,
          uid: this.joinInfo.uid.toString(),
          sid: this.joinInfo.sid,
          ts: +new Date(),
          requestId: 0,
        });
      }, 3e3);
    }
    clearHeartBeatCheck() {
      window.clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = void 0;
    }
  }
  class gq extends Ya {
    constructor(a, b, d, e) {
      super();
      this.cancelToken = Fb.CancelToken.source();
      this.requestId = 0;
      this._state = "RELAY_STATE_IDLE";
      this.errorCode = "RELAY_OK";
      this.onStatus = (a) => {
        var b;
        h.debug(
          n((b = "[".concat(this.clientId, "] ChannelMediaStatus: "))).call(
            b,
            z(a)
          )
        );
        a &&
          a.command &&
          ("onAudioPacketReceived" === a.command &&
            this.emit("event", "PACKET_RECEIVED_AUDIO_FROM_SRC"),
          "onVideoPacketReceived" === a.command &&
            this.emit("event", "PACKET_RECEIVED_VIDEO_FROM_SRC"),
          "onSrcTokenPrivilegeDidExpire" === a.command &&
            ((this.errorCode = "SRC_TOKEN_EXPIRED"),
            (this.state = "RELAY_STATE_FAILURE")),
          "onDestTokenPrivilegeDidExpire" === a.command &&
            ((this.errorCode = "DEST_TOKEN_EXPIRED"),
            (this.state = "RELAY_STATE_FAILURE")));
      };
      this.onReconnect = async () => {
        h.debug(
          "[".concat(
            this.clientId,
            "] ChannelMediaSocket disconnect, reconnecting"
          )
        );
        this.emit("event", "NETWORK_DISCONNECTED");
        this.state = "RELAY_STATE_IDLE";
        this.prevChannelMediaConfig &&
          this.sendStartRelayMessage(this.prevChannelMediaConfig).catch((a) => {
            "RELAY_STATE_IDLE" !== this.state &&
              (h.error("auto restart channel media relay failed", a.toString()),
              (this.errorCode = "SERVER_CONNECTION_LOST"),
              (this.state = "RELAY_STATE_FAILURE"));
          });
      };
      this.joinInfo = a;
      this.clientId = b;
      this.signal = new fq(this.joinInfo, this.clientId, d);
      this.httpRetryConfig = e;
    }
    set state(a) {
      a !== this._state &&
        ("RELAY_STATE_FAILURE" !== a && (this.errorCode = "RELAY_OK"),
        this.emit("state", a, this.errorCode),
        (this._state = a));
    }
    get state() {
      return this._state;
    }
    async startChannelMediaRelay(a) {
      if ("RELAY_STATE_IDLE" !== this.state) throw new m(l.INVALID_OPERATION);
      this.state = "RELAY_STATE_CONNECTING";
      await this.connect();
      h.debug(
        "[".concat(this.clientId, "] startChannelMediaRelay: connect success")
      );
      try {
        await this.sendStartRelayMessage(a);
      } catch (b) {
        if (
          b.data &&
          b.data.serverResponse &&
          "SetSourceChannel" === b.data.serverResponse.command
        )
          throw new m(l.CROSS_CHANNEL_FAILED_JOIN_SRC);
        if (
          b.data &&
          b.data.serverResponse &&
          "SetDestChannelStatus" === b.serverResponse.command
        )
          throw new m(l.CROSS_CHANNEL_FAILED_JOIN_DEST);
        if (
          b.data &&
          b.data.serverResponse &&
          "StartPacketTransfer" === b.serverResponse.command
        )
          throw new m(l.CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST);
        throw b;
      }
      this.prevChannelMediaConfig = a;
    }
    async updateChannelMediaRelay(a) {
      if ("RELAY_STATE_RUNNING" !== this.state)
        throw new m(l.INVALID_OPERATION);
      await this.sendUpdateMessage(a);
      this.prevChannelMediaConfig = a;
    }
    async stopChannelMediaRelay() {
      await this.sendStopRelayMessage();
      h.debug(
        "[".concat(
          this.clientId,
          "] stopChannelMediaRelay: send stop message success"
        )
      );
      this.state = "RELAY_STATE_IDLE";
      this.dispose();
    }
    dispose() {
      h.debug("[".concat(this.clientId, "] disposeChannelMediaRelay"));
      this.cancelToken.cancel();
      this.cancelToken = Fb.CancelToken.source();
      this.state = "RELAY_STATE_IDLE";
      this.emit("dispose");
      this.signal.dispose();
      this.prevChannelMediaConfig = void 0;
    }
    async connect() {
      let a = await qm(
        this.joinInfo,
        this.cancelToken.token,
        this.httpRetryConfig
      );
      this.workerToken = a.workerToken;
      await this.signal.connect(a.addressList);
      this.emit("event", "NETWORK_CONNECTED");
      this.signal.on("status", this.onStatus);
      this.signal.on("reconnecting", this.onReconnect);
    }
    async sendStartRelayMessage(a) {
      var b = this.genMessage(Ga.StopPacketTransfer);
      await this.signal.request(b);
      await this.signal.waitStatus("Normal Quit");
      h.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: StopPacketTransfer success"
        )
      );
      b = this.genMessage(Ga.SetSdkProfile, a);
      await this.signal.request(b);
      h.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: SetSdkProfile success"
        )
      );
      b = this.genMessage(Ga.SetSourceChannel, a);
      await this.signal.request(b);
      await this.signal.waitStatus("SetSourceChannelStatus");
      this.emit("event", "PACKET_JOINED_SRC_CHANNEL");
      h.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: SetSourceChannel success"
        )
      );
      b = this.genMessage(Ga.SetSourceUserId, a);
      await this.signal.request(b);
      h.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: SetSourceUserId success"
        )
      );
      b = this.genMessage(Ga.SetDestChannel, a);
      await this.signal.request(b);
      await this.signal.waitStatus("SetDestChannelStatus");
      this.emit("event", "PACKET_JOINED_DEST_CHANNEL");
      h.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: SetDestChannel success"
        )
      );
      a = this.genMessage(Ga.StartPacketTransfer, a);
      await this.signal.request(a);
      this.emit("event", "PACKET_SENT_TO_DEST_CHANNEL");
      this.state = "RELAY_STATE_RUNNING";
      h.debug(
        "[".concat(
          this.clientId,
          "] startChannelMediaRelay: StartPacketTransfer success"
        )
      );
    }
    async sendUpdateMessage(a) {
      a = this.genMessage(Ga.UpdateDestChannel, a);
      await this.signal.request(a);
      this.emit("event", "PACKET_UPDATE_DEST_CHANNEL");
      h.debug(
        "[".concat(
          this.clientId,
          "] sendUpdateMessage: UpdateDestChannel success"
        )
      );
    }
    async sendStopRelayMessage() {
      let a = this.genMessage(Ga.StopPacketTransfer);
      await this.signal.request(a);
      h.debug(
        "[".concat(
          this.clientId,
          "] sendStopRelayMessage: StopPacketTransfer success"
        )
      );
    }
    genMessage(a, b) {
      let d = [],
        e = [],
        f = [];
      this.requestId += 1;
      let g = {
        appId: this.joinInfo.appId,
        cname: this.joinInfo.cname,
        uid: this.joinInfo.uid.toString(),
        sdkVersion: db,
        sid: this.joinInfo.sid,
        ts: v(),
        requestId: this.requestId,
        seq: this.requestId,
        allocate: !0,
        clientRequest: {},
      };
      "4.2.1" === g.sdkVersion && (g.sdkVersion = "0.0.1");
      let k = null,
        h = null;
      switch (a) {
        case Ga.SetSdkProfile:
          return (
            (g.clientRequest = {
              command: "SetSdkProfile",
              type: "multi_channel",
            }),
            g
          );
        case Ga.SetSourceChannel:
          if (((h = b && b.getSrcChannelMediaInfo()), !h))
            throw new m(l.UNEXPECTED_ERROR, "can not find source config");
          return (
            (g.clientRequest = {
              command: "SetSourceChannel",
              uid: "0",
              channelName: h.channelName,
              token: h.token || this.joinInfo.appId,
            }),
            g
          );
        case Ga.SetSourceUserId:
          if (((h = b && b.getSrcChannelMediaInfo()), !h))
            throw new m(l.UNEXPECTED_ERROR, "can not find source config");
          return (
            (g.clientRequest = { command: "SetSourceUserId", uid: h.uid + "" }),
            g
          );
        case Ga.SetDestChannel:
          if (((k = b && b.getDestChannelMediaInfo()), !k))
            throw new m(l.UNEXPECTED_ERROR, "can not find dest config");
          return (
            r(k).call(k, (a) => {
              d.push(a.channelName);
              e.push(a.uid + "");
              f.push(a.token || this.joinInfo.appId);
            }),
            (g.clientRequest = {
              command: "SetDestChannel",
              channelName: d,
              uid: e,
              token: f,
            }),
            g
          );
        case Ga.StartPacketTransfer:
          return (g.clientRequest = { command: "StartPacketTransfer" }), g;
        case Ga.Reconnect:
          return (g.clientRequest = { command: "Reconnect" }), g;
        case Ga.StopPacketTransfer:
          return (g.clientRequest = { command: "StopPacketTransfer" }), g;
        case Ga.UpdateDestChannel:
          if (((k = b && b.getDestChannelMediaInfo()), !k))
            throw new m(l.UNEXPECTED_ERROR, "can not find dest config");
          return (
            r(k).call(k, (a) => {
              d.push(a.channelName);
              e.push(a.uid + "");
              f.push(a.token || this.joinInfo.appId);
            }),
            (g.clientRequest = {
              command: "UpdateDestChannel",
              channelName: d,
              uid: e,
              token: f,
            }),
            g
          );
      }
      return g;
    }
  }
  class hq {
    constructor(a, b) {
      this._trust_stream_added_state_ =
        this._trust_video_mute_state_ =
        this._trust_audio_mute_state_ =
        this._trust_video_enabled_state_ =
        this._trust_audio_enabled_state_ =
        this._trust_in_room_ =
          !0;
      this._video_muted_ = this._audio_muted_ = !1;
      this._video_enabled_ = this._audio_enabled_ = !0;
      this._video_added_ = this._audio_added_ = !1;
      this.uid = a;
      this._uintid = b;
    }
    get hasVideo() {
      return this._video_enabled_ && !this._video_muted_ && this._video_added_;
    }
    get hasAudio() {
      return this._audio_enabled_ && !this._audio_muted_ && this._audio_added_;
    }
    get audioTrack() {
      if (this.hasAudio) return this._audioTrack;
    }
    get videoTrack() {
      if (this.hasVideo) return this._videoTrack;
    }
  }
  class iq extends Ya {
    constructor(a) {
      var b, d, e, f;
      super();
      this._users = [];
      this._sessionId = null;
      this._bindEnabledTracks = [];
      this._leaveMutex = new cc("client-leave");
      this._publishMutex = new cc("client-publish");
      this._subscribeMutex = new Z();
      this._remoteStream = new Z();
      this._encryptionMode = "none";
      this._encryptionSecret = null;
      this._turnServer = { servers: [], mode: "auto" };
      this._cloudProxyServerMode = "disabled";
      this._isDualStreamEnabled = !1;
      this._streamFallbackTypeCacheMap = new Z();
      this._remoteStreamTypeCacheMap = new Z();
      this._axiosCancelSource = Fb.CancelToken.source();
      this._networkQualitySensitivity = "normal";
      this._handleLocalTrackEnable = (a, b, d) => {
        this.publish(a, !1).then(b).catch(d);
      };
      this._handleLocalTrackDisable = (a, b, d) => {
        this.unpublish(a, !1).then(b).catch(d);
      };
      this._handleUserOnline = (a) => {
        var b;
        this.isStringUID &&
          "string" != typeof a.uid &&
          h.error(
            "[".concat(this._clientId, "] StringUID is Mixed with UintUID")
          );
        let d = U((b = this._users)).call(b, (b) => b.uid === a.uid);
        d
          ? (d._trust_in_room_ = !0)
          : ((b = new hq(a.uid, a.uint_id || a.uid)),
            this._users.push(b),
            h.debug("[".concat(this._clientId, "] user online"), a.uid),
            this.emit(P.USER_JOINED, b));
      };
      this._handleUserOffline = (a) => {
        var b;
        let d = U((b = this._users)).call(b, (b) => b.uid === a.uid);
        d &&
          (this._handleRemoveStream(a),
          bd(this._users, d),
          this._remoteStreamTypeCacheMap.delete(d.uid),
          this._streamFallbackTypeCacheMap.delete(d.uid),
          h.debug(
            "[".concat(this._clientId, "] user offline"),
            a.uid,
            "reason:",
            a.reason
          ),
          this.emit(P.USER_LEAVED, d, a.reason));
      };
      this._handleAddAudioOrVideoStream = (a, b, d) => {
        var e, f, g;
        let k = U((e = this._users)).call(e, (a) => a.uid === b);
        if (!k)
          return void h.error(
            "[".concat(
              this._clientId,
              "] can not find target user!(on_add_stream)"
            )
          );
        h.debug(
          n(
            (f = n(
              (g = "[".concat(this._clientId, "] stream added with uid "))
            ).call(g, b, ", type "))
          ).call(f, a)
        );
        e = "audio" === a ? k.hasAudio : k.hasVideo;
        var l, q;
        (k._uintid || (k._uintid = d || b),
        (k._trust_stream_added_state_ = !0),
        "audio" === a ? (k._audio_added_ = !0) : (k._video_added_ = !0),
        ("audio" === a ? k.hasAudio : k.hasVideo) && !e) &&
          (h.info(
            n(
              (l = n((q = "[".concat(this._clientId, "] remote user "))).call(
                q,
                k.uid,
                " published "
              ))
            ).call(l, a)
          ),
          this.emit(P.USER_PUBLISHED, k, a));
        "video" === a
          ? t.onGatewayStream(
              this._sessionId,
              Ea.ON_ADD_VIDEO_STREAM,
              sa.ON_ADD_VIDEO_STREAM,
              { peer: d || b }
            )
          : t.onGatewayStream(
              this._sessionId,
              Ea.ON_ADD_AUDIO_STREAM,
              sa.ON_ADD_AUDIO_STREAM,
              { peer: d || b }
            );
        (a = this._remoteStream.get(b)) &&
          a.readyToReconnect &&
          "connecting" === a.connectionState &&
          a.reconnectPC().catch((a) => {
            h.error(
              "[".concat(this._clientId, "] resubscribe error"),
              a.toString()
            );
          });
      };
      this._handleRemoveStream = (a) => {
        var b, d;
        let e = U((b = this._users)).call(b, (b) => b.uid === a.uid);
        if (!e)
          return void h.warning(
            "[".concat(
              this._clientId,
              "] can not find target user!(on_remove_stream)"
            )
          );
        h.debug(
          n(
            (d = "[".concat(this._clientId, "] stream removed with uid "))
          ).call(d, a.uid)
        );
        b = () => {};
        e.hasAudio && e.hasVideo
          ? (b = () => {
              var a, b;
              h.info(
                n((a = "[".concat(this._clientId, "] remote user "))).call(
                  a,
                  e.uid,
                  " unpublished audio track"
                )
              );
              this.emit(P.USER_UNPUBLISHED, e, "audio");
              h.info(
                n((b = "[".concat(this._clientId, "] remote user "))).call(
                  b,
                  e.uid,
                  " unpublished video track"
                )
              );
              this.emit(P.USER_UNPUBLISHED, e, "video");
            })
          : e.hasVideo
          ? (b = () => {
              var a;
              h.info(
                n((a = "[".concat(this._clientId, "] remote user "))).call(
                  a,
                  e.uid,
                  " unpublished video track"
                )
              );
              this.emit(P.USER_UNPUBLISHED, e, "video");
            })
          : e.hasAudio &&
            (b = () => {
              var a;
              h.info(
                n((a = "[".concat(this._clientId, "] remote user "))).call(
                  a,
                  e.uid,
                  " unpublished audio track"
                )
              );
              this.emit(P.USER_UNPUBLISHED, e, "audio");
            });
        e._trust_stream_added_state_ = !0;
        e._audio_added_ = !1;
        e._video_added_ = !1;
        (d = this._remoteStream.get(e.uid)) &&
          (d.closeP2PConnection(), this._remoteStream.delete(e.uid));
        t.onGatewayStream(
          this._sessionId,
          Ea.ON_REMOVE_STREAM,
          sa.ON_REMOVE_STREAM,
          { peer: a.uint_id || a.uid }
        );
        b();
      };
      this._handleSetStreamLocalEnable = (a, b, d) => {
        var e, f, g, k, l, q;
        let m = U((e = this._users)).call(e, (a) => a.uid === b);
        if (!m)
          return void h.error(
            "[".concat(
              this._clientId,
              "] can not find target user!(disable_local)"
            )
          );
        h.debug(
          n(
            (f = n(
              (g = n((k = "[".concat(this._clientId, "] local "))).call(
                k,
                a,
                " "
              ))
            ).call(g, d ? "enabled" : "disabled", " with uid "))
          ).call(f, b)
        );
        e = "audio" === a ? m.hasAudio : m.hasVideo;
        if ("audio" === a) {
          m._trust_audio_enabled_state_ = !0;
          var p = m._audio_enabled_;
          if (((m._audio_enabled_ = d), m._audio_enabled_ === p)) return;
          var r, t;
          d = m._audio_enabled_ ? "enable-local-audio" : "disable-local-audio";
          h.debug(
            n(
              (r = n(
                (t = "[".concat(this._clientId, "] user-info-updated, uid: "))
              ).call(t, b, ", msg: "))
            ).call(r, d)
          );
          this.emit(P.USER_INFO_UPDATED, b, d);
        } else {
          m._trust_video_enabled_state_ = !0;
          r = m._video_enabled_;
          if (((m._video_enabled_ = d), m._video_enabled_ === r)) return;
          var u;
          d = m._video_enabled_ ? "enable-local-video" : "disable-local-video";
          h.debug(
            n(
              (p = n(
                (u = "[".concat(this._clientId, "] user-info-update, uid: "))
              ).call(u, b, ", msg: "))
            ).call(p, d)
          );
          this.emit(P.USER_INFO_UPDATED, b, d);
        }
        d = "audio" === a ? m.hasAudio : m.hasVideo;
        if (e !== d) {
          var v, w;
          if (!e && d)
            return (
              h.info(
                n(
                  (v = n(
                    (w = "[".concat(this._clientId, "] remote user "))
                  ).call(w, b, " published "))
                ).call(v, a)
              ),
              void this.emit(P.USER_PUBLISHED, m, a)
            );
          if ((v = this._remoteStream.get(b)))
            (w = Dc({}, v.subscribeOptions)),
              (w.audio = !!m.hasAudio && w.audio),
              (w.video = !!m.hasVideo && w.video),
              w.audio || w.video
                ? v.setSubscribeOptions(w)
                : (v.closeP2PConnection().catch((a) => {
                    h.warning("close sub pc error", a);
                  }),
                  this._remoteStream.delete(m.uid));
          h.info(
            n(
              (l = n((q = "[".concat(this._clientId, "] remote user "))).call(
                q,
                m.uid,
                " unpublished "
              ))
            ).call(l, a)
          );
          this.emit(P.USER_UNPUBLISHED, m, a);
        }
      };
      this._handleMuteStream = (a, b, d) => {
        var e, f, g;
        h.debug("[".concat(this._clientId, "] receive mute message"), a, b, d);
        let k = U((e = this._users)).call(e, (b) => b.uid === a);
        var l;
        if (!k)
          return void h.warning(
            n(
              (l = "[".concat(
                this._clientId,
                "] can not find remote user, ignore mute event, uid: "
              ))
            ).call(l, a)
          );
        e = "audio" === b ? k.hasAudio : k.hasVideo;
        if ("audio" === b) {
          k._trust_audio_mute_state_ = !0;
          var q = k._audio_muted_;
          if (((k._audio_muted_ = d), k._audio_muted_ === q)) return;
          var m, p;
          d = k._audio_muted_ ? "mute-audio" : "unmute-audio";
          h.debug(
            n(
              (m = n(
                (p = "[".concat(this._clientId, "] user-info-update, uid: "))
              ).call(p, a, ", msg: "))
            ).call(m, d)
          );
          this.emit(P.USER_INFO_UPDATED, a, d);
        } else {
          k._trust_video_mute_state_ = !0;
          m = k._video_muted_;
          if (((k._video_muted_ = d), k._video_muted_ === m)) return;
          var r;
          d = k._video_muted_ ? "mute-video" : "unmute-video";
          h.debug(
            n(
              (q = n(
                (r = "[".concat(this._clientId, "] user-info-update, uid: "))
              ).call(r, a, ", msg: "))
            ).call(q, d)
          );
          this.emit(P.USER_INFO_UPDATED, a, d);
        }
        d = "audio" === b ? k.hasAudio : k.hasVideo;
        if (e !== d) {
          var t, u;
          if (!e && d)
            return (
              h.info(
                n(
                  (t = n(
                    (u = "[".concat(this._clientId, "] remote user "))
                  ).call(u, a, " published "))
                ).call(t, b)
              ),
              void this.emit(P.USER_PUBLISHED, k, b)
            );
          if ((t = this._remoteStream.get(a)))
            (u = Dc({}, t.subscribeOptions)),
              (u.audio = !!k.hasAudio && u.audio),
              (u.video = !!k.hasVideo && u.video),
              "video" === b && t.pc._statsFilter.setVideoIsReady(!1),
              u.audio || u.video
                ? t.setSubscribeOptions(u)
                : (t.closeP2PConnection().catch((a) => {
                    h.warning("close sub pc error", a);
                  }),
                  this._remoteStream.delete(k.uid));
          h.info(
            n(
              (f = n((g = "[".concat(this._clientId, "] remote user "))).call(
                g,
                a,
                " unpublished "
              ))
            ).call(f, b)
          );
          this.emit(P.USER_UNPUBLISHED, k, b);
        }
      };
      this._handleP2PLost = (a) => {
        h.debug("[".concat(this._clientId, "] receive p2p lost"), a);
        let b = null;
        if (this._highStream && this._highStream.pc.ID === a.p2pid)
          b = this._highStream;
        else if (this._lowStream && this._lowStream.pc.ID === a.p2pid)
          b = this._lowStream;
        else {
          var d;
          r((d = this._remoteStream)).call(d, (d) => {
            d.pc.ID === a.p2pid && (b = d);
          });
        }
        b
          ? b.emit(G.GATEWAY_P2P_LOST, a.p2pid)
          : h.warning("P2PLost stream not found", a);
      };
      this._handleTokenWillExpire = () => {
        h.debug(
          "[".concat(
            this._clientId,
            "] received message onTokenPrivilegeWillExpire"
          )
        );
        this.emit(P.ON_TOKEN_PRIVILEGE_WILL_EXPIRE);
      };
      this._handleBeforeUnload = (a) => {
        (void 0 !== a.returnValue && "" !== a.returnValue) ||
          (this.leave(),
          h.info("[".concat(this._clientId, "] auto leave onbeforeunload")));
      };
      this._handleUpdateNetworkQuality = () => {
        var a;
        if ("normal" !== this._networkQualitySensitivity) {
          if (navigator && void 0 !== navigator.onLine && !navigator.onLine)
            return void this.emit(P.NETWORK_QUALITY, {
              downlinkNetworkQuality: 6,
              uplinkNetworkQuality: 6,
            });
          var b = { downlinkNetworkQuality: 0, uplinkNetworkQuality: 0 };
          this._highStream &&
            !this._highStream.detecting &&
            (b.uplinkNetworkQuality = this._highStream.getNetworkQuality());
          var d = 0;
          r((a = this._remoteStream)).call(
            a,
            (a) => (d += a.getNetworkQuality())
          );
          0 < this._remoteStream.size &&
            (b.downlinkNetworkQuality = Math.round(
              d / this._remoteStream.size
            ));
          this.emit(P.NETWORK_QUALITY, b);
        }
      };
      this._codec = a.codec;
      this._mode = a.mode;
      a.proxyServer &&
        ((this._proxyServer = a.proxyServer),
        t.setProxyServer(this._proxyServer),
        h.setProxyServer(this._proxyServer));
      a.turnServer &&
        (this._turnServer = Dc(
          {},
          this._turnServer,
          { mode: "manual" },
          a.turnServer
        ));
      this._clientId = pa(5, "client-");
      h.info(
        n(
          (b = n(
            (d = n(
              (e = n(
                (f = "[".concat(
                  this._clientId,
                  "] Initializing AgoraRTC client v"
                ))
              ).call(f, db, " build: "))
            ).call(
              e,
              "v4.2.1-0-gf505b57(2020/12/25 \u4e0a\u534810:21:56)",
              ", mode: "
            ))
          ).call(d, this._mode, ", codec: "))
        ).call(b, this._codec)
      );
      this._statsCollector = new Zc(this._clientId);
      this._statsCollector.onStatsException = (a, b, d) => {
        var e, f, g;
        h.debug(
          n(
            (e = n(
              (f = n(
                (g = "[".concat(
                  this._clientId,
                  "] receive exception msg, code: "
                ))
              ).call(g, a, ", msg: "))
            ).call(f, b, ", uid: "))
          ).call(e, d)
        );
        this.emit(P.EXCEPTION, { code: a, msg: b, uid: d });
      };
      this._statsCollector.onUploadPublishDuration = (a, b, d, e) => {
        var f;
        let g = U((f = this._users)).call(f, (b) => b.uid === a);
        g &&
          t.peerPublishStatus(this._sessionId, {
            subscribeElapse: e,
            audioPublishDuration: b,
            videoPublishDuration: d,
            peer: g._uintid,
          });
      };
      this._gateway = new Hp({
        clientId: this._clientId,
        mode: this._mode,
        codec: this._codec,
        websocketRetryConfig: a.websocketRetryConfig || Pa,
        httpRetryConfig: a.httpRetryConfig || Pa,
        forceWaitGatewayResponse:
          void 0 === a.forceWaitGatewayResponse || a.forceWaitGatewayResponse,
        statsCollector: this._statsCollector,
        role: a.role,
      });
      this._config = a;
      this._configDistribute = new Ip(this);
      this._handleGatewayEvents();
      kk.push(this);
    }
    get connectionState() {
      return this._gateway.state;
    }
    get remoteUsers() {
      return this._users;
    }
    get localTracks() {
      return this._highStream ? this._highStream.getAllTracks() : [];
    }
    get uid() {
      return this._uid;
    }
    get channelName() {
      return this._channelName;
    }
    get isStringUID() {
      return !!this._joinInfo && !!this._joinInfo.stringUid;
    }
    async join(a, b, d, e, f) {
      var g;
      let k = t.reportApiInvoke(this._sessionId, {
        name: y.JOIN,
        options: [a, b, d, e],
        tag: D.TRACER,
      });
      try {
        if (!d && null !== d)
          throw new m(
            l.INVALID_PARAMS,
            "Invalid token: ".concat(
              d,
              ". If you don not use token, set it to null"
            )
          );
        d && La(d, "token", 1, 2047);
        Le(b);
        e && Me(e);
        f && La(f, "optionalInfo", 1, 2047);
      } catch (x) {
        throw (k.onError(x), x);
      }
      if (
        (h.info(
          n((g = "[".concat(this._clientId, "] start join channel "))).call(
            g,
            b
          )
        ),
        this._leaveMutex.isLocked)
      )
        h.debug("[".concat(this._clientId, "] join: waiting leave operation")),
          (await this._leaveMutex.lock())(),
          h.debug("[".concat(this._clientId, "] join: continue"));
      if ("DISCONNECTED" !== this.connectionState)
        throw (
          ((a = new m(
            l.INVALID_OPERATION,
            "[".concat(
              this._clientId,
              "] Client already in connecting/connected state"
            )
          )),
          k.onError(a),
          a)
        );
      this._sessionId || (this._sessionId = pa(32, "").toUpperCase());
      this._gateway.state = "CONNECTING";
      let q = {
        clientId: this._clientId,
        appId: a,
        sid: this._sessionId,
        cname: b,
        uid: "string" != typeof e ? e : null,
        turnServer: this._turnServer,
        proxyServer: this._proxyServer,
        token: d || a,
        cloudProxyServer: this._cloudProxyServerMode,
        optionalInfo: f,
      };
      "string" == typeof e &&
        ((q.stringUid = e),
        this._uintUid
          ? ((q.uid = this._uintUid), (this._uintUid = void 0))
          : (q.uid = 0));
      "none" !== this._encryptionMode &&
        this._encryptionSecret &&
        ((q.aesmode = this._encryptionMode),
        (q.aespassword = this._encryptionSecret));
      t.sessionInit(this._sessionId, {
        lts: new Date().getTime(),
        cname: b,
        appid: a,
        mode: this._mode,
      });
      Ec(() => {
        "CONNECTING" === this.connectionState &&
          t.joinChannelTimeout(this._sessionId, 5);
      }, 5e3);
      try {
        var p;
        if (
          (await om(
            q,
            this._axiosCancelSource.token,
            this._config.httpRetryConfig || Pa
          ),
          q.stringUid && !q.uid)
        ) {
          var r;
          let a = await ci(
            q.stringUid,
            q,
            this._axiosCancelSource.token,
            this._config.httpRetryConfig || Pa
          );
          h.debug(
            n((r = "getUserAccount Success ".concat(q.stringUid, " => "))).call(
              r,
              a
            )
          );
          q.uid = a;
        }
        let e = await bi(
          q,
          this._axiosCancelSource.token,
          this._config.httpRetryConfig || Pa
        );
        var u;
        q.proxyServer &&
          (e.gatewayInfo.gatewayAddrs = A(
            (u = e.gatewayInfo.gatewayAddrs)
          ).call(u, (a) => {
            var b, d;
            a = a.split(":");
            return n(
              (b = n((d = "".concat(q.proxyServer, "/ws/?h="))).call(
                d,
                a[0],
                "&p="
              ))
            ).call(b, a[1]);
          }));
        this._configDistribute.updateConfig(this._clientId, e.configDistribute);
        this._key = d || a;
        this._joinInfo = Dc({}, q, {
          cid: e.gatewayInfo.cid,
          uid: q.uid ? q.uid : e.gatewayInfo.uid,
          vid: e.gatewayInfo.vid,
          apResponse: e.gatewayInfo.res,
          uni_lbs_ip: e.gatewayInfo.uni_lbs_ip,
          gatewayAddrs: e.gatewayInfo.gatewayAddrs,
        });
        let f = await this._gateway.join(this._joinInfo, this._key);
        return (
          k.onSuccess(f),
          (this._appId = a),
          (this._channelName = q.cname),
          (this._uid = f),
          this._networkQualityInterval &&
            window.clearInterval(this._networkQualityInterval),
          (this._networkQualityInterval = window.setInterval(
            this._handleUpdateNetworkQuality,
            2e3
          )),
          window.addEventListener("beforeunload", this._handleBeforeUnload),
          h.info(
            n(
              (p = "[".concat(this._clientId, "] Joining channel success: "))
            ).call(p, b)
          ),
          f
        );
      } catch (x) {
        throw (
          (h.error(
            "[".concat(this._clientId, "] Joining channel failed, rollback"),
            x
          ),
          x.code !== l.OPERATION_ABORTED &&
            ((this._gateway.state = "DISCONNECTED"), this._reset()),
          k.onError(x),
          x)
        );
      }
    }
    async leave() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: y.LEAVE,
        options: [],
        tag: D.TRACER,
      });
      h.info("[".concat(this._clientId, "] Leaving channel"));
      window.removeEventListener("beforeunload", this._handleBeforeUnload);
      this._reset();
      let b = await this._leaveMutex.lock();
      if ("DISCONNECTED" === this.connectionState)
        return (
          h.info(
            "[".concat(this._clientId, "] Leaving channel repeated, success")
          ),
          b(),
          a.onSuccess()
        );
      await this._gateway.leave("CONNECTED" !== this.connectionState);
      h.info("[".concat(this._clientId, "] Leaving channel success"));
      b();
      a.onSuccess();
    }
    async publish(a, b = !0) {
      var d, e;
      ec(a) || (a = [a]);
      let f = t.reportApiInvoke(this._sessionId, {
        name: y.PUBLISH,
        options: A(a).call(a, (a) => (a ? Object(a).toString() : "null")),
        tag: D.TRACER,
      });
      if (0 === a.length)
        return (
          (a = new m(l.INVALID_PARAMS, "track list is empty")),
          f.onError(a),
          a.throw()
        );
      if ("live" === this._mode && "audience" === this._gateway.role)
        return (
          (a = new m(l.INVALID_OPERATION, "audience can not publish stream")),
          f.onError(a),
          a.throw()
        );
      for (let d of a) {
        if (!(d instanceof ye))
          return (
            (a = new m(l.INVALID_PARAMS, "pamameter is not local track")),
            f.onError(a),
            a.throw()
          );
        if (!d._enabled && b)
          return (
            (a = new m(
              l.TRACK_IS_DISABLED,
              "can not publish a disabled track: ".concat(d.getTrackId())
            )),
            f.onError(a),
            a.throw()
          );
      }
      h.info(
        n((d = "[".concat(this._clientId, "] Publishing tracks, id "))).call(
          d,
          A(a).call(a, (a) => "".concat(a.getTrackId(), " "))
        )
      );
      b &&
        r(a).call(a, (a) => {
          var b;
          -1 === E((b = this._bindEnabledTracks)).call(b, a) &&
            (a.addListener(K.NEED_ADD_TRACK, this._handleLocalTrackEnable),
            a.addListener(K.NEED_REMOVE_TRACK, this._handleLocalTrackDisable),
            this._bindEnabledTracks.push(a));
        });
      d = await this._publishMutex.lock();
      try {
        let b = await this._publishHighStream(a),
          e = (b.audioTrack, b.videoTrack);
        this._isDualStreamEnabled &&
          e &&
          !this._lowStream &&
          (await this._publishLowStream(e));
        d();
        f.onSuccess();
      } catch (g) {
        throw (
          (d(),
          b &&
            r(a).call(a, (a) => {
              var b, d;
              let e = E((b = this._bindEnabledTracks)).call(b, a);
              -1 !== e &&
                (a.off(K.NEED_ADD_TRACK, this._handleLocalTrackEnable),
                a.off(K.NEED_REMOVE_TRACK, this._handleLocalTrackDisable),
                Ja((d = this._bindEnabledTracks)).call(d, e, 1));
            }),
          f.onError(g),
          h.error("[".concat(this._clientId, "] publish error"), g.toString()),
          g)
        );
      }
      h.info(
        n((e = "[".concat(this._clientId, "] Publish success, id "))).call(
          e,
          A(a).call(a, (a) => "".concat(a.getTrackId(), " "))
        )
      );
    }
    async unpublish(a, b = !0) {
      var d, e, f;
      if (!this._highStream)
        return void h.warning(
          "[".concat(this._clientId, "] Could not find tracks to unpublish")
        );
      var g = this._highStream.getAllTracks();
      a ? ec(a) || (a = [a]) : (a = this._highStream.getAllTracks());
      g = Rl(g, a);
      let k = t.reportApiInvoke(this._sessionId, {
        name: y.UNPUBLISH,
        options: A(a).call(a, (a) => a.getTrackId()),
        tag: D.TRACER,
      });
      h.info(
        n(
          (d = n(
            (e = "[".concat(this._clientId, "] Unpublish tracks, tracks "))
          ).call(
            e,
            A(a).call(a, (a) => "".concat(a.getTrackId(), " ")),
            ", isClosePC: "
          ))
        ).call(d, g)
      );
      d = g ? void 0 : await this._publishMutex.lock();
      if (!this._highStream)
        return (
          h.warning(
            "[".concat(this._clientId, "] Could not find tracks to unpublish")
          ),
          void (d && d())
        );
      try {
        this._lowStream &&
          0 < O(a).call(a, (a) => "video" === a.trackMediaType).length &&
          (await this._lowStream.closeP2PConnection(),
          (this._lowStream = void 0)),
          g
            ? await this._highStream.closeP2PConnection()
            : await this._highStream.removeTracks(a, b),
          d && d();
      } catch (q) {
        if (q.code !== l.OPERATION_ABORTED)
          throw (
            (k.onError(q),
            h.error(
              "[".concat(this._clientId, "] unpublish error"),
              q.toString()
            ),
            d && d(),
            q)
          );
        h.debug("[".concat(this._clientId, "] ignore unpub operation abort"));
        d && d();
      }
      this._highStream &&
        "disconnected" === this._highStream.connectionState &&
        ((this._highStream = void 0), (this._lowStream = void 0));
      b &&
        r(a).call(a, (a) => {
          var b, d;
          let e = E((b = this._bindEnabledTracks)).call(b, a);
          -1 !== e &&
            (a.off(K.NEED_ADD_TRACK, this._handleLocalTrackEnable),
            a.off(K.NEED_REMOVE_TRACK, this._handleLocalTrackDisable),
            Ja((d = this._bindEnabledTracks)).call(d, e, 1));
        });
      h.info(
        n((f = "[".concat(this._clientId, "] Unpublish success,tracks "))).call(
          f,
          A(a).call(a, (a) => "".concat(a.getTrackId()))
        )
      );
      k.onSuccess();
    }
    async subscribe(a, b) {
      var d, e, f, g;
      bb(b, "mediaType", ["audio", "video"]);
      let k = t.reportApiInvoke(this._sessionId, {
        name: y.SUBSCRIBE,
        options: [a.uid, b],
        tag: D.TRACER,
      });
      if (!this._joinInfo)
        throw (
          ((b = new m(
            l.INVALID_OPERATION,
            "Can't subscribe stream, not joined"
          )),
          k.onError(b),
          b)
        );
      if (
        "CONNECTED" !== this.connectionState &&
        "RECONNECTING" !== this.connectionState
      )
        throw (
          ((b = new m(
            l.INVALID_OPERATION,
            "Can't subscribe stream in ".concat(this.connectionState, " state")
          )),
          k.onError(b),
          b)
        );
      if (!U((d = this._users)).call(d, (b) => b === a)) {
        var q;
        b = new m(l.INVALID_REMOTE_USER, "user is not in the channel");
        throw (
          (h.error(
            n((q = "[".concat(this._clientId, "] can not subscribe "))).call(
              q,
              a.uid,
              ", this user is not in the channel"
            )
          ),
          k.onError(b),
          b)
        );
      }
      if (!a.hasAudio && !a.hasVideo) {
        var p;
        b = new m(l.INVALID_REMOTE_USER, "user is not published");
        throw (
          (h.error(
            n((p = "[".concat(this._clientId, "] can not subscribe "))).call(
              p,
              a.uid,
              ", user is not published"
            )
          ),
          k.onError(b),
          b)
        );
      }
      q = { audio: "audio" === b, video: "video" === b };
      if ((!a.hasAudio && q.audio) || (!a.hasVideo && q.video)) {
        var r, u;
        var x = new m(l.REMOTE_USER_IS_NOT_PUBLISHED);
        throw (
          (h.error(
            n(
              (r = n(
                (u = "[".concat(this._clientId, "] can not subscribe "))
              ).call(u, a.uid, " with mediaType "))
            ).call(r, b, ", remote track is not published")
          ),
          k.onError(x),
          x)
        );
      }
      (r = this._subscribeMutex.get(a.uid)) ||
        ((r = new cc("sub-".concat(a.uid))),
        this._subscribeMutex.set(a.uid, r));
      h.info(
        n(
          (e = n((f = "[".concat(this._clientId, "] subscribe user "))).call(
            f,
            a.uid,
            ", mediaType: "
          ))
        ).call(e, b)
      );
      e = await r.lock();
      f = this._remoteStream.get(a.uid);
      try {
        if (f)
          (q.audio = q.audio || f.subscribeOptions.audio),
            (q.video = q.video || f.subscribeOptions.video),
            await this._gateway.subscribeChange(f, q);
        else {
          f = new cq(a, this._statsCollector, this._joinInfo, q);
          this._remoteStream.set(a.uid, f);
          try {
            await this._gateway.subscribe(f);
          } catch (Ha) {
            throw (this._remoteStream.delete(a.uid), Ha);
          }
          f.on(G.CONNECTION_STATE_CHANGE, (b, d) => {
            "connecting" === b
              ? this.emit(P.MEDIA_RECONNECT_START, a.uid)
              : "connected" === b && this.emit(P.MEDIA_RECONNECT_END, a.uid);
          });
        }
        e();
      } catch (Ha) {
        var v;
        throw (
          (k.onError(Ha),
          e(),
          h.error(
            n((v = "[".concat(this._clientId, "] subscribe user "))).call(
              v,
              a.uid,
              " error"
            ),
            Ha
          ),
          Ha)
        );
      }
      h.info(
        n(
          (x = n(
            (g = "[".concat(this._clientId, "] subscribe success user "))
          ).call(g, a.uid, ", mediaType: "))
        ).call(x, b)
      );
      this._defaultStreamFallbackType &&
        this.setStreamFallbackOption(
          a.uid,
          this._defaultStreamFallbackType
        ).catch((a) => {
          h.warning(
            "[".concat(this._clientId, "] auto set fallback failed"),
            a
          );
        });
      b = "audio" === b ? a.audioTrack : a.videoTrack;
      return b
        ? (k.onSuccess(b.getTrackId()), b)
        : ((b = new m(
            l.UNEXPECTED_ERROR,
            "can not find remote track in user object"
          )),
          k.onError(b),
          b.throw());
    }
    async unsubscribe(a, b) {
      var d, e, f, g, k;
      b && bb(b, "mediaType", ["audio", "video"]);
      let q = t.reportApiInvoke(this._sessionId, {
        name: y.UNSUBSCRIBE,
        options: [a.uid, b],
        tag: D.TRACER,
      });
      if (!U((d = this._users)).call(d, (b) => b === a)) {
        var p;
        b = new m(l.INVALID_REMOTE_USER, "user is not in the channel");
        throw (
          (h.error(
            n((p = "[".concat(this._clientId, "] can not subscribe "))).call(
              p,
              a.uid,
              ", user is not in the channel"
            )
          ),
          q.onError(b),
          b)
        );
      }
      h.info(
        n(
          (e = n((f = "[".concat(this._clientId, "] unsubscribe uid: "))).call(
            f,
            a.uid,
            ", mediaType: "
          ))
        ).call(e, b)
      );
      (p = this._subscribeMutex.get(a.uid)) ||
        ((p = new cc("sub-".concat(a.uid))),
        this._subscribeMutex.set(a.uid, p));
      p = await p.lock();
      d = this._remoteStream.get(a.uid);
      var r;
      if (!d)
        return (
          h.warning(
            n(
              (r = "[".concat(
                this._clientId,
                "]: you have not subscribe the remote user "
              ))
            ).call(r, a.uid)
          ),
          q.onSuccess(),
          void p()
        );
      r = Dc({}, d.subscribeOptions);
      "audio" === b
        ? (r.audio = !1)
        : ("video" === b || (r.audio = !1), (r.video = !1));
      try {
        r.audio || r.video
          ? await this._gateway.subscribeChange(d, r)
          : (await d.closeP2PConnection(), this._remoteStream.delete(a.uid)),
          p();
      } catch (x) {
        var u;
        if (x.code !== l.OPERATION_ABORTED)
          throw (
            (q.onError(x),
            p(),
            h.error(
              n((u = "[".concat(this._clientId, "] unsubscribe user "))).call(
                u,
                a.uid,
                " error"
              ),
              x.toString()
            ),
            x)
          );
        p();
        h.debug("[".concat(this._clientId, "] ignore unsub operation abort"));
      }
      h.info(
        n(
          (g = n(
            (k = "[".concat(this._clientId, "] unsubscribe success uid: "))
          ).call(k, a.uid, ", mediaType: "))
        ).call(g, b)
      );
      q.onSuccess();
    }
    setLowStreamParameter(a) {
      if (!a) throw new m(l.INVALID_PARAMS);
      null == a.width || W(a.width, "streamParameter.width");
      null == a.height || W(a.height, "streamParameter.height");
      null == a.framerate || W(a.framerate, "streamParameter.framerate");
      null == a.bitrate || W(a.bitrate, "streamParameter.bitrate");
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.SET_LOW_STREAM_PARAMETER,
        options: [a],
        tag: D.TRACER,
      });
      ((!a.width && a.height) || (a.width && !a.height)) &&
        h.warning(
          "[".concat(
            this._clientId,
            "] The width and height parameters take effect only when both are set"
          )
        );
      h.info("[".concat(this._clientId, "] set low stream parameter to"), z(a));
      this._lowStreamParameter = a;
      b.onSuccess();
    }
    async enableDualStream() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: y.ENABLE_DUAL_STREAM,
        options: [],
        tag: D.TRACER,
      });
      if (!fa.supportDualStream) {
        t.streamSwitch(this._sessionId, { lts: v(), isdual: !0, succ: !1 });
        var b = new m(
          l.NOT_SUPPORTED,
          "Your browser is not support dual stream"
        );
        throw (a.onError(b), b);
      }
      if (this._isDualStreamEnabled)
        throw (
          ((b = new m(l.INVALID_OPERATION, "Dual stream is already enabled")),
          a.onError(b),
          b)
        );
      if (
        this._highStream &&
        "connected" === this._highStream.connectionState &&
        this._highStream.videoTrack
      )
        try {
          await this._publishLowStream(this._highStream.videoTrack);
        } catch (d) {
          throw (
            (t.streamSwitch(this._sessionId, {
              lts: v(),
              isdual: !0,
              succ: !1,
            }),
            a.onError(d),
            d)
          );
        }
      this._isDualStreamEnabled = !0;
      t.streamSwitch(this._sessionId, { lts: v(), isdual: !0, succ: !0 });
      h.info("[".concat(this._clientId, "] enable dual stream"));
      a.onSuccess();
    }
    async disableDualStream() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: y.DISABLE_DUAL_STREAM,
        options: [],
        tag: D.TRACER,
      });
      if (this._lowStream)
        try {
          await this._lowStream.closeP2PConnection();
        } catch (b) {
          throw (
            (t.streamSwitch(this._sessionId, {
              lts: v(),
              isdual: !1,
              succ: !1,
            }),
            a.onError(b),
            b)
          );
        }
      this._lowStream = void 0;
      this._isDualStreamEnabled = !1;
      this._highStream && (this._highStream.lowStreamConnection = void 0);
      t.streamSwitch(this._sessionId, { lts: v(), isdual: !1, succ: !0 });
      h.info("[".concat(this._clientId, "] disable dual stream"));
      a.onSuccess();
    }
    async setClientRole(a) {
      bb(a, "role", ["audience", "host"]);
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.SET_CLIENT_ROLE,
        options: [a],
        tag: D.TRACER,
      });
      if ("rtc" === this._mode)
        return (
          h.warning("rtc mode can not use setClientRole"),
          (a = new m(
            l.INVALID_OPERATION,
            "rtc mode can not use setClientRole"
          )),
          b.onError(a),
          a.throw()
        );
      try {
        var d;
        if ("audience" === a && this._highStream)
          throw new m(
            l.INVALID_OPERATION,
            "can not set client role to audience when publishing stream"
          );
        await this._gateway.setClientRole(a);
        h.info(
          n((d = "[".concat(this._clientId, "] set client role to "))).call(
            d,
            a
          )
        );
        b.onSuccess();
      } catch (e) {
        throw (b.onError(e), e);
      }
    }
    setProxyServer(a) {
      La(a, "proxyServer");
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.SET_PROXY_SERVER,
        options: [a],
        tag: D.TRACER,
      });
      if ("DISCONNECTED" !== this.connectionState)
        throw new m(
          l.INVALID_OPERATION,
          "Set proxy server before join channel"
        );
      if ("disabled" !== this._cloudProxyServerMode)
        throw new m(l.INVALID_OPERATION, "You have already set the proxy");
      this._proxyServer = a;
      t.setProxyServer(this._proxyServer);
      h.setProxyServer(this._proxyServer);
      b.onSuccess();
    }
    setTurnServer(a) {
      ec(a) || (a = [a]);
      r(a).call(a, (a) => Dh(a));
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.SET_TURN_SERVER,
        options: a,
        tag: D.TRACER,
      });
      if ("DISCONNECTED" !== this.connectionState)
        throw new m(l.INVALID_OPERATION, "Set turn server before join channel");
      if ("disabled" !== this._cloudProxyServerMode)
        throw new m(l.INVALID_OPERATION, "You have already set the proxy");
      this._turnServer = { servers: a, mode: "manual" };
      h.info("[".concat(this._clientId, "] Set turnserver."));
      b.onSuccess();
    }
    startProxyServer(a) {
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.START_PROXY_SERVER,
        options: [],
        tag: D.TRACER,
      });
      if ("DISCONNECTED" !== this.connectionState)
        throw (
          ((a = new m(
            l.INVALID_OPERATION,
            "Start proxy server before join channel"
          )),
          b.onError(a),
          a)
        );
      if (this._proxyServer || "manual" === this._turnServer.mode)
        throw (
          ((a = new m(l.INVALID_OPERATION, "You have already set the proxy")),
          b.onError(a),
          a)
        );
      let d = [1, 2, 3, 4];
      if ((void 0 === a && (a = 1), a && -1 === E(d).call(d, a)))
        throw (
          ((a = new m(
            l.INVALID_PARAMS,
            "proxy server mode must be ".concat(d.join("|"))
          )),
          b.onError(a),
          a)
        );
      this._cloudProxyServerMode =
        2 === a
          ? "443only"
          : 3 === a
          ? "proxy3"
          : 4 === a
          ? "proxy4"
          : "normal";
      h.info(
        "[".concat(this._clientId, "] set cloud proxy server mode to"),
        this._cloudProxyServerMode
      );
      b.onSuccess();
    }
    stopProxyServer() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: y.STOP_PROXY_SERVER,
        options: [],
        tag: D.TRACER,
      });
      if ("DISCONNECTED" !== this.connectionState)
        throw new m(
          l.INVALID_OPERATION,
          "Stop proxy server after leave channel"
        );
      t.setProxyServer();
      h.setProxyServer();
      this._cloudProxyServerMode = "disabled";
      h.info(
        "[".concat(this._clientId, "] set cloud proxy server mode to"),
        this._cloudProxyServerMode
      );
      this._proxyServer = void 0;
      this._turnServer = { mode: "auto", servers: [] };
      a.onSuccess();
    }
    async setRemoteVideoStreamType(a, b) {
      var d, e;
      bb(b, "streamType", [0, 1]);
      let f = t.reportApiInvoke(this._sessionId, {
        name: y.SET_REMOTE_VIDEO_STREAM_TYPE,
        options: [a, b],
        tag: D.TRACER,
      });
      try {
        await this._gateway.setRemoteVideoStreamType(a, b);
      } catch (g) {
        throw (
          (f.onError(g),
          h.error(
            "[".concat(this._clientId, "] set remote video stream type error"),
            g.toString()
          ),
          g)
        );
      }
      h.info(
        n(
          (d = n((e = "[".concat(this._clientId, "] set remote "))).call(
            e,
            a,
            " video stream type to "
          ))
        ).call(d, b)
      );
      this._remoteStreamTypeCacheMap.set(a, b);
      f.onSuccess();
    }
    async setStreamFallbackOption(a, b) {
      var d, e;
      bb(b, "fallbackType", [0, 1, 2]);
      let f = t.reportApiInvoke(this._sessionId, {
        name: y.SET_STREAM_FALLBACK_OPTION,
        options: ["too long to show", b],
        tag: D.TRACER,
      });
      try {
        await this._gateway.setStreamFallbackOption(a, b);
      } catch (g) {
        throw (
          (f.onError(g),
          h.error(
            "[".concat(this._clientId, "] set stream fallback option"),
            g.toString()
          ),
          g)
        );
      }
      h.info(
        n(
          (d = n((e = "[".concat(this._clientId, "] set remote "))).call(
            e,
            a,
            " stream fallback type to "
          ))
        ).call(d, b)
      );
      this._streamFallbackTypeCacheMap.set(a, b);
      f.onSuccess();
    }
    setEncryptionConfig(a, b) {
      bb(a, "encryptionMode", [
        "aes-128-xts",
        "aes-256-xts",
        "aes-128-ecb",
        "sm4-128-ecb",
        "none",
      ]);
      La(b, "secret");
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*,.<>?/:;'"|{}\[\]])(?=.{8,})/.test(
        b
      ) ||
        h.warning(
          "The secret is not strong:\n      The secret must contain at least 1 lowercase alphabetical character,\n      The secret must contain at least 1 uppercase alphabetical character,\n      The secret must contain at least 1 numeric character,\n      The secret must contain at least one special character,\n      The secret must be eight characters or longer.\n      "
        );
      let d = t.reportApiInvoke(this._sessionId, {
        name: y.SET_ENCRYPTION_CONFIG,
        options: [a],
        tag: D.TRACER,
      });
      this._encryptionMode = a;
      this._encryptionSecret = b;
      d.onSuccess();
    }
    async renewToken(a) {
      La(a, "token", 1, 2047);
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.RENEW_TOKEN,
        options: [a],
        tag: D.TRACER,
      });
      if (!this._key)
        return (
          (a = new m(
            l.INVALID_OPERATION,
            "renewToken should not be called before user join"
          )),
          b.onError(a),
          a.throw()
        );
      this._key = a;
      try {
        await this._gateway.renewToken(a);
      } catch (d) {
        throw (
          (b.onError(d),
          h.error(
            "[".concat(this._clientId, "] renewToken failed"),
            d.toString()
          ),
          d)
        );
      }
      h.debug("[".concat(this._clientId, "] renewToken success"));
      b.onSuccess();
    }
    enableAudioVolumeIndicator() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: y.ENABLE_AUDIO_VOLUME_INDICATOR,
        options: [],
        tag: D.TRACER,
      });
      if (this._audioVolumeIndicationInterval)
        return (
          h.warning("you have already enabled audio volume indicator!"),
          a.onSuccess()
        );
      this._audioVolumeIndicationInterval = window.setInterval(() => {
        var a, d, e;
        let f = sd(
          (a = A((d = Ob(sc((e = this._remoteStream)).call(e)))).call(
            d,
            (a) => ({
              level: a.user.audioTrack
                ? 100 * a.user.audioTrack._source.getAudioAvgLevel()
                : 0,
              uid: a.getUserId(),
            })
          ))
        ).call(a, (a, b) => a.level - b.level);
        this._highStream &&
          this._highStream.audioTrack &&
          (f.push({
            level: 100 * this._highStream.audioTrack._source.getAudioAvgLevel(),
            uid: this._highStream._userId,
          }),
          (f = sd(f).call(f, (a, b) => a.level - b.level)));
        this.emit(P.VOLUME_INDICATOR, f);
      }, w.AUDIO_VOLUME_INDICATION_INTERVAL || 2e3);
      a.onSuccess();
    }
    getRTCStats() {
      let a = this._statsCollector.getRTCStats(),
        b = this._gateway.getInChannelInfo();
      return (a.Duration = Math.round(b.duration / 1e3)), a;
    }
    startLiveStreaming(a, b) {
      let d = t.reportApiInvoke(this._sessionId, {
        name: y.START_LIVE_STREAMING,
        options: [a, b],
        tag: D.TRACER,
      });
      if (!b) {
        if ("h264" !== this._codec)
          return (
            (a = new m(
              l.LIVE_STREAMING_INVALID_RAW_STREAM,
              "raw streaming is only support h264"
            )),
            d.onError(a),
            u.reject(a)
          );
        if (!this._highStream)
          return (
            (a = new m(
              l.LIVE_STREAMING_INVALID_RAW_STREAM,
              "can not find stream to raw streaming"
            )),
            d.onError(a),
            u.reject(a)
          );
      }
      if (
        (this._liveRawStreamingClient &&
          this._liveRawStreamingClient.hasUrl(a)) ||
        (this._liveTranscodeStreamingClient &&
          this._liveTranscodeStreamingClient.hasUrl(a))
      )
        return (
          (a = new m(l.LIVE_STREAMING_TASK_CONFLICT)), d.onError(a), u.reject(a)
        );
      b = b ? na.TRANSCODE : na.RAW;
      return this._createLiveStreamingClient(b)
        .startLiveStreamingTask(a, b)
        .then(() => d.onSuccess())
        .catch((a) => {
          throw (d.onError(a), a);
        });
    }
    setLiveTranscoding(a) {
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.SET_LIVE_TRANSCODING,
        options: [a],
        tag: D.TRACER,
      });
      return this._createLiveStreamingClient(na.TRANSCODE)
        .setTranscodingConfig(a)
        .then(() => b.onSuccess())
        .catch((a) => {
          throw (b.onError(a), a);
        });
    }
    stopLiveStreaming(a) {
      var b;
      let d = t.reportApiInvoke(this._sessionId, {
          name: y.STOP_LIVE_STREAMING,
          options: [a],
          tag: D.TRACER,
        }),
        e = O(
          (b = [
            this._liveRawStreamingClient,
            this._liveTranscodeStreamingClient,
          ])
        ).call(b, (b) => b && b.hasUrl(a));
      return e.length
        ? u
            .all(A(e).call(e, (b) => b && b.stopLiveStreamingTask(a)))
            .then(() => d.onSuccess())
            .catch((a) => {
              throw (d.onError(a), a);
            })
        : ((b = new m(
            l.INVALID_PARAMS,
            "can not find live streaming url to stop"
          )),
          d.onError(b),
          u.reject(b));
    }
    async addInjectStreamUrl(a, b) {
      let d = t.reportApiInvoke(this._sessionId, {
        name: y.ADD_INJECT_STREAM_URL,
        options: [a, b],
        tag: D.TRACER,
      });
      try {
        if (!this._joinInfo)
          throw new m(
            l.INVALID_OPERATION,
            "can not addInjectStreamUrl, no joininfo"
          );
        let d = this._createLiveStreamingClient(na.INJECT);
        d.setInjectStreamConfig(b, 0);
        await d.startLiveStreamingTask(a, na.INJECT);
      } catch (e) {
        throw (d.onError(e), e);
      }
      d.onSuccess();
    }
    async removeInjectStreamUrl() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: y.REMOVE_INJECT_STREAM_URL,
        options: [],
        tag: D.TRACER,
      });
      try {
        var b, d;
        let a = this._createLiveStreamingClient(na.INJECT),
          f = U((b = Ob(sc((d = a.streamingTasks)).call(d)))).call(
            b,
            (a) => a.mode === na.INJECT
          );
        if (!this._joinInfo || !f)
          throw new m(
            l.INVALID_OPERATION,
            "can remove addInjectStreamUrl, no joininfo or inject task"
          );
        await a.stopLiveStreamingTask(f.url);
      } catch (e) {
        throw (a.onError(e), e);
      }
      a.onSuccess();
    }
    async startChannelMediaRelay(a) {
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.START_CHANNEL_MEDIA_RELAY,
        options: [a],
        tag: D.TRACER,
      });
      try {
        pi(a),
          await this._createChannelMediaRelayClient().startChannelMediaRelay(a);
      } catch (d) {
        return b.onError(d), d.throw();
      }
      b.onSuccess();
    }
    async updateChannelMediaRelay(a) {
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.UPDATE_CHANNEL_MEDIA_RELAY,
        options: [a],
        tag: D.TRACER,
      });
      try {
        pi(a),
          await this._createChannelMediaRelayClient().updateChannelMediaRelay(
            a
          );
      } catch (d) {
        return b.onError(d), d.throw();
      }
      b.onSuccess();
    }
    async stopChannelMediaRelay() {
      let a = t.reportApiInvoke(this._sessionId, {
        name: y.STOP_CHANNEL_MEDIA_RELAY,
        options: [],
        tag: D.TRACER,
      });
      try {
        await this._createChannelMediaRelayClient().stopChannelMediaRelay();
      } catch (b) {
        return a.onError(b), b.throw();
      }
      a.onSuccess();
    }
    sendStreamMessage(a) {
      if (!this._joinInfo)
        throw new m(
          l.INVALID_OPERATION,
          "can not send data stream, not joined"
        );
      "string" == typeof a && (a = new TextEncoder().encode(a));
      if (1024 < new Blob([a]).size)
        throw new m(l.INVALID_PARAMS, "stream message out of range.");
      return this._gateway.signal.request(ca.DATA_STREAM, { payload: Ye(a) });
    }
    sendMetadata(a) {
      if (!this._joinInfo)
        throw new m(l.INVALID_OPERATION, "can not send metadata, not joined");
      if (1024 < new Blob([a]).size) throw new m(l.METADATA_OUT_OF_RANGE);
      return this._gateway.signal.request(ca.SEND_METADATA, {
        session_id: this._joinInfo.sid,
        metadata: Ye(a),
      });
    }
    async sendCustomReportMessage(a) {
      ec(a) || (a = [a]);
      r(a).call(a, Al);
      let b = t.reportApiInvoke(this._sessionId, {
        name: y.SEND_CUSTOM_REPORT_MESSAGE,
        options: [],
        tag: D.TRACER,
      });
      if (!this._joinInfo)
        return (
          (a = new m(
            l.INVALID_OPERATION,
            "can not send custom report, not joined"
          )),
          b.onError(a),
          a.throw()
        );
      await t.sendCustomReportMessage(this._joinInfo.sid, a);
    }
    getLocalAudioStats() {
      return this._highStream
        ? this._statsCollector.getLocalAudioTrackStats(
            this._highStream.connectionId
          )
        : te;
    }
    getRemoteAudioStats() {
      var a;
      let b = {};
      return (
        r((a = this._remoteStream)).call(a, (a, e) => {
          b[e] = this._statsCollector.getRemoteAudioTrackStats(a.connectionId);
        }),
        b
      );
    }
    getLocalVideoStats() {
      return this._highStream
        ? this._statsCollector.getLocalVideoTrackStats(
            this._highStream.connectionId
          )
        : ue;
    }
    getRemoteVideoStats() {
      var a;
      let b = {};
      return (
        r((a = this._remoteStream)).call(a, (a, e) => {
          b[e] = this._statsCollector.getRemoteVideoTrackStats(a.connectionId);
        }),
        b
      );
    }
    getRemoteNetworkQuality() {
      var a;
      let b = {};
      return (
        r((a = this._remoteStream)).call(a, (a, e) => {
          b[e] = this._statsCollector.getRemoteNetworkQualityStats(
            a.connectionId
          );
        }),
        b
      );
    }
    _reset() {
      var a, b, d;
      h.debug("[".concat(this._clientId, "] reset client"));
      this._axiosCancelSource.cancel();
      this._axiosCancelSource = Fb.CancelToken.source();
      this._streamFallbackTypeCacheMap = new Z();
      this._remoteStreamTypeCacheMap = new Z();
      this._defaultStreamFallbackType =
        this._proxyServer =
        this._joinInfo =
          void 0;
      this._sessionId = null;
      this._statsCollector.reset();
      this._channelName = this._uid = this._appId = this._key = void 0;
      r((a = this._users)).call(a, (a) => {
        a.audioTrack && (a.audioTrack.stop(), (a.audioTrack._isDestroyed = !0));
        a.videoTrack && (a.videoTrack.stop(), (a.videoTrack._isDestroyed = !0));
      });
      this._users = [];
      this._audioVolumeIndicationInterval &&
        (window.clearInterval(this._audioVolumeIndicationInterval),
        (this._audioVolumeIndicationInterval = void 0));
      this._highStream &&
        (this._highStream.closeP2PConnection(!0), (this._highStream = void 0));
      r((b = this._bindEnabledTracks)).call(b, (a) => {
        a.off(K.NEED_ADD_TRACK, this._handleLocalTrackEnable);
        a.off(K.NEED_REMOVE_TRACK, this._handleLocalTrackDisable);
      });
      this._bindEnabledTracks = [];
      this._lowStream &&
        (this._lowStream.closeP2PConnection(!0), (this._lowStream = void 0));
      r((d = this._remoteStream)).call(d, (a) => {
        a.closeP2PConnection(!0);
      });
      this._remoteStream = new Z();
      this._publishMutex = new cc("client-publish");
      this._subscribeMutex = new Z();
      this._networkQualityInterval &&
        (window.clearInterval(this._networkQualityInterval),
        (this._networkQualityInterval = void 0));
      this._injectStreamingClient &&
        (this._injectStreamingClient.terminate(),
        this._injectStreamingClient.removeAllListeners(),
        (this._injectStreamingClient = void 0));
      this._liveRawStreamingClient &&
        (this._liveRawStreamingClient.terminate(),
        this._liveRawStreamingClient.removeAllListeners(),
        (this._liveRawStreamingClient = void 0));
      this._liveTranscodeStreamingClient &&
        (this._liveTranscodeStreamingClient.terminate(),
        this._liveTranscodeStreamingClient.removeAllListeners(),
        (this._liveTranscodeStreamingClient = void 0));
      this._channelMediaRelayClient &&
        (this._channelMediaRelayClient.dispose(),
        (this._channelMediaRelayClient = void 0));
    }
    _renewSession() {
      var a, b;
      let d = pa(32, "").toUpperCase();
      h.debug(
        n(
          (a = n((b = "[".concat(this._clientId, "] renewSession "))).call(
            b,
            this._sessionId,
            " => "
          ))
        ).call(a, d)
      );
      this._sessionId = d;
      this._joinInfo && (this._joinInfo.sid = d);
      this._gateway.joinInfo && (this._gateway.joinInfo.sid = d);
    }
    async _publishHighStream(a) {
      if (!this._joinInfo)
        throw new m(
          l.INVALID_OPERATION,
          "Can't publish stream, haven't joined yet!"
        );
      if (
        "CONNECTED" !== this.connectionState &&
        "RECONNECTING" !== this.connectionState
      )
        throw new m(
          l.INVALID_OPERATION,
          "can not publish stream in ".concat(this.connectionState, " state")
        );
      if (
        "auto" === this._turnServer.mode &&
        w.FORCE_TURN &&
        !w.TURN_ENABLE_TCP &&
        !w.TURN_ENABLE_UDP
      )
        throw new m(
          l.UNEXPECTED_ERROR,
          "force TURN With No TURN Configuration"
        );
      if (
        (h.debug("[".concat(this._clientId, "] publish high stream")),
        this._highStream)
      )
        return await this._highStream.addTracks(a), this._highStream;
      this._highStream = new nl(
        this._statsCollector,
        this._joinInfo,
        this._codec
      );
      await this._highStream.addTracks(a);
      try {
        await this._gateway.publish(this._highStream, "high");
      } catch (b) {
        throw ((this._highStream = void 0), b);
      }
      return (
        this._highStream.on(G.CONNECTION_STATE_CHANGE, (a, d) => {
          this._highStream &&
            ("connected" === a
              ? this.emit(P.MEDIA_RECONNECT_END, this._highStream.getUserId())
              : "connecting" === a &&
                this.emit(
                  P.MEDIA_RECONNECT_START,
                  this._highStream.getUserId()
                ));
        }),
        this._highStream
      );
    }
    async _publishLowStream(a) {
      if (!this._joinInfo)
        throw new m(
          l.INVALID_OPERATION,
          "Can't publish stream, haven't joined yet!"
        );
      if (
        "CONNECTED" !== this.connectionState &&
        "RECONNECTING" !== this.connectionState
      )
        throw new m(
          l.INVALID_OPERATION,
          "can not publish stream in ".concat(this.connectionState, " state")
        );
      if (!this._highStream || "connected" !== this._highStream.connectionState)
        throw new m(l.UNEXPECTED_ERROR, "Could not find high stream");
      if (this._lowStream)
        return new m(
          l.UNEXPECTED_ERROR,
          "[".concat(
            this._clientId,
            "] Can't publish low stream when stream already publish"
          )
        ).throw();
      h.debug("[".concat(this._clientId, "] publish low stream"));
      this._lowStream = new nl(
        this._statsCollector,
        this._joinInfo,
        this._codec,
        !0
      );
      this._lowStream.lowStreamParameter = this._lowStreamParameter;
      await this._lowStream.addTracks([a]);
      try {
        await this._gateway.publish(this._lowStream, "low");
      } catch (b) {
        throw ((this._lowStream = void 0), b);
      }
      this._highStream.lowStreamConnection = this._lowStream;
    }
    _createLiveStreamingClient(a) {
      if (!this._joinInfo || !this._appId)
        return new m(
          l.INVALID_OPERATION,
          "can not create live streaming client, please join channel first"
        ).throw();
      let b = () =>
          new eq(
            this._joinInfo,
            this._config.websocketRetryConfig || Pa,
            this._config.httpRetryConfig || Pa
          ),
        d = (a) => {
          a.onLiveStreamError = (a, b) => {
            t.reportApiInvoke(this._sessionId, {
              name: y.ON_LIVE_STREAM_ERROR,
              options: [a, b],
              tag: D.TRACER,
            }).onSuccess();
            this.emit(P.LIVE_STREAMING_ERROR, a, b);
          };
          a.onLiveStreamWarning = (a, b) => {
            t.reportApiInvoke(this._sessionId, {
              name: y.ON_LIVE_STREAM_WARNING,
              options: [a, b],
              tag: D.TRACER,
            }).onSuccess();
            this.emit(P.LIVE_STREAMING_WARNING, a, b);
          };
          a.on(Rc.REQUEST_WORKER_MANAGER_LIST, (a, b, d) => {
            if (!this._joinInfo)
              return d(
                new m(
                  l.INVALID_OPERATION,
                  "can not find join info to get worker manager"
                )
              );
            ei(a, this._joinInfo, this._axiosCancelSource.token, Pa)
              .then(b)
              .catch(d);
          });
        };
      switch (a) {
        case na.RAW:
          return (
            this._liveRawStreamingClient ||
              ((this._liveRawStreamingClient = b()),
              d(this._liveRawStreamingClient)),
            this._liveRawStreamingClient
          );
        case na.TRANSCODE:
          return (
            this._liveTranscodeStreamingClient ||
              ((this._liveTranscodeStreamingClient = b()),
              d(this._liveTranscodeStreamingClient)),
            this._liveTranscodeStreamingClient
          );
        case na.INJECT:
          return (
            this._injectStreamingClient ||
              ((this._injectStreamingClient = b()),
              this._injectStreamingClient.on(
                Rc.REQUEST_WORKER_MANAGER_LIST,
                (a, b, d) => {
                  if (!this._joinInfo)
                    return d(
                      new m(
                        l.INVALID_OPERATION,
                        "can not find join info to get worker manager"
                      )
                    );
                  ei(a, this._joinInfo, this._axiosCancelSource.token, Pa)
                    .then(b)
                    .catch(d);
                }
              ),
              (this._injectStreamingClient.onInjectStatusChange = (a, b, d) => {
                this.emit(P.INJECT_STREAM_STATUS, a, b, d);
              })),
            this._injectStreamingClient
          );
      }
    }
    _createChannelMediaRelayClient() {
      return this._joinInfo
        ? (this._channelMediaRelayClient ||
            ((this._channelMediaRelayClient = new gq(
              this._joinInfo,
              this._clientId,
              this._config.websocketRetryConfig || Pa,
              this._config.httpRetryConfig || Pa
            )),
            this._channelMediaRelayClient.on("state", (a) => {
              "RELAY_STATE_FAILURE" === a &&
                this._channelMediaRelayClient &&
                this._channelMediaRelayClient.dispose();
              this.emit(P.CHANNEL_MEDIA_RELAY_STATE, a);
            }),
            this._channelMediaRelayClient.on("event", (a) => {
              this.emit(P.CHANNEL_MEDIA_RELAY_EVENT, a);
            })),
          this._channelMediaRelayClient)
        : new m(
            l.INVALID_OPERATION,
            "can not create channel media relay client, please join channel first"
          ).throw();
    }
    _handleGatewayEvents() {
      this._gateway.on(ya.DISCONNECT_P2P, () => {
        var a;
        h.debug("[".concat(this._clientId, "] start full reconnect"));
        this._highStream &&
          "disconnected" !== this._highStream.connectionState &&
          (h.debug(
            "[".concat(this._clientId, "] ready to reconnect high stream")
          ),
          this._highStream.readyToReconnectPC());
        this._lowStream &&
          "disconnected" !== this._lowStream.connectionState &&
          (h.debug(
            "[".concat(this._clientId, "] ready to reconnect low stream")
          ),
          this._lowStream.readyToReconnectPC());
        r((a = this._remoteStream)).call(a, (a, d) => {
          var b;
          h.debug(
            n(
              (b = "[".concat(
                this._clientId,
                "] ready to reconnect remote stream "
              ))
            ).call(b, d)
          );
          a.readyToReconnectPC();
        });
      });
      this._gateway.on(ya.CONNECTION_STATE_CHANGE, (a, b, d) => {
        var e, f;
        let g = () => {
          this.emit(P.CONNECTION_STATE_CHANGE, a, b, d);
        };
        if (
          (h.info(
            n(
              (e = n(
                (f = "[".concat(this._clientId, "] connection state change: "))
              ).call(f, b, " -> "))
            ).call(e, a)
          ),
          "DISCONNECTED" === a)
        )
          return this._reset(), this._renewSession(), void g();
        var k, l;
        if ("RECONNECTING" === a)
          this._highStream &&
            "connecting" === this._highStream.connectionState &&
            (h.debug(
              "[".concat(this._clientId, "] ready to reconnect high stream")
            ),
            this._highStream.readyToReconnectPC()),
            this._lowStream &&
              "connecting" === this._lowStream.connectionState &&
              (h.debug(
                "[".concat(this._clientId, "] ready to reconnect low stream")
              ),
              this._lowStream.readyToReconnectPC()),
            r((k = this._remoteStream)).call(k, (a, b) => {
              var d;
              "connecting" === a.connectionState &&
                (h.debug(
                  n(
                    (d = "[".concat(
                      this._clientId,
                      "] ready to reconnect remote stream "
                    ))
                  ).call(d, b)
                ),
                a.readyToReconnectPC());
            }),
            r((l = this._users)).call(l, (a) => {
              a._trust_in_room_ = !1;
              a._trust_audio_enabled_state_ = !1;
              a._trust_video_enabled_state_ = !1;
              a._trust_audio_mute_state_ = !1;
              a._trust_video_mute_state_ = !1;
              a._trust_stream_added_state_ = !1;
            }),
            this._userOfflineTimeout &&
              window.clearTimeout(this._userOfflineTimeout),
            this._streamRemovedTimeout &&
              window.clearTimeout(this._streamRemovedTimeout),
            (this._streamRemovedTimeout = this._userOfflineTimeout = void 0);
        else if ("CONNECTED" === a) {
          var m, p;
          r((m = this._streamFallbackTypeCacheMap)).call(m, (a, b) => {
            this._gateway
              .setStreamFallbackOption(b, a)
              .catch((a) =>
                h.warning(
                  "[".concat(
                    this._clientId,
                    "] auto set stream fallback option failed"
                  ),
                  a
                )
              );
          });
          r((p = this._remoteStreamTypeCacheMap)).call(p, (a, b) => {
            this._gateway
              .setRemoteVideoStreamType(b, a)
              .catch((a) =>
                h.warning(
                  "[".concat(
                    this._clientId,
                    "] auto set remote stream type failed"
                  ),
                  a
                )
              );
          });
          this._highStream && "connecting" === this._highStream.connectionState
            ? this._highStream
                .reconnectPC()
                .then(() => {
                  this._lowStream &&
                    "connecting" === this._lowStream.connectionState &&
                    this._lowStream.reconnectPC().catch((a) => {
                      h.error(
                        "[".concat(
                          this._clientId,
                          "] republish low stream error"
                        ),
                        a.toString()
                      );
                      this.emit(P.ERROR, { reason: a });
                    });
                })
                .catch((a) => {
                  h.error(
                    "[".concat(this._clientId, "] republish high stream error"),
                    a.toString()
                  );
                  this.emit(P.ERROR, { reason: a });
                })
            : this._lowStream &&
              "connecting" === this._lowStream.connectionState &&
              this._lowStream.reconnectPC().catch((a) => {
                h.error(
                  "[".concat(this._clientId, "] republish low stream error"),
                  a.toString()
                );
                this.emit(P.ERROR, { reason: a });
              });
          this._userOfflineTimeout = window.setTimeout(() => {
            var a;
            if ("CONNECTED" === this.connectionState) {
              this._userOfflineTimeout = void 0;
              var b = O((a = this._users)).call(a, (a) => !a._trust_in_room_);
              r(b).call(b, (a) => {
                var b;
                h.debug(
                  n(
                    (b = "[".concat(
                      this._clientId,
                      "] user offline timeout, emit user offline "
                    ))
                  ).call(b, a.uid)
                );
                this._handleUserOffline({ uid: a.uid });
              });
            }
          }, 3e3);
          this._streamRemovedTimeout = window.setTimeout(() => {
            var a;
            "CONNECTED" === this.connectionState &&
              ((this._streamRemovedTimeout = void 0),
              r((a = this._users)).call(a, (a) => {
                var b, d, e, f, g;
                a._trust_audio_mute_state_ ||
                  (h.debug(
                    n(
                      (b = "[".concat(
                        this._clientId,
                        "] auto dispatch audio unmute event "
                      ))
                    ).call(b, a.uid)
                  ),
                  this._handleMuteStream(a.uid, "audio", !1));
                a._trust_video_mute_state_ ||
                  (h.debug(
                    n(
                      (d = "[".concat(
                        this._clientId,
                        "] auto dispatch video unmute event "
                      ))
                    ).call(d, a.uid)
                  ),
                  this._handleMuteStream(a.uid, "video", !1));
                a._trust_audio_enabled_state_ ||
                  (h.debug(
                    n(
                      (e = "[".concat(
                        this._clientId,
                        "] auto dispatch enable local audio "
                      ))
                    ).call(e, a.uid)
                  ),
                  this._handleSetStreamLocalEnable("audio", a.uid, !0));
                !a._trust_video_enabled_state_ &&
                  a._video_enabled_ &&
                  (h.debug(
                    n(
                      (f = "[".concat(
                        this._clientId,
                        "] auto dispatch enable local video "
                      ))
                    ).call(f, a.uid)
                  ),
                  this._handleSetStreamLocalEnable("video", a.uid, !0));
                a._trust_stream_added_state_ ||
                  (h.debug(
                    n(
                      (g = "[".concat(
                        this._clientId,
                        "] auto dispatch stream remove "
                      ))
                    ).call(g, a.uid)
                  ),
                  this._handleRemoveStream({ uid: a.uid, uint_id: a._uintid }));
              }));
          }, 1e3);
        }
        g();
      });
      this._gateway.on(ya.REQUEST_NEW_GATEWAY_LIST, (a, b) => {
        if (!this._joinInfo)
          return b(new m(l.UNEXPECTED_ERROR, "can not recover, no join info"));
        bi(
          this._joinInfo,
          this._axiosCancelSource.token,
          this._config.httpRetryConfig || Pa
        )
          .then((b) => {
            var d;
            this._joinInfo && (this._joinInfo.apResponse = b.gatewayInfo.res);
            a(
              A((d = b.gatewayInfo.gatewayAddrs)).call(d, (a) =>
                "wss://".concat(a)
              )
            );
          })
          .catch(b);
      });
      this._gateway.on(ya.NETWORK_QUALITY, (a) => {
        "normal" === this._networkQualitySensitivity &&
          this.emit(P.NETWORK_QUALITY, a);
      });
      this._gateway.on(ya.STREAM_TYPE_CHANGE, (a, b) => {
        this.emit(P.STREAM_TYPE_CHANGED, a, b);
        t.reportApiInvoke(this._sessionId, {
          name: y.STREAM_TYPE_CHANGE,
          options: [a, b],
          tag: D.TRACER,
        }).onSuccess(z({ uid: a, streamType: b }));
      });
      this._gateway.on(ya.IS_P2P_DISCONNECTED, (a) => {
        var b, d, e;
        let f = [];
        return (
          this._highStream && f.push(this._highStream),
          r((b = this._remoteStream)).call(b, (a) => f.push(a)),
          0 === f.length ||
          0 === O(f).call(f, (a) => "connected" === a.connectionState).length
            ? a(!0)
            : (h.debug(
                n((d = "[".concat(this._clientId, "] "))).call(
                  d,
                  A(
                    (e = O(f).call(f, (a) => "connected" === a.connectionState))
                  ).call(e, (a) => a.connectionId),
                  " is connected"
                )
              ),
              void a(!1))
        );
      });
      this._gateway.on(ya.NEED_RENEW_SESSION, () => {
        this._renewSession();
      });
      this._gateway.signal.on(Y.ON_USER_ONLINE, this._handleUserOnline);
      this._gateway.signal.on(Y.ON_USER_OFFLINE, this._handleUserOffline);
      this._gateway.signal.on(Y.ON_ADD_AUDIO_STREAM, (a) =>
        this._handleAddAudioOrVideoStream("audio", a.uid, a.uint_id)
      );
      this._gateway.signal.on(Y.ON_ADD_VIDEO_STREAM, (a) =>
        this._handleAddAudioOrVideoStream("video", a.uid, a.uint_id)
      );
      this._gateway.signal.on(Y.ON_REMOVE_STREAM, this._handleRemoveStream);
      this._gateway.signal.on(Y.ON_P2P_LOST, this._handleP2PLost);
      this._gateway.signal.on(Y.MUTE_AUDIO, (a) =>
        this._handleMuteStream(a.uid, "audio", !0)
      );
      this._gateway.signal.on(Y.UNMUTE_AUDIO, (a) =>
        this._handleMuteStream(a.uid, "audio", !1)
      );
      this._gateway.signal.on(Y.MUTE_VIDEO, (a) =>
        this._handleMuteStream(a.uid, "video", !0)
      );
      this._gateway.signal.on(Y.UNMUTE_VIDEO, (a) =>
        this._handleMuteStream(a.uid, "video", !1)
      );
      this._gateway.signal.on(Y.RECEIVE_METADATA, (a) => {
        let b = Nh(a.metadata);
        this.emit(P.RECEIVE_METADATA, a.uid, b);
      });
      this._gateway.signal.on(Y.ON_DATA_STREAM, (a) => {
        a.seq && delete a.seq;
        a.payload = Nh(a.payload);
        this.emit(P.STREAM_MESSAGE, a.uid, a.payload);
        this.onStreamMessage && this.onStreamMessage(a);
      });
      this._gateway.signal.on(Y.ON_CRYPT_ERROR, () => {
        cd(() => {
          h.warning("[".concat(this._clientId, "] on crypt error"));
          this.emit(P.CRYPT_ERROR);
        }, this._sessionId);
      });
      this._gateway.signal.on(
        Y.ON_TOKEN_PRIVILEGE_WILL_EXPIRE,
        this._handleTokenWillExpire
      );
      this._gateway.signal.on(Y.ON_TOKEN_PRIVILEGE_DID_EXPIRE, () => {
        h.warning(
          "[".concat(
            this._clientId,
            "] received message onTokenPrivilegeDidExpire, please get new token and join again"
          )
        );
        this._reset();
        this._gateway.leave(!0);
        this.emit(P.ON_TOKEN_PRIVILEGE_DID_EXPIRE);
      });
      this._gateway.signal.on(Y.ON_STREAM_FALLBACK_UPDATE, (a) => {
        var b, d;
        h.debug(
          n(
            (b = n(
              (d = "[".concat(this._clientId, "] stream fallback peerId: "))
            ).call(d, a.stream_id, ", attr: "))
          ).call(b, a.stream_type)
        );
        this.emit(
          P.STREAM_FALLBACK,
          a.stream_id,
          1 === a.stream_type ? "fallback" : "recover"
        );
      });
      this._gateway.signal.on(Y.ENABLE_LOCAL_VIDEO, (a) => {
        this._handleSetStreamLocalEnable("video", a.uid, !0);
      });
      this._gateway.signal.on(Y.DISABLE_LOCAL_VIDEO, (a) => {
        this._handleSetStreamLocalEnable("video", a.uid, !1);
      });
      this._gateway.signal.on(N.REQUEST_TIMEOUT, (a, b) => {
        if (this._joinInfo)
          switch (a) {
            case ca.PUBLISH:
              var d;
              if (!b) break;
              a = "high" === b.stream_type ? this._highStream : this._lowStream;
              if (!a) break;
              "offer" === b.state &&
                t.publish(this._joinInfo.sid, {
                  lts: a.startTime,
                  succ: !1,
                  ec: l.TIMEOUT,
                  audio: b.audio,
                  video: b.video,
                  p2pid: b.p2p_id,
                  publishRequestid: a.ID,
                  screenshare: !(
                    !a.videoTrack ||
                    -1 === E((d = a.videoTrack._hints)).call(d, nb.SCREEN_TRACK)
                  ),
                  audioName: a.audioTrack && a.audioTrack.getTrackLabel(),
                  videoName: a.videoTrack && a.videoTrack.getTrackLabel(),
                });
              break;
            case ca.SUBSCRIBE:
              (d = this._remoteStream.get(b.stream_id)) &&
                b &&
                t.subscribe(this._joinInfo.sid, {
                  lts: d.startTime,
                  succ: !1,
                  ec: l.TIMEOUT,
                  audio: !!b.audio,
                  video: !!b.video,
                  peerid: b.stream_id,
                  subscribeRequestid: d.ID,
                  p2pid: d.pc.ID,
                });
          }
      });
    }
  }
  class jq extends Wk {
    constructor(a, b = {}) {
      super();
      this.currentLoopCount =
        this.pausePlayTime =
        this.startPlayOffset =
        this.startPlayTime =
          0;
      this._currentState = "stopped";
      this.audioBuffer = a;
      this.options = b;
      this.startPlayOffset = this.options.startPlayTime || 0;
    }
    set currentState(a) {
      a !== this._currentState &&
        ((this._currentState = a),
        this.emit(lb.AUDIO_SOURCE_STATE_CHANGE, this._currentState));
    }
    get currentState() {
      return this._currentState;
    }
    createWebAudioDiagram() {
      return this.context.createGain();
    }
    get duration() {
      return this.audioBuffer.duration;
    }
    get currentTime() {
      return "stopped" === this.currentState
        ? 0
        : "paused" === this.currentState
        ? this.pausePlayTime
        : (this.context.currentTime -
            this.startPlayTime +
            this.startPlayOffset) %
          this.audioBuffer.duration;
    }
    updateOptions(a) {
      "stopped" === this.currentState
        ? ((this.options = a),
          (this.startPlayOffset = this.options.startPlayTime || 0))
        : h.warning("can not set audio source options");
    }
    startProcessAudioBuffer() {
      this.sourceNode && this.stopProcessAudioBuffer();
      this.sourceNode = this.createSourceNode();
      this.startSourceNode();
      this.currentState = "playing";
    }
    pauseProcessAudioBuffer() {
      this.sourceNode &&
        "playing" === this.currentState &&
        ((this.pausePlayTime = this.currentTime),
        (this.sourceNode.onended = null),
        this.sourceNode.stop(),
        (this.sourceNode.buffer = null),
        (this.sourceNode = this.createSourceNode()),
        (this.currentState = "paused"));
    }
    seekAudioBuffer(a) {
      this.sourceNode &&
        ((this.sourceNode.onended = null),
        "playing" === this.currentState && this.sourceNode.stop(),
        (this.sourceNode = this.createSourceNode()),
        "playing" === this.currentState
          ? ((this.startPlayOffset = a), this.startSourceNode())
          : "paused" === this.currentState && (this.pausePlayTime = a));
    }
    resumeProcessAudioBuffer() {
      "paused" === this.currentState &&
        this.sourceNode &&
        ((this.startPlayOffset = this.pausePlayTime),
        (this.pausePlayTime = 0),
        this.startSourceNode(),
        (this.currentState = "playing"));
    }
    stopProcessAudioBuffer() {
      if (this.sourceNode) {
        this.sourceNode.onended = null;
        try {
          this.sourceNode.stop();
        } catch (a) {}
        this.reset();
      }
    }
    startSourceNode() {
      var a;
      this.sourceNode &&
        this.sourceNode.buffer &&
        (this.sourceNode.start(0, this.startPlayOffset),
        (this.startPlayTime = this.context.currentTime),
        (this.sourceNode.onended = Ba((a = this.handleSourceNodeEnded)).call(
          a,
          this
        )));
    }
    createSourceNode() {
      let a = this.context.createBufferSource();
      return (
        (a.buffer = this.audioBuffer),
        (a.loop = !!this.options.loop),
        a.connect(this.outputNode),
        a
      );
    }
    handleSourceNodeEnded() {
      if (
        ((this.currentLoopCount += 1),
        this.options.cycle && this.options.cycle > this.currentLoopCount)
      )
        return (
          (this.startPlayOffset = 0),
          (this.sourceNode = void 0),
          void this.startProcessAudioBuffer()
        );
      this.reset();
    }
    reset() {
      this.startPlayOffset = this.options.startPlayTime || 0;
      this.currentState = "stopped";
      this.sourceNode &&
        (this.sourceNode.disconnect(), (this.sourceNode = void 0));
      this.currentLoopCount = 0;
    }
  }
  let si = new Z();
  var kq = ha.setInterval;
  let pl = qa().name;
  Xb(
    "PROCESS_ID",
    (function () {
      var a, b, d, e;
      return n(
        (a = n(
          (b = n(
            (d = n((e = "process-".concat(pa(8, ""), "-"))).call(
              e,
              pa(4, ""),
              "-"
            ))
          ).call(d, pa(4, ""), "-"))
        ).call(b, pa(4, ""), "-"))
      ).call(a, pa(12, ""));
    })()
  );
  (function () {
    let a = qa();
    fa.getDisplayMedia = !(
      !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia
    );
    fa.getStreamFromExtension = a.name === ea.CHROME && 34 < Number(a.version);
    if (
      window.RTCRtpTransceiver &&
      "currentDirection" in RTCRtpTransceiver.prototype
    ) {
      var b = new RTCPeerConnection();
      var d = !1;
      try {
        b.addTransceiver("audio"), (d = !0);
      } catch (e) {}
      b = (b.close(), d);
    } else b = !1;
    fa.supportUnifiedPlan = b;
    fa.supportMinBitrate = a.name === ea.CHROME || a.name === ea.EDGE;
    b = qa();
    b =
      !!(
        window.RTCRtpSender &&
        window.RTCRtpSender.prototype.setParameters &&
        window.RTCRtpSender.prototype.getParameters
      ) &&
      (!!We() ||
        b.name === ea.SAFARI ||
        (b.name === ea.FIREFOX && 64 <= Number(b.version)));
    fa.supportSetRtpSenderParameters = b;
    (a.name !== ea.SAFARI && qa().name !== ea.WECHAT) ||
      (fa.supportDualStream = !1);
    b = qa();
    b = !(b.name === ea.SAFARI && 12 > Number(b.version));
    fa.webAudioMediaStreamDest = b;
    fa.supportReplaceTrack =
      !!window.RTCRtpSender &&
      "function" == typeof RTCRtpSender.prototype.replaceTrack;
    fa.supportWebGL = "undefined" != typeof WebGLRenderingContext;
    fa.supportRequestFrame = !!window.CanvasCaptureMediaStreamTrack;
    We() || (fa.webAudioWithAEC = !0);
    b = qa();
    b =
      (b.os === X.WIN_10 ||
        b.os === X.WIN_81 ||
        b.os === X.WIN_7 ||
        b.os === X.LINUX ||
        b.os === X.MAC_OS ||
        b.os === X.MAC_OS_X) &&
      b.name === ea.CHROME &&
      74 <= Number(b.version);
    fa.supportShareAudio = b;
    h.info("browser compatibility", z(fa), z(a));
  })();
  let yb = {
    VERSION: db,
    BUILD: "v4.2.1-0-gf505b57(2020/12/25 \u4e0a\u534810:21:56)",
    setParameter: Xb,
    getSupportedCodec: async function (a) {
      let b = null;
      a ? ((b = new el({})), b.addStream(a)) : (b = new fl({}));
      {
        a = await b.createOfferSDP();
        let d = { video: [], audio: [] };
        a =
          (a.match(/ VP8/i) && d.video.push("VP8"),
          a.match(/ H264/i) && d.video.push("H264"),
          a.match(/ opus/i) && d.audio.push("OPUS"),
          d);
      }
      return b.close(), a;
    },
    checkSystemRequirements: function () {
      let a = t.reportApiInvoke(null, {
        name: y.CHECK_SYSTEM_REQUIREMENTS,
        options: [],
        tag: D.TRACER,
      });
      var b = navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
        d = window.WebSocket;
      b = window.RTCPeerConnection && b && d;
      d = !1;
      let e = qa();
      e.name === ea.CHROME &&
        58 <= Number(e.version) &&
        e.os !== X.IOS &&
        (d = !0);
      e.name === ea.FIREFOX && 56 <= Number(e.version) && (d = !0);
      e.name === ea.OPERA && 45 <= Number(e.version) && (d = !0);
      e.name === ea.SAFARI && 11 <= Number(e.version) && (d = !0);
      (qa().name !== ea.WECHAT && qa().name !== ea.QQ) ||
        e.os === X.IOS ||
        (d = !0);
      h.debug("checkSystemRequirements, api:", b, "browser", d);
      b = b && d;
      return a.onSuccess(b), b;
    },
    getDevices: function (a) {
      return gb.enumerateDevices(!0, !0, a);
    },
    getMicrophones: function (a) {
      return gb.getRecordingDevices(a);
    },
    getCameras: function (a) {
      return gb.getCamerasDevices(a);
    },
    getElectronScreenSources: Ph,
    getPlaybackDevices: function (a) {
      return gb.getSpeakers(a);
    },
    createClient: function (a = { codec: "vp8", mode: "rtc" }) {
      let b = t.reportApiInvoke(null, {
        name: y.CREATE_CLIENT,
        options: [a],
        tag: D.TRACER,
      });
      try {
        bb(a.codec, "config.codec", ["vp8", "h264"]),
          bb(a.mode, "config.mode", ["rtc", "live"]),
          void 0 !== a.proxyServer &&
            La(a.proxyServer, "config.proxyServer", 1, 1e4),
          void 0 !== a.turnServer && Dh(a.turnServer),
          void 0 !== a.httpRetryConfig && Ch(a.httpRetryConfig),
          void 0 !== a.websocketRetryConfig && Ch(a.websocketRetryConfig);
      } catch (d) {
        throw (b.onError(d), d);
      }
      return (
        b.onSuccess(),
        new iq(
          Dc({ forceWaitGatewayResponse: !0 }, a, {
            role: "rtc" === a.mode ? "host" : a.role,
          })
        )
      );
    },
    createCameraVideoTrack: async function (a = {}) {
      let b = t.reportApiInvoke(null, {
          tag: D.TRACER,
          name: y.CREATE_CAM_VIDEO_TRACK,
          options: [of({}, a)],
        }),
        d = kf(a);
      var e = pa(8, "track-");
      let f = null;
      h.info("start create camera video track with config", z(a), "trackId", e);
      try {
        f = (await Eb({ video: d }, e)).getVideoTracks()[0] || null;
      } catch (g) {
        throw (b.onError(g), g);
      }
      if (!f)
        return (
          (e = new m(l.UNEXPECTED_ERROR, "can not find track in media stream")),
          b.onError(e),
          e.throw()
        );
      a.optimizationMode && pf(e, f, a, a.encoderConfig && vc(a.encoderConfig));
      a = new ml(f, a, d, a.optimizationMode, e);
      return (
        b.onSuccess(a.getTrackId()),
        h.info("create camera video success, trackId:", e),
        a
      );
    },
    createCustomVideoTrack: function (a) {
      let b = t.reportApiInvoke(null, {
          tag: D.TRACER,
          name: y.CREATE_CUSTOM_VIDEO_TRACK,
          options: [a],
        }),
        d = new $a(
          a.mediaStreamTrack,
          { bitrateMax: a.bitrateMax, bitrateMin: a.bitrateMin },
          a.optimizationMode
        );
      return (
        b.onSuccess(d.getTrackId()),
        h.info(
          "create custom video track success with config",
          a,
          "trackId",
          d.getTrackId()
        ),
        d
      );
    },
    createScreenVideoTrack: async function (a = {}, b = "disable") {
      let d = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.CREATE_SCREEN_VIDEO_TRACK,
        options: [of({}, a), b],
      });
      a.encoderConfig
        ? "string" == typeof a.encoderConfig ||
          (a.encoderConfig.width && a.encoderConfig.height) ||
          ((a.encoderConfig.width = { max: 1920 }),
          (a.encoderConfig.height = { max: 1080 }))
        : (a.encoderConfig = "1080p_2");
      var e = {};
      a.screenSourceType && (e.mediaSource = a.screenSourceType);
      a.extensionId && Yc() && (e.extensionId = a.extensionId);
      a.electronScreenSourceId && (e.sourceId = a.electronScreenSourceId);
      var f = a.encoderConfig ? Ie(a.encoderConfig) : null;
      f =
        ((e.mandatory = {
          chromeMediaSource: "desktop",
          maxWidth: f ? f.width : void 0,
          maxHeight: f ? f.height : void 0,
        }),
        f &&
          f.frameRate &&
          ("number" == typeof f.frameRate
            ? ((e.mandatory.maxFrameRate = f.frameRate),
              (e.mandatory.minFrameRate = f.frameRate))
            : ((e.mandatory.maxFrameRate =
                f.frameRate.max ||
                f.frameRate.ideal ||
                f.frameRate.exact ||
                void 0),
              (e.mandatory.minFrameRate =
                f.frameRate.min ||
                f.frameRate.ideal ||
                f.frameRate.exact ||
                void 0)),
          (e.frameRate = f.frameRate)),
        f && f.width && (e.width = f.width),
        f && f.height && (e.height = f.height),
        e);
      let g = pa(8, "track-"),
        k = null;
      e = null;
      let n = fa;
      if (!n.supportShareAudio && "enable" === b)
        return (
          (a = new m(
            l.NOT_SUPPORTED,
            "your browser or platform is not support share-screen with audio"
          )),
          d.onError(a),
          a.throw()
        );
      h.info(
        "start create screen video track with config",
        a,
        "withAudio",
        b,
        "trackId",
        g
      );
      try {
        let a = await Eb(
          {
            screen: f,
            screenAudio: "auto" === b ? n.supportShareAudio : "enable" === b,
          },
          g
        );
        k = a.getVideoTracks()[0] || null;
        e = a.getAudioTracks()[0] || null;
      } catch (B) {
        throw (d.onError(B), B);
      }
      if (!k)
        return (
          (a = new m(l.UNEXPECTED_ERROR, "can not find track in media stream")),
          d.onError(a),
          a.throw()
        );
      if (!e && "enable" === b)
        return (
          k && k.stop(),
          (a = new m(l.SHARE_AUDIO_NOT_ALLOWED)),
          d.onError(a),
          a.throw()
        );
      a.optimizationMode || (a.optimizationMode = "detail");
      a.optimizationMode &&
        (pf(g, k, a, a.encoderConfig && Ie(a.encoderConfig)),
        a.encoderConfig &&
          "string" != typeof a.encoderConfig &&
          (a.encoderConfig.bitrateMin = a.encoderConfig.bitrateMax));
      a = new $a(
        k,
        a.encoderConfig ? Ie(a.encoderConfig) : {},
        a.optimizationMode,
        g
      );
      if ((a._hints.push(nb.SCREEN_TRACK), !e))
        return (
          d.onSuccess(a.getTrackId()),
          h.info("create screen video track success", "video:", a.getTrackId()),
          a
        );
      b = new Za(e);
      return (
        d.onSuccess([a.getTrackId(), b.getTrackId()]),
        h.info(
          "create screen video track success",
          "video:",
          a.getTrackId(),
          "audio:",
          b.getTrackId()
        ),
        [a, b]
      );
    },
    createMicrophoneAndCameraTracks: async function (a = {}, b = {}) {
      var d, e, f;
      let g = t.reportApiInvoke(null, {
          tag: D.TRACER,
          name: y.CREATE_MIC_AND_CAM_TRACKS,
          options: [a, b],
        }),
        k = kf(b),
        p = ii(a),
        r = pa(8, "track-"),
        u = pa(8, "track-"),
        v = null,
        w = null;
      h.info(
        n(
          (d = n(
            (e = n(
              (f = "start create camera video track(".concat(
                u,
                ") and microphone audio track("
              ))
            ).call(f, r, ") with config, audio: "))
          ).call(e, z(a), ", video: "))
        ).call(d, z(b))
      );
      try {
        var A;
        let a = await Eb(
          { audio: p, video: k },
          n((A = "".concat(r, "-"))).call(A, u)
        );
        v = a.getAudioTracks()[0];
        w = a.getVideoTracks()[0];
      } catch (la) {
        throw (g.onError(la), la);
      }
      if (!v || !w) {
        var C = new m(
          l.UNEXPECTED_ERROR,
          "can not find tracks in media stream"
        );
        return g.onError(C), C.throw();
      }
      b.optimizationMode && pf(u, w, b, b.encoderConfig && vc(b.encoderConfig));
      a = new tg(v, a, p, r);
      b = new ml(w, b, k, b.optimizationMode, u);
      return (
        g.onSuccess([a.getTrackId(), b.getTrackId()]),
        h.info(
          n(
            (C = "create camera video track(".concat(
              u,
              ") and microphone audio track("
            ))
          ).call(C, r, ") success")
        ),
        [a, b]
      );
    },
    createMicrophoneAudioTrack: async function (a = {}) {
      let b = t.reportApiInvoke(null, {
          tag: D.TRACER,
          name: y.CREATE_MIC_AUDIO_TRACK,
          options: [a],
        }),
        d = ii(a);
      var e = pa(8, "track-");
      let f = null;
      h.info(
        "start create microphone audio track with config",
        z(a),
        "trackId",
        e
      );
      try {
        f = (await Eb({ audio: d }, e)).getAudioTracks()[0] || null;
      } catch (g) {
        throw (b.onError(g), g);
      }
      if (!f)
        return (
          (e = new m(l.UNEXPECTED_ERROR, "can not find track in media stream")),
          b.onError(e),
          e.throw()
        );
      a = new tg(f, a, d, e);
      return (
        b.onSuccess(a.getTrackId()),
        h.info("create microphone audio track success, trackId:", e),
        a
      );
    },
    createCustomAudioTrack: function (a) {
      let b = t.reportApiInvoke(null, {
          tag: D.TRACER,
          name: y.CREATE_CUSTOM_AUDIO_TRACK,
          options: [a],
        }),
        d = new Za(
          a.mediaStreamTrack,
          a.encoderConfig ? Fd(a.encoderConfig) : {}
        );
      return (
        h.info(
          "create custom audio track success with config",
          a,
          "trackId",
          d.getTrackId()
        ),
        b.onSuccess(d.getTrackId()),
        d
      );
    },
    createBufferSourceAudioTrack: async function (a) {
      let b = t.reportApiInvoke(null, {
          tag: D.TRACER,
          name: y.CREATE_BUFFER_AUDIO_TRACK,
          options: [a],
        }),
        d = pa(8, "track-");
      h.info(
        "start create buffer source audio track with config",
        z(a),
        "trackId",
        d
      );
      let e = a.source;
      if (!(a.source instanceof AudioBuffer))
        try {
          a.source = await xm(a.source, a.cacheOnlineFile);
        } catch (g) {
          return b.onError(g), g.throw();
        }
      let f = new jq(a.source);
      a = new Gp(e, f, a.encoderConfig ? Fd(a.encoderConfig) : {}, d);
      return (
        h.info("create buffer source audio track success, trackId:", d),
        b.onSuccess(a.getTrackId()),
        a
      );
    },
    setLogLevel: function (a) {
      h.setLogLevel(a);
    },
    enableLogUpload: function () {
      h.enableLogUpload();
    },
    disableLogUpload: function () {
      h.disableLogUpload();
    },
    createChannelMediaRelayConfiguration: function () {
      return new qi();
    },
    checkAudioTrackIsActive: async function (a, b = 5e3) {
      let d = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.CHECK_AUDIO_TRACK_IS_ACTIVE,
        options: [b],
      });
      if (!(a instanceof Za || a instanceof Ad)) {
        var e = new m(l.INVALID_TRACK, "the parameter is not a audio track");
        return d.onError(e), e.throw();
      }
      b && 1e3 > b && (b = 1e3);
      let f = a instanceof Za ? a.getTrackLabel() : "remote_track",
        g = (e = a.getVolumeLevel()),
        k = e,
        p = v();
      return new u((e) => {
        let l = kq(() => {
          var m = a.getVolumeLevel();
          g = m > g ? m : g;
          k = m < k ? m : k;
          m = 1e-4 < g - k;
          var q = v() - p;
          if (m || q > b) {
            var r;
            clearInterval(l);
            q = { duration: q, deviceLabel: f, maxVolumeLevel: g, result: m };
            h.info(
              n(
                (r = "[track-".concat(
                  a.getTrackId(),
                  "] check audio track active completed. "
                ))
              ).call(r, z(q))
            );
            d.onSuccess(q);
            e(m);
          }
        }, 200);
      });
    },
    checkVideoTrackIsActive: async function (a, b = 5e3) {
      var d;
      let e = t.reportApiInvoke(null, {
        tag: D.TRACER,
        name: y.CHECK_VIDEO_TRACK_IS_ACTIVE,
        options: [b],
      });
      if (!(a instanceof $a || a instanceof zd))
        return (
          (a = new m(l.INVALID_TRACK, "the parameter is not a video track")),
          e.onError(a),
          a.throw()
        );
      b && 1e3 > b && (b = 1e3);
      var f = a instanceof $a ? a.getTrackLabel() : "remote_track",
        g = a.getMediaStreamTrack();
      let k = document.createElement("video");
      k.style.width = "1px";
      k.style.height = "1px";
      k.setAttribute("muted", "");
      k.muted = !0;
      k.setAttribute("playsinline", "");
      k.controls = !1;
      pl === ea.SAFARI &&
        ((k.style.opacity = "0.01"),
        (k.style.position = "fixed"),
        (k.style.left = "0"),
        (k.style.top = "0"),
        document.body.appendChild(k));
      k.srcObject = new MediaStream([g]);
      k.play();
      let p = document.createElement("canvas");
      p.width = 160;
      p.height = 120;
      let r = (g = 0);
      try {
        let a = v();
        g = await ym(k, b, p, 4);
        r = v() - a;
      } catch (L) {
        throw (e.onError(L), L);
      }
      pl === ea.SAFARI && (k.pause(), k.remove());
      k.srcObject = null;
      b = 4 < g;
      f = { duration: r, changedPicNum: g, deviceLabel: f, result: b };
      return (
        h.info(
          n(
            (d = "[track-".concat(
              a.getTrackId(),
              "] check video track active completed. "
            ))
          ).call(d, z(f))
        ),
        e.onSuccess(f),
        b
      );
    },
    setArea: function (a) {
      var b;
      "string" == typeof a && (a = [a]);
      r(a).call(a, (a) => {
        if (!Aa(Ak).call(Ak, a))
          throw new m(l.INVALID_PARAMS, "invalid area code");
      });
      Xb("AREAS", a);
      let d = Jp(a);
      A((b = S(d))).call(b, (a) => {
        Xb(
          a,
          "LOG_UPLOAD_SERVER" === a ||
            "EVENT_REPORT_DOMAIN" === a ||
            "EVENT_REPORT_BACKUP_DOMAIN" === a
            ? d[a][0]
            : d[a]
        );
      });
      h.debug("set area success:", a.join(","));
    },
  };
  return (
    gb.on(Ub.CAMERA_DEVICE_CHANGED, (a) => {
      h.info("camera device changed", z(a));
      yb.onCameraChanged && yb.onCameraChanged(a);
    }),
    gb.on(Ub.RECORDING_DEVICE_CHANGED, (a) => {
      h.info("microphone device changed", z(a));
      yb.onMicrophoneChanged && yb.onMicrophoneChanged(a);
    }),
    gb.on(Ub.PLAYOUT_DEVICE_CHANGED, (a) => {
      h.debug("playout device changed", z(a));
      yb.onPlaybackDeviceChanged && yb.onPlaybackDeviceChanged(a);
    }),
    (ob.onAutoplayFailed = () => {
      h.info("detect audio element autoplay failed");
      yb.onAudioAutoplayFailed && yb.onAudioAutoplayFailed();
    }),
    ed.on("autoplay-failed", () => {
      h.info("detect webaudio autoplay failed");
      yb.onAudioAutoplayFailed && yb.onAudioAutoplayFailed();
    }),
    yb
  );
});
//# sourceMappingURL=AgoraRTC_N-production.js.map
