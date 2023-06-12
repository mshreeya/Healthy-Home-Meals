<h1 align="center">Healthy Home Meals</h1>

<p align="center">
<a href="https://healthy-home-meals.dashroshan.com"><img src = "https://img.shields.io/badge/Visit Site-Page?style=flat&logo=alibabacloud&logoColor=white&color=2F6BFF" height = 30px></a> <a href="https://www.youtube.com/watch?v=JQY2UnyVrqY"><img src = "https://img.shields.io/badge/Watch on YouTube-Page?style=flat&logo=youtube&logoColor=white&color=FE0100" height = 30px></a>
</p>

<img src="./frontend/public/banner.png" width="100%"/>

<br>

<p style="text-align: justify;">
<b>Healthy home meals</b> is a web app which enables users to take a picture of their refrigerator, or items over the kitchen top, detects the ingredients present in the picture along with the ones they usually have at home, considers allergies and dietary styles like vegan, lactose-free etc, and recommends healthy recipes that they can make at home. They include detailed step-by-step instructions, youtube video, and other info like cuisine, and cooking time from a dataset of over 5000 Indian recipes.</p>

## Made with

| Tech used    | For                                       |
| ------------ | ----------------------------------------- |
| React.js     | Frontend                                  |
| Flask        | Backend                                   |
| MongoDB      | Database                                  |
| Tensorflow and CustomVision   | ML model to detect ingredients in picture |
| SciKit Learn | ML model to find matching recipes         |
| Azure | Hosting                |
| Cloudflare   | CDN for static data                       |

## Setup process

### Frontend

- Open _frontend/src/index.js_ and update _window.APIROOT_ to the base URL for the backend. Default URL is given below.

```
window.APIROOT = "http://127.0.0.1:4950/"
```

- Run the below command in _frontend_ folder.

```
npm install
```

### Backend

- Run the below command in _backend_ folder.

```
pip install -r requirements.txt
```

- Create an OAuth client ID in Google cloud console with the below info.

```md
# Authorized JavaScript origins

http://127.0.0.1:4950
https://127.0.0.1:4950

# Authorized redirect URIs

http://127.0.0.1:4950/callback
https://127.0.0.1:4950/callback
```

- Download the _client_secret.json_ file and save it in the _backend_ folder.

- Create a _YouTube Data API v3_ key from Google cloud console.

- Include an attribute _data_ in the _client_secret.json_ file as below.

```json
{
  "web": {
    // No changes here
  },
  "data": {
    "redirect_uri": "http://127.0.0.1:4950/callback",
    "home": "http://127.0.0.1:3000",
    "mongo": "MongoDB URL here",
    "youtube": "YouTube Data API v3 key here"
  }
}
```

## Running process

### Frontend

Run the below command in the frontend folder.

```
npm run start
```

### Backend

Run the below command in the backend folder.

```
python main.py
```

## ML Datasets

[**Google Drive**](https://drive.google.com/drive/folders/1IjCJlIM78uOY4-LvpVpV6utcSv4wHqpo)
