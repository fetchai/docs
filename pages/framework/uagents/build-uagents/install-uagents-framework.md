# Install Fetch.ai μAgents framework

There exist 2 options to install the uagents package on your system:

## Option 1: Install from PyPI

1. Create a directory for your μAgents related project: `mkdir directory_name`

2. Within the directory, create and open a virtual environment using Poetry: `poetry init -n && poetry shell`

3. Install Fetch.ai μAgents Framework: `pip install uagents`

4. Check if installation was successful: `pip show uagents`

## Option 2: Install from source code

1. Download the latest released version from Github and navigate to the uAgents directory:

    ```py
    git clone https://github.com/fetchai/uAgents.git
    cd uAgents
    ```

2. Install the required dependencies:

    ```py
    poetry install
    ```

3. Open the virtual environment:

    ```py
    poetry shell
    ```

## Troubleshooting

It is possible that you may face issues during the installation process. Here, you can find common problems and their solutions:

**Problem (MacOS/Python 3.11)**: 

   `Installing coincurve (17.0.0): Failed`

**Solution**: install the latest versions of `automake`, `autoconf`, and `libtool`: 

   `brew install automake autoconf libtool`

For any other problems, please let us know by creating an [issue](https://github.com/fetchai/uAgents/issues).
