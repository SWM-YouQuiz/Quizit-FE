pipeline{
    agent {
        kubernetes{
            yaml '''
               apiVersoin: v1
               kind: Pod
               spec:
                 serviceAccountName: jenkins
                 containers:
                 - name: yq
                   image: mikefarah/yq
                   tty : true
                   command:
                   - sleep
                   args:
                   - infinity
                 - name: kaniko
                   image: gcr.io/kaniko-project/executor:debug
                   command:
                   - sleep
                   args:
                   - infinity
                   env:
                   - name: AWS_SDK_LOAD_CONFIG
                     value: true
            '''
        }
    }
    stages{
        stage('Git Clone'){
            steps{
                git url: 'https://github.com/SWM-YouQuiz/QuizIt-FE.git',
                    branch: 'dev',
                    credentialsId: "github_personal_access_token"
                script{
                    def commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true)
                    sh "echo ${commitHash}"
                    env.tag = commitHash
                }
            }
        }
        stage('Docker Build'){
            steps{
                container('kaniko'){
                    script{
                        sh "executor --dockerfile=Dockerfile --context=dir://${env.WORKSPACE} --destination=${env.ECR_FRONT_SERVICE}:${env.tag}"
                    }
                }
            }
            post{
                failure{
                    slackSend(color: '#FF0000', message: "FAIL : Docker 이미지 Push 실패 '${env.JOB_NAME} [${env.BUILD_NUMBER}]' tag: ${env.tag}")
                }
                success{
                    slackSend(color: '#0AC9FF', message: "SUCCESS : Docker 이미지 Push 성공 '${env.JOB_NAME} [${env.BUILD_NUMBER}]' tag: ${env.tag}")
                }
            }
        }
        stage('Git Manifest Edit & Push'){
            steps{
                container('yq'){
                    script {
                        dir('helm') {
                            git url: 'https://github.com/SWM-YouQuiz/Helm.git',
                                branch: 'dev',
                                credentialsId: "github_personal_access_token"
                            sh "yq e -i -P '.quizItService.front.image.tag = \"${env.tag}\"' values-dev.yaml"
                        }
                    }
                }
                script{
                    dir('helm'){
                        withCredentials([gitUsernamePassword(credentialsId: 'github_personal_access_token')]){
                            sh 'git config --global user.email "<>"'
                            sh 'git config --global user.name "Jenkins-Front"'
                            sh "git add ."
                            sh "git commit -m '${env.tag}'"
                            sh 'git push origin dev'
                        }
                    }
                }
            }
        }
    }
}