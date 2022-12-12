import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
});

const PlannerService = {

    getOne(id) {
    return api.get(`/recipes/${id}`)
    .then((res) => res.data)
    },

    getRecipes() {
    return api.get("/recipes")
        .then((res) => res.data)
    },

    getPlanner() {
        return api.get("/Planner")
            .then((res) => res.data)
        },
        
    createPlanner(user, recipes) {
        const plannerRecipe = {user: user, recipes}
    return api.post("/planner", plannerRecipe)
        .then(res => res.data)

    },

    updatePlanner(id, requestBody) {
    return api.put(`/planner/${id}`, requestBody)
    },

    deletePlanner(id) {
    return api.delete(`/planner/${id}`)
}

}
export default PlannerService;



