#!/usr/bin/env python3
import os
import sys
import subprocess
import argparse


PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

REPOSITORY = os.environ.get('IMAGE_REVAMP_REPOSITORY')

BUILD_ENV_VARS = (
    'BACKEND_URL',
    'NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID',
    'NEXT_PUBLIC_ALGOLIA_APP_ID',
    'NEXT_PUBLIC_ALGOLIA_API_KEY',
    'NEXT_PUBLIC_ALGOLIA_INDEX',
    'NEWSLETTER_BASE_URL',
    'SENDER_TOKEN'
)


def parse_commandline() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument('-n', '--no-push', dest='push', action='store_false', help='Disable pusing of the image')
    parser.add_argument('-f', '--force-build', action='store_true', help=argparse.SUPPRESS)
    return parser.parse_args()


def detect_local_modifications() -> bool:
    exit_code = subprocess.call(['git', 'diff-index', '--quiet', 'HEAD'])
    return exit_code != 0


def get_version() -> str:
    return subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD']).decode().strip()


def main():
    args = parse_commandline()

    # validate the repository environment variable
    if REPOSITORY is None:
        print('Missing IMAGE_REPOSITORY environment variable')
        sys.exit(1)

    # argument validation / augmentation
    push = args.push
    if detect_local_modifications():
        if args.force_build:
            push = False
            print('Disabling push of images due to local modifications')
        else:
            print('Detected local modifications. Please commit and try again')
            sys.exit(1)

    # lookup the required information
    version = get_version()

    image_url = f'{REPOSITORY}:{version}'

    print()
    print(f'Project root: {PROJECT_ROOT}')
    print(f'Image Ref...: {image_url}')
    print(f'Push........: {push}')
    print()

    # Step 0. Collect up the build environment variables
    build_args = []
    for env_name in BUILD_ENV_VARS:
        if env_name not in os.environ:
            print('Missing build variable', env_name)
            sys.exit(1)

        build_args.append(f'--build-arg={env_name}={os.environ[env_name]}')

    # Step 1. Build the image
    cmd = [
        'docker',
        'build',
    ] + build_args + [
        '--platform', 'linux/amd64',
        '-t', image_url,
        PROJECT_ROOT,
    ]
    subprocess.check_call(cmd)

    # Step 2. Push the image
    if push:
        subprocess.check_call([
            'docker',
            'push',
            image_url,
        ])



if __name__ == '__main__':
    main()
