#!groovy

pipeline {

  agent any

  stages {

    // Build
    stage('Build') {
      agent {
        label 'virtualenv'
      }
      steps {
        deleteDir()
        checkout scm
        sh 'virtualenv env --no-site-packages'
        sh 'env/bin/pip install zc.recipe.egg==2.0.4 --no-cache-dir'
        sh 'env/bin/pip install -r api/docker/requirements.txt'
        sh 'env/bin/pip install -U https://github.com/zopefoundation/z3c.autoinclude/archive/pip.tar.gz#egg=z3c.autoinclude'
        wrap([$class: 'Xvfb']) {
          sh 'PYTHONPATH=$(pwd)/tests env/bin/pybot -v BROWSER:headlesschrome tests'
        }
        sh 'ls -al'
        // sh 'make build'
        // sh 'tar cfz build.tgz bin develop-eggs include lib parts src *.cfg Makefile requirements.txt'
        // stash includes: 'build.tgz', name: 'build.tgz'
      }
      post {
        always {
          step([
            $class: 'RobotPublisher',
            disableArchiveOutput: false,
            logFileName: 'parts/test/robot_log.html',
            onlyCritical: true,
            otherFiles: '**/*.png',
            outputFileName: 'parts/test/robot_output.xml',
            outputPath: '.',
            passThreshold: 100,
            reportFileName: 'parts/test/robot_report.html',
            unstableThreshold: 0
          ]);
        }
      }
    }

  }
}
