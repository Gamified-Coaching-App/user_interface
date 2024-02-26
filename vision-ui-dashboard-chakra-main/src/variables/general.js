// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar7 from "assets/img/avatars/avatar7.png";
import avatar8 from "assets/img/avatars/avatar8.png";
import avatar9 from "assets/img/avatars/avatar9.png";
import avatar10 from "assets/img/avatars/avatar10.png";
// Custom icons
import {
  AdobexdLogo,
  AtlassianLogo,
  InvisionLogo,
  JiraLogo,
  SlackLogo,
  SpotifyLogo,
} from "components/Icons/Icons.js";
import { AiOutlineExclamation } from "react-icons/ai";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";
import { SiDropbox } from "react-icons/si";
import {useState, useEffect} from 'react';
import AWS from 'aws-sdk';
import { BiCurrentLocation } from "react-icons/bi";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const dashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "Chakra Soft UI Version",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Add Progress Track",
    members: [avatar3, avatar2],
    budget: "$3,000",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "Fix Platform Errors",
    members: [avatar10, avatar4],
    budget: "Not set",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Launch our Mobile App",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "$32,000",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "Add the New Pricing Page",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "$400",
    progression: 25,
  },
  {
    logo: InvisionLogo,
    name: "Redesign New Online Shop",
    members: [avatar9, avatar3, avatar2],
    budget: "$7,600",
    progression: 40,
  },
];

export const timelineData = [
  {
    logo: FaBell,
    title: "$2400, Design changes",
    date: "22 DEC 7:20 PM",
    color: "brand.200",
  },
  {
    logo: FaHtml5,
    title: "New order #4219423",
    date: "21 DEC 11:21 PM",
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "Server Payments for April",
    date: "21 DEC 9:28 PM",
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "New card added for order #3210145",
    date: "20 DEC 3:52 PM",
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "Unlock packages for Development",
    date: "19 DEC 11:35 PM",
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "New order #9851258",
    date: "18 DEC 4:41 PM",
  },
];
export const rtlDashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "نسخة Vision UI",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "إضافة مسار التقدم",
    members: [avatar3, avatar2],
    budget: "$3,000",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "إصلاح أخطاء النظام الأساسي",
    members: [avatar10, avatar4],
    budget: "غير مضبوط",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "إطلاق تطبيق الهاتف المحمول الخاص بنا",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "$32,000",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "أضف صفحة التسعير الجديدة",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "$400",
    progression: 25,
  },
  {
    logo: InvisionLogo,
    name: "إعادة تصميم متجر جديد على الإنترنت",
    members: [avatar9, avatar3, avatar2],
    budget: "$7,600",
    progression: 40,
  },
];

export const rtlTimelineData = [
  {
    logo: FaBell,
    title: "$2400, تغييرات في التصميم",
    date: "22 DEC 7:20 PM",
    color: "teal.300",
  },
  {
    logo: FaHtml5,
    title: "طلب جديد #4219423",
    date: "21 DEC 11:21 PM",
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "مدفوعات الخادم لشهر أبريل",
    date: "21 DEC 9:28 PM",
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "تمت إضافة بطاقة جديدة للطلب #3210145",
    date: "20 DEC 3:52 PM",
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "فتح الحزم من أجل التنمية",
    date: "19 DEC 11:35 PM",
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "طلب جديد #9851258",
    date: "18 DEC 4:41 PM",
  },
];

// My CODE =====================================================================================
export let challengesData = [
  {
    challenge_id: "1",
    completed_meters: 4000,
    target_meters: 20000,
    status: "current",
    points: 2000,
    start_date: "2024-02-26T00:00:00",
    end_date: "2024-02-28T23:59:59"
  },
  {
    challenge_id: "2",
    completed_meters: 4000,
    target_meters: 5000,
    status: "current",
    points: 1000,
    start_date: "2024-02-26T00:00:00",
    end_date: "2024-02-28T23:59:59"
  },
  {
    challenge_id: "3",
    completed_meters: 400,
    target_meters: 10000,
    status: "current",
    points: 15000,
    start_date: "2024-02-26T00:00:00",
    end_date: "2024-02-28T23:59:59"
  },
  {
    challenge_id: "4",
    completed_meters: 5000,
    target_meters: 12000,
    status: "current",
    points: 3000,
    start_date: "2024-02-26T00:00:00",
    end_date: "2024-02-28T23:59:59"
  },
  {
    challenge_id: "5",
    completed_meters: 7000,
    target_meters: 10000,
    status: "current",
    points: 5000,
    start_date: "2024-02-26T00:00:00",
    end_date: "2024-02-28T23:59:59"
  },
];

export let leaderboardData = [
  {
    username: "test_bot_1",
    position_new: 2,
    position_old: 3,
    aggregate_skills_season: 10
  },
  {
    username: "test_bot_2",
    position_new: 3,
    position_old: 2,
    aggregate_skills_season: 9
  },
  {
    username: "Gabriel",
    position_new: 1,
    position_old: 1,
    aggregate_skills_season: 16
  },
  {
    username: "test_bot_97",
    position_new: 4,
    position_old: 4,
    aggregate_skills_season: 1
  },
];

export let workoutData = {"0": 0,"1":5.64,"2":7.49,"3":7.59,"5":8.73,"7":8.9,"9":11.25,"10":11.25,"12":11.08,"13":11.08,"15":10.81,"17":10.81,"19":10.88,"21":10.92,"23":10.92,"24":10.81,"28":10.41,"30":10.35,"32":10.28,"35":10.31,"39":10.85,"40":10.18,"41":10.18,"44":10.58,"45":10.55,"46":10.48,"47":9.91,"48":9.87,"49":9.87,"51":10.38,"52":10.55,"54":10.61,"58":10.58,"62":9.87,"66":9.64,"68":9.67,"71":9.87,"72":10.52,"74":11.02,"77":10.98,"82":11.05,"83":11.05,"86":11.05,"88":11.02,"89":11.02,"95":10.98,"99":11.12,"100":11.15,"104":11.22,"105":11.22,"106":11.25,"111":11.29,"115":11.29,"120":11.25,"121":11.25,"122":11.25,"124":11.25,"125":11.25,"128":11.22,"132":11.19,"137":10.95,"138":10.92,"140":10.75,"142":10.78,"145":10.78,"146":10.78,"151":10.95,"152":10.95,"155":10.95,"156":10.95,"159":10.88,"162":10.85,"166":10.71,"167":10.65,"169":10.68,"173":10.75,"175":10.75,"178":10.71,"180":10.78,"181":10.78,"183":10.45,"187":10.08,"188":10.21,"190":10.38,"193":10.58,"195":10.78,"198":10.92,"199":10.92,"203":10.81,"207":10.58,"210":10.52,"212":10.48,"218":10.52,"220":10.48,"225":10.45,"232":10.45,"233":10.45,"239":10.48,"243":10.45,"244":10.45,"247":10.35,"249":10.35,"252":10.31,"256":10.31,"262":10.35,"263":10.21,"266":9.91,"269":9.81,"271":10.14,"277":9.91,"278":9.94,"282":10.08,"288":10.28,"293":10.01,"298":9.91,"299":9.91,"304":10.04,"311":10.04,"318":10.11,"321":10.35,"326":10.41,"330":10.68,"332":10.71,"336":10.71,"340":10.58,"343":10.45,"350":10.35,"351":10.38,"357":10.08,"361":9.98,"362":10.04,"367":10.45,"368":10.48,"370":10.41,"372":10.31,"374":10.35,"380":10.35,"381":10.35,"385":9.34,"387":8.23,"388":8,"391":7.15,"394":5.75,"396":5.04,"400":10.11,"402":10.61,"404":10.92,"408":10.48,"409":10.41,"410":10.31,"413":10.14,"416":10.25,"417":10.31,"418":10.38,"421":10.48,"422":10.52,"424":10.52,"427":10.21,"428":10.11,"429":9.98,"433":9.44,"435":9.27,"439":9.14,"443":9.21,"445":10.08,"450":9.74,"455":9.51,"462":8.6,"467":4.8,"468":4.97,"470":4.54,"473":3.59,"480":3.83,"481":3.83,"484":4.2,"488":4.23,"493":4.57,"495":4.8,"500":10.28,"506":9.91,"507":9.91,"512":9.67,"517":9.34,"523":9.47,"525":9.67,"529":9.91,"531":9.91,"534":9.94,"537":9.91,"540":9.77,"542":9.64,"546":11.25,"551":10.21,"552":10.01,"557":9.17,"562":9.17,"564":9.21,"568":9.27,"574":8.94,"581":9.1,"582":9.1,"584":9.57,"585":9.71,"588":9.84,"591":9.54,"592":8.8,"593":8.63,"599":8.33,"604":9.84,"608":10.14,"613":10.21,"619":10.58,"622":10.52,"627":10.28,"634":9.77,"640":10.25,"642":10.25,"648":10.55,"649":10.55,"655":10.71,"658":10.68,"663":10.65,"671":9.71,"677":7.76,"681":0,"683":2.15,"685":7.59,"688":9,"691":10.52,"693":10.38,"695":10.28,"700":9.77,"702":9.14,"704":9.17,"706":9.27,"709":8.97,"710":8.87,"714":8.77,"719":9.37,"722":9.67,"729":10.14,"730":10.21,"733":10.31,"735":10.25,"741":9.84,"747":9,"748":8.83,"754":7.69,"758":6.11,"765":1.65,"768":5.61,"769":0,"773":0.87,"774":0,"778":0.81,"783":4.67,"784":5.85,"785":6.28,"787":6.92,"788":8,"793":10.28,"795":10.21,"799":10.01,"801":9.98,"806":10.14,"812":11.12,"818":12.16,"819":12.16,"826":11.92,"832":11.76,"834":11.82,"840":11.69,"847":11.69,"848":11.69,"854":11.79,"858":11.92,"865":11.99,"869":9.34,"870":7.66,"873":6.45,"875":6.72,"877":0,"879":0,"881":1.34,"886":5.68,"887":5.68,"892":6.11,"901":5.98,"903":5.95,"909":5.78,"910":5.81,"917":11.99,"921":10.68,"924":10.58,"928":11.05,"929":11.05,"931":11.15,"934":11.56,"937":11.46,"942":11.79,"944":11.79,"949":11.59,"953":11.39,"954":11.35,"957":11.29,"961":11.22,"967":11.19,"971":11.22,"975":11.25,"979":11.22,"980":11.19,"984":10.71,"985":10.58,"992":9.81,"999":10.18,"1002":10.78,"1007":11.25,"1010":11.22,"1017":11.02,"1018":10.98,"1025":10.88,"1032":10.98,"1039":11.08,"1043":11.08,"1045":11.12,"1051":11.08,"1058":10.95,"1065":10.88,"1068":10.88,"1070":10.88,"1076":10.88,"1079":10.85,"1086":10.78,"1088":10.78,"1094":10.88,"1098":10.95,"1104":10.98,"1106":10.98,"1111":10.95,"1114":10.92,"1118":10.92,"1124":10.85,"1125":10.81,"1133":10.65,"1134":10.61,"1136":10.58,"1137":10.58,"1142":10.55,"1144":10.55,"1145":10.55,"1152":10.52,"1156":10.55,"1163":10.55,"1165":10.55,"1166":10.55,"1167":10.55,"1174":10.52,"1181":10.52,"1182":10.52,"1184":10.52,"1186":10.52,"1192":10.55,"1199":10.58,"1207":10.58,"1213":10.31,"1214":10.31,"1215":10.28,"1222":10.18,"1223":10.18,"1224":10.18,"1230":10.01,"1237":9.94,"1239":9.98,"1243":9.67,"1245":9.51,"1247":9.41,"1251":9.54,"1252":9.54,"1254":9.54,"1261":9.84,"1269":9.98,"1271":10.01,"1273":10.04,"1279":10.11,"1286":10.01,"1292":9.94,"1294":9.74,"1296":0,"1299":0,"1302":0,"1305":0,"1306":0,"1309":0,"1311":2.12,"1313":4.03,"1315":4.7,"1320":4.8,"1323":4.64,"1324":4.6,"1331":4.57,"1333":4.57,"1339":4.67,"1342":4.54,"1347":4.57,"1348":4.57,"1349":4.57,"1355":4.87,"1361":9.81,"1362":9.84,"1365":9.98,"1367":9.98,"1370":9.87,"1371":9.87,"1372":9.81,"1375":9.77,"1379":9.71,"1381":9.64,"1383":9.64,"1386":9.61,"1390":9.57,"1391":9.57,"1398":9.98,"1400":10.08,"1404":10.01,"1411":10.14,"1413":10.18,"1421":10.31,"1422":10.31,"1430":10.08,"1438":10.11,"1440":10.14,"1442":10.14,"1449":10.14,"1450":10.14,"1458":10.08,"1459":10.08,"1466":10.04,"1468":10.04,"1474":10.01,"1482":9.87,"1487":9.87,"1490":9.87,"1493":9.87,"1499":9.87,"1500":9.87,"1506":9.87,"1512":9.77,"1519":9.74,"1521":9.74,"1524":9.71,"1531":9.71,"1533":9.71,"1541":9.71,"1543":9.67,"1550":9.74,"1552":9.74,"1553":9.77,"1554":9.77,"1559":9.77,"1566":9.71,"1567":9.71,"1573":9.61,"1581":9.51,"1583":9.51,"1590":9.51,"1595":9.51,"1599":9.54,"1607":9.51,"1608":9.47,"1616":9.51,"1617":9.51,"1625":9.51,"1630":9.51,"1638":9.54,"1639":9.54,"1647":9.47,"1649":9.47,"1655":9.57,"1662":9.94,"1664":10.08,"1671":10.31,"1675":10.28,"1682":10.31,"1684":10.35,"1692":10.48,"1693":10.48,"1701":10.41,"1705":10.35,"1707":10.11,"1709":8.83,"1712":6.25,"1713":6.25,"1714":6.25,"1715":5.88,"1718":4.57,"1719":4.57,"1722":4.74,"1726":4.67,"1727":4.64,"1731":4.6,"1735":4.5,"1740":4.57,"1741":4.57,"1744":4.6,"1745":4.6,"1746":4.6,"1750":4.6,"1751":4.6,"1753":4.64,"1759":4.6,"1760":2.99,"1764":0,"1765":0,"1766":0,"1771":1.61,"1773":1.92,"1775":0,"1777":0,"1778":0,"1781":0,"1785":0,"1790":0,"1793":0,"1798":0,"1800":0,"1803":0.91,"1804":5.14,"1806":7.59,"1808":8.97,"1811":9.14,"1812":9.07,"1813":9,"1816":8.8,"1817":8.83,"1820":8.94,"1821":8.94,"1822":9.04,"1824":9.14,"1827":9.1,"1829":9,"1831":8.83,"1833":8.73,"1835":8.73,"1836":8.73,"1838":8.77,"1841":8.87,"1842":8.87,"1847":9,"1849":9.07,"1851":9.1,"1859":9.24,"1867":9.31,"1870":9.41,"1873":9.51,"1879":9.54,"1885":9.44,"1886":9.47,"1893":9.57,"1899":9.61,"1906":9.64,"1914":9.67,"1918":9.51,"1921":9.37,"1924":8.77,"1927":8.46,"1932":9.34,"1936":7.42,"1937":7.39,"1940":8.4,"1941":8.36,"1944":7.25,"1948":8.33,"1950":7.09,"1955":7.12,"1958":6.92,"1959":7.12,"1962":7.59,"1964":7.19,"1970":6.31,"1971":6.31,"1976":7.62,"1980":7.79,"1984":7.66,"1987":7.62,"1988":7.62,"1991":7.52,"1992":7.46,"1993":6.79,"1995":7.09,"1996":7.39,"2000":8.03,"2005":8.2,"2007":7.83,"2009":8.03,"2011":11.59,"2012":11.59,"2013":9.34,"2014":8.33,"2016":8.03,"2018":8,"2020":7.93,"2022":8.06,"2023":8.3,"2027":8.67,"2033":9.74,"2036":9.41,"2038":8.6,"2040":8.53,"2043":8.43,"2049":9.21,"2051":9.17,"2052":7.69,"2056":9.41,"2058":9.41,"2061":9.24,"2064":9.21,"2065":9.21,"2068":8.16,"2069":8.06,"2073":7.62,"2074":7.62,"2076":7.59,"2077":7.59,"2079":7.76,"2083":8.06,"2086":8.1,"2087":8,"2088":7.86,"2090":7.73,"2092":7.79,"2093":7.86,"2097":8.7,"2103":8.56,"2108":7.05,"2115":7.29,"2116":7.05,"2120":7.05,"2122":7.02,"2123":6.69,"2125":7.15,"2127":7.29,"2129":7.19,"2131":6.99,"2132":6.92,"2138":8.83,"2139":8.83,"2142":7.05,"2145":5.44,"2151":5.21,"2152":5.51,"2156":8.23,"2160":8.36,"2163":8.53,"2169":8.77,"2171":8.9,"2175":8.5,"2177":8.5,"2183":8.73,"2185":8.33,"2188":8.1,"2190":7.96,"2193":7.86,"2194":7.86,"2196":7.73,"2198":7.69,"2202":7.66,"2205":7.73,"2208":7.59,"2209":7.52,"2211":7.42,"2217":7.56,"2222":8.5,"2225":8.2,"2226":8.2,"2228":7.05,"2230":6.38,"2234":5.04,"2235":5.04,"2236":5,"2238":4.64,"2240":4.2,"2242":4.17,"2246":4.23,"2247":4.33,"2248":4.37,"2251":4.3,"2252":4.3,"2254":4.3,"2256":4.2,"2258":4.17,"2260":4.57,"2261":4.67,"2262":4.8,"2264":5.17,"2265":5.34,"2267":7.62,"2269":7.42,"2270":7.39,"2273":7.05,"2275":6.79,"2276":7.12,"2278":7.59,"2279":7.86,"2280":7.86,"2284":8.26,"2285":8.13,"2287":8.26,"2289":8.4,"2290":8.46,"2292":8.56,"2293":8.6,"2299":8.87,"2301":8.94,"2308":8.94,"2310":8.9,"2316":9.04,"2323":9.34,"2330":9.41,"2335":9.37,"2341":9.27,"2346":9.31,"2353":9.24};

export const fetchLeaderboard = async () => {
  try {
    const params = {
      TableName: 'leaderboard_mock'
    };
    const {tableData} = await dynamoDb.scan(params).promise();
    console.log("Hey brother");
    //leaderboardData = tableData;
  } catch (error) {
    console.log("Hey brother2");
    console.error("Error fetching the data:", error);
  }
}
// My CODE =====================================================================================

export const tablesTableData = [
  {
    logo: avatar1,
    name: "Esthera Jackson",
    email: "alexa@simmmple.com",
    subdomain: "Manager",
    domain: "Organization",
    status: "Online",
    date: "14/06/21",
  },
  {
    logo: avatar2,
    name: "Alexa Liras",
    email: "laurent@simmmple.com",
    subdomain: "Programmer",
    domain: "Developer",
    status: "Offline",
    date: "12/05/21",
  },
  {
    logo: avatar3,
    name: "Laurent Michael",
    email: "laurent@simmmple.com",
    subdomain: "Executive",
    domain: "Projects",
    status: "Online",
    date: "07/06/21",
  },
  {
    logo: avatar4,
    name: "Freduardo Hill",
    email: "freduardo@simmmple.com",
    subdomain: "Manager",
    domain: "Organization",
    status: "Online",
    date: "14/11/21",
  },
  {
    logo: avatar5,
    name: "Daniel Thomas",
    email: "daniel@simmmple.com",
    subdomain: "Programmer",
    domain: "Developer",
    status: "Offline",
    date: "21/01/21",
  },
  {
    logo: avatar7,
    name: "Mark Wilson",
    email: "mark@simmmple.com",
    subdomain: "Designer",
    domain: "UI/UX Design",
    status: "Offline",
    date: "04/09/20",
  },
];

export const tablesProjectData = [
  {
    logo: AdobexdLogo,
    name: "Vision UI Version",
    budget: "$14,000",
    status: "Working",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Add Progress Track",
    budget: "$3,000",
    status: "Canceled",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "Fix Platform Errors",
    budget: "Not set",
    status: "Done",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Launch our Mobile App",
    budget: "$32,000",
    status: "Done",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "Add the New Pricing Page",
    budget: "$400",
    status: "Working",
    progression: 25,
  },
];

export const invoicesData = [
  {
    date: "March, 01, 2020",
    code: "#MS-415646",
    price: "$180",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "February, 10, 2020",
    code: "#RV-126749",
    price: "$250",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "April, 05, 2020",
    code: "#FB-212562",
    price: "$560",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "June, 25, 2019",
    code: "#QW-103578",
    price: "$120",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "March, 01, 2019",
    code: "#AR-803481",
    price: "$300",
    logo: FaFilePdf,
    format: "PDF",
  },
];

export const billingData = [
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    number: "FRB1235476",
  },
  {
    name: "Lucas Harper",
    company: "Stone Tech Zone",
    email: "lucas@stone-tech.com",
    number: "FRB1235476",
  },
  {
    name: "Ethan James",
    company: "Fiber Notion",
    email: "ethan@fiber.com",
    number: "FRB1235476",
  },
];

export const newestTransactions = [
  {
    name: "Netflix",
    date: "27 March 2021, at 12:30 PM",
    price: "- $2,500",
    logo: FaArrowDown,
  },
  {
    name: "Apple",
    date: "27 March 2021, at 12:30 PM",
    price: "+ $2,500",
    logo: FaArrowUp,
  },
];

export const olderTransactions = [
  {
    name: "Stripe",
    date: "26 March 2021, at 13:45 PM",
    price: "+ $800",
    logo: FaArrowUp,
  },
  {
    name: "HubSpot",
    date: "26 March 2021, at 12:30 PM",
    price: "+ $1,700",
    logo: FaArrowUp,
  },
  {
    name: "Webflow",
    date: "26 March 2021, at 05:00 PM",
    price: "Pending",
    logo: AiOutlineExclamation,
  },
  {
    name: "Microsoft",
    date: "25 March 2021, at 16:30 PM",
    price: "- $987",
    logo: FaArrowDown,
  },
];
