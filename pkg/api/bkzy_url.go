package api

import (
	"fmt"
	"strings"
)

//将访问地址分解为:协议，ip, 端口号,路径
// 协议指: http或者https
func decodeUrl(domain string) (protocol, ip, port string, paths []string) {
    if strings.Contains(domain, "http") {
        urls := strings.Split(domain, "//")
        protocol = urls[0]
        if len(urls) > 1 {
            ps := strings.Split(urls[1], "/")
            ips := strings.Split(ps[0], ":")
            ip = ips[0]
            if len(ips) > 1 {
                port = ips[1]
            }
            if len(ps) > 1 {
                paths = ps[1:]
            }
        }
    } else {
        ps := strings.Split(domain, "/")
        ips := strings.Split(ps[0], ":")
        ip = ips[0]
        if len(ips) > 1 {
            port = ips[1]
        }
        if len(ps) > 1 {
            paths = ps[1:]
        }
    }
    return
}
//合成url,结果类似: http://abc.com:8080
func encodeUrl(protocol, ip, port string, paths ...string) (domain string) {
    if len(protocol) == 0 {
        protocol = "http:"
    }
    if !strings.Contains(protocol, ":") {
        protocol += ":"
    }
    domain = fmt.Sprintf("%s//%s", protocol, ip)
    if len(port) > 0 {
        domain = fmt.Sprintf("%s:%s", domain, port)
    }
    if len(paths) > 0 {
        for _, v := range paths {
            domain += "/"
            domain += v
        }
    }
    return
}
func auth_url_check(auth_url, host string) string {
    _, ip, _, _ := decodeUrl(host)
    if strings.Contains(auth_url, ip) {
        return auth_url
    }
    protocol, _, port, paths := decodeUrl(auth_url)
    return encodeUrl(protocol, ip, port, paths...)
}