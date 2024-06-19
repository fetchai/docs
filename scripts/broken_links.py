import sys
from bs4 import BeautifulSoup
import requests

start_url = "http://localhost:3000/docs"

_404s = []
passed_urls = []
urls = []


def links_in_page(site):
    print("SITE IS: " + site)
    r = requests.get(site)

    if r.status_code == 200:
        s = BeautifulSoup(r.text, "html.parser")
        rs = s.find_all("a")

        for link in rs:
            href = link.get('href')
            print(href)
            if len(href) >= 5:
                if href[0:5] == "/docs":
                    fixed_link = href.replace(href[0:5], start_url)
            if href[0] == "#":
                fixed_link = site + href

            print (fixed_link)


# a hungry, brute force approach.
# recursively go through every link to find other links, and when a link fails start again from the parent.
def scrape(prev, site):
    r = requests.get(site)

    if r.status_code == 200:
        s = BeautifulSoup(r.text, "html.parser")
        rs = s.find_all("a")

        for link in rs:
            try:
                href = link['href']
            except:
                # a broken link is worth exiting
                print (link)
                print (_404s)
                sys.exit("")

            if len(href) >= 5:
                if href[0:5] == "/docs":
                    fixed_link = href.replace(href[0:5], start_url)
            if href[0] == "#":
                if "#" in site:
                    fixed_link = site
                else:
                    fixed_link = site + href

            if fixed_link not in passed_urls:
                if start_url in fixed_link:
                    if fixed_link not in passed_urls and fixed_link not in _404s:
                        t = requests.get(fixed_link)
                        if t.status_code == 200:
                            passed_urls.append(fixed_link)
                            scrape(start_url, fixed_link)
                        else:
                            _404s.append(site + ":" + fixed_link)
                            scrape(prev, prev)


scrape(start_url, start_url)

for a in _404s:
    print (a)
