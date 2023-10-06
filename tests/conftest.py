from selenium import webdriver
import time
import pytest
import chromedriver_autoinstaller
from pyvirtualdisplay import Display
display = Display(visible=0, size=(800, 800))
display.start()

chromedriver_autoinstaller.install()


chrome_options = webdriver.ChromeOptions()
options = [
    "--window-size=1200,1200",
    "--ignore-certificate-errors"
]

for option in options:
    chrome_options.add_argument(option)


@pytest.fixture(scope="class")
def setup(request):
    request.cls.driver = webdriver.Chrome(options=chrome_options)
    request.cls.driver.get(
        'https://fetch.ai/docs/guides/agents/create-a-uagent')
    request.cls.driver.maximize_window()
    time.sleep(2)
    yield
    request.cls.driver.quit()
