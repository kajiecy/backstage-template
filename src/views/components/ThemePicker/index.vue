<template>
    <el-color-picker
            v-model="theme"
            class="theme-picker"
            size="mini"
            popper-class="theme-picker-dropdown"
            :predefine="predefineColors"
            color-format="hex"
            @active-change="colorChange"/>
</template>

<script>

    const version = require('element-ui/package.json').version // element-ui version from node_modules
    const ORIGINAL_THEME = '#409EFF' // default color
    const THEME_COLOR = 'themeColor';

    export default {
        data() {
            return {
                chalk: '', // content of theme-chalk css
                theme: ORIGINAL_THEME,
                predefineColors: [
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                    '#4251f6',
                ]
            }
        },
        mounted() {
            // window.localStorage.setItem('loginInfo', JSON.stringify(items));
            // console.log('1111',window.localStorage.getItem(THEME_COLOR))
            let saveColor = window.localStorage.getItem(THEME_COLOR) || this.$store.getters.getThemeColor;
            this.theme = this.$store.getters.getThemeColor;

            this.$nextTick(function () {
                this.theme = saveColor
            });
        },
        watch: {
            theme(val, oldVal) {
                // console.log(val)
                if (typeof val !== 'string') return
                const themeCluster = this.getThemeCluster(val.replace('#', ''))
                const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
                // console.log("themeCluster", themeCluster)
                // this.$store.commit('setColorArray',themeCluster);
                // console.log("originalCluster", originalCluster)
                const getHandler = (variable, id) => {
                    return () => {
                        const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
                        const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

                        let styleTag = document.getElementById(id)
                        if (!styleTag) {
                            styleTag = document.createElement('style')
                            styleTag.setAttribute('id', id)
                            // console.log("-----------",styleTag)
                            document.head.appendChild(styleTag)
                        }
                        styleTag.innerText = newStyle
                    }
                }

                const chalkHandler = getHandler('chalk', 'chalk-style')

                if (!this.chalk) {
                    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
                    this.getCSSString(url, chalkHandler, 'chalk')
                } else {
                    chalkHandler()
                }

                const styles = [].slice.call(document.querySelectorAll('style'))
                        .filter(style => {
                            const text = style.innerText
                            return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
                        })
                styles.forEach(style => {
                    const {innerText} = style
                    if (typeof innerText !== 'string') return
                    style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
                })
                window.localStorage.setItem(THEME_COLOR, val);

                // this.$message({
                //     message: '换肤成功',
                //     type: 'success'
                // })
            }
        },

        methods: {
            updateStyle(style, oldCluster, newCluster) {
                // console.log(style)

                let newStyle = style
                oldCluster.forEach((color, index) => {
                    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
                })
                return newStyle
            },

            getCSSString(url, callback, variable) {
                const xhr = new XMLHttpRequest()
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                        callback()
                    }
                }
                xhr.open('GET', url)
                xhr.send()
            },

            getThemeCluster(theme) {
                const tintColor = (color, tint) => {
                    let red = parseInt(color.slice(0, 2), 16)
                    let green = parseInt(color.slice(2, 4), 16)
                    let blue = parseInt(color.slice(4, 6), 16)

                    if (tint === 0) { // when primary color is in its rgb space
                        return [red, green, blue].join(',')
                    } else {
                        red += Math.round(tint * (255 - red))
                        green += Math.round(tint * (255 - green))
                        blue += Math.round(tint * (255 - blue))

                        red = red.toString(16)
                        green = green.toString(16)
                        blue = blue.toString(16)

                        return `#${red}${green}${blue}`
                    }
                }

                const shadeColor = (color, shade) => {
                    let red = parseInt(color.slice(0, 2), 16)
                    let green = parseInt(color.slice(2, 4), 16)
                    let blue = parseInt(color.slice(4, 6), 16)

                    red = Math.round((1 - shade) * red)
                    green = Math.round((1 - shade) * green)
                    blue = Math.round((1 - shade) * blue)

                    red = red.toString(16)
                    green = green.toString(16)
                    blue = blue.toString(16)

                    return `#${red}${green}${blue}`
                }

                const clusters = [theme]
                for (let i = 0; i <= 9; i++) {
                    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
                }
                clusters.push(shadeColor(theme, 0.1))
                return clusters
            },
            colorChange(value) {
                this.theme = colorRGB2Hex(value);
            }
        }
    }

    function colorRGB2Hex(color) {
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);

        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    }

</script>

<style>
    .theme-picker .el-color-picker__trigger {
        vertical-align: middle;
    }

    .theme-picker-dropdown .el-color-dropdown__link-btn {
        display: none;
    }
</style>
