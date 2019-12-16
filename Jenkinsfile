pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  options {
    retry(3);
    timeout(time: 10, unit: 'MINUTES')
  }

  stages {
    stage('build') {
      steps {
        sh '''
          set -e
          yarn --registry https://registry.npm.taobao.org && npm run generate
          tar -cvf static.tar ./dist/*
          ls -al static.tar
        '''
      }
    }

    stage('deploy') {
      steps {
        sh '''
          set -e
          scp static.tar vitex.net:/home/ubuntu/vitex/vitex-page/
          ssh vitex.net "cd ~/vitex/vitex-page && rm -rf ./dist && tar -xvf static.tar"
        '''
      }
    }
  }

  post {
    always {
      sh '''
        curl https://vitex.net
      '''

      deleteDir()
    }
  }
}
