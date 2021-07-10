pipeline {
	agent any
	
	environment {
		DOCKER_IMAGE="docker-client"
	}

	options {
		timestamps()
		timeout(time: 25, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
		
	stages {
		stage("Development build") {
			steps {
				script {
					execute("docker build -t $DOCKER_USER/$DOCKER_IMAGE -f Dockerfile.dev .")
				}
			}
		}

		stage("Test runner") {
			steps {
				script {
					execute("docker run $DOCKER_USER/$DOCKER_IMAGE -e CI=true npm run test")
				}
			}
		}

		stage("Production build") {
			steps {
				script {
					execute("docker build -t $DOCKER_USER/$DOCKER_IMAGE -f Dockerfile.prod .")
				}
			}
		}

		stage("Publish build") {
			steps {
				script {
					if (isUnix()) {
						sh("echo \"$DOCKER_PASS\" | docker login -u \"$DOCKER_USER\" --password-stdin")
					}
					else {
						bat("echo | set /p=\"$DOCKER_PASS\" | docker login --username \"$DOCKER_USER\" --password-stdin")
					}

					execute("docker push $DOCKER_USER/$DOCKER_IMAGE")
				}
			}
		}
	}
}

def execute(command) {
	if (isUnix()) {
		sh(command)
	}
	else {
		bat(command)
	}
}