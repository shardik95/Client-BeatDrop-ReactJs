let _singleton=Symbol()

class FollowingService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FollowingService(_singleton);
        return this[_singleton]
    }

    findFollowingRecord(userName,followingName){
        return fetch("http://localhost:8080/api/getFollowing/UN/FN".replace("UN",userName).replace("FN",followingName))
            .then(response=>response.json());
    }


}
export default FollowingService;
