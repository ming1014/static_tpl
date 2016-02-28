var build = require('./conf/build.json');
var csslint = require('./conf/csslint.json');
var jslint = require('./conf/jslint.json');
var deploy_test = require('./conf/deploy_test.json');
var pkg = require('./conf/pkg.json');
fis.config.merge({
    project: {
        exclude: ['node_modules/**','output/**'],
        fileType: {
            font: "ttf,woff,svg,eot",
            image: "png,jpg,gif"
        }
    },
    modules:{
        parser:{
            tpl : 'handlebars',
            scss: ['sass'],
            md: 'marked'
        },
        postpackager: 'seajs', //
        // postpackager: 'simple', //
        optimizer: {
            // js : 'uglify-js',
            css : 'clean-css',
            png : 'png-compressor'
        },
        spriter:'csssprites', // fis-spriter-csssprites
        packager: 'map',
        deploy: ['default', 'ftp','git'],
        // postprocessor: {
        //     vm: 'amd',
        //     js: 'amd'
        // }
    },
    settings:{
        parser:{
            sass : {
                include_paths : ['/src/scss/lib/**.scss']
            },
            handlebars:{
                useData: true
            }
        },

        spriter:{
            csssprites:{
                width_limit:1024,
                height_limit:1024,
                margin: 5,
                layout: "matrix"
            }
        },
        lint:{
            csslint: csslint,
            jshint: jslint
        },
        deploy: {
            default:{
                local: {
                    to: './output'
                }
            },
            ftp: {
                // local_test: {
                //     remoteDir : '/home/sftp/mysftp',
                //     connect : {
                //         host : '172.16.50.184',
                //         port : '22',
                //         user : 'mysftp',
                //         password : 'ufenqi@123'
                //     }
                // }

                local_test: {
                    remoteDir : '/static/staticTpl',
                    connect : {
                        host : '172.16.50.185',
                        port : '21',
                        user : 'deploy',
                        password : 'ufenqi@123'
                    }
                }
            },
            git: {
                gitTest: deploy_test.git.dev,
                gitPublish: deploy_test.git.master,
                gitBranch: deploy_test.git.branch
            }
        },
        postpackager: {
            simple: {
                autoCombine: true,
                autoReflow: true
            }
        },
    },
    roadmap:{
        path: build.packs,
        ext: {
            scss : 'css',
            tpl : 'js',
            md: 'html'
        },
        domain: build.domain // 上线前域名设置
    },
    pack: pkg.pack,
    webfont: { //字体生成
        'src': 'src/css/font/svg/',
        'dest': 'src/css/font/',
        'fontname': 'ufq_font',
        'types':'svg,eot,woff,ttf',
        'order':'name'
    },
    
})

fis.config.set('modules.parser.handlebars', 'handlebars-3.x');
fis.config.set('project.fileType.text', 'handlebars');
fis.config.set('roadmap.ext.handlebars', 'js');
fis.config.set("project.watch.usePolling", true)



