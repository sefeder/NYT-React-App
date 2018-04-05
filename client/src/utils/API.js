import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=465a473b34ef4dd4a0ee8c44278471a2";
const TURL = "&q=";
const SYURL = "&begin_date=";
const SYDATE = "0101";
const EYURL = "&end_date=";
const EYDATE = "1231";


export default {
    getArticles: function(topic, startYear, endYear) {
        return axios.get(BASEURL + TURL + topic + SYURL + startYear + SYDATE + EYURL + endYear + EYDATE)
    }
}