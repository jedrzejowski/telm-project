import {cacheDataProviderProxy} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

export default cacheDataProviderProxy(simpleRestProvider("/api"));
