#!/usr/bin/env python3
import os
import sys
import subprocess
import argparse


PROFILES = {
    'staging': {
        'repository': 'gcr.io/fetch-ai-sandbox/docs-website',
    }
}
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _profile(text: str) -> str:
    if text not in PROFILES:
        available_profiles = ', '.join(PROFILES.keys())
        print(f'Invalid profile {text}. Please select one of [{available_profiles}]')
        sys.exit(1)

    return text


def parse_commandline() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--profile', type=_profile, default='staging', help='The profile to use')
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
    repository = PROFILES[args.profile]['repository']

    image_url = f'{repository}:{version}'

    print()
    print(f'Project root: {PROJECT_ROOT}')
    print(f'Profile.....: {args.profile}')
    print(f'Image Ref...: {image_url}')
    print(f'Push........: {push}')
    print()

    # Step 1. Build the image
    subprocess.check_call([
        'docker',
        'build',
        '--platform', 'linux/amd64',
        '-t', image_url,
        PROJECT_ROOT,
    ])

    # Step 2. Push the image
    if push:
        subprocess.check_call([
            'docker',
            'push',
            image_url,
        ])



if __name__ == '__main__':
    main()