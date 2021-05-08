const express = require("express");
const axios = require("axios");
const endpoint_url = "https://mcuapi.herokuapp.com/api/v1";

const router = express.Router();

router.get("", (req, res, next) => {
  res.send("Hello from router");
});

router.get("/movies", (req, res, next) => {
  const pageNumber = req.query.currentPage;
  const totalSize = req.query.pageSize;
  axios
    .get(`${endpoint_url}/movies`, {
      params: {
        order: "release_date, DESC",
        page: pageNumber,
        limit: totalSize,
      },
    })
    .then((response) => {
      res.status(200).json({
        message: "Fetched successfully",
        movies: response.data.data,
        totalMovies: response.data.total,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error while fetching movies: " + error,
        movies: null,
      });
    });
});

router.get("/movies/:id", (req, res, next) => {
  const id = req.params.id;
  axios
    .get(`${endpoint_url}/movies/${id}`)
    .then((response) => {
      res
        .status(200)
        .json({ message: "Fetched successfully", movie: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error while fetching movies: " + error,
        movie: null,
      });
    });
});

router.get("/box-office", (req, res, next) => {
  axios
    .get(`${endpoint_url}/movies`, {
      params: { limit: "5", order: "box_office,DESC" },
    })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Fetched successfully", movies: response.data.data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error while fetching movies: " + error,
        movie: null,
      });
    });
});

router.get("/filter-movies", (req, res, next) => {
  const filterText = req.query.searchText;
  axios
    .get(`${endpoint_url}/movies`, {
      params: {
        order: "release_date, DESC",
        filter: `title=${filterText}`,
      },
    })
    .then((response) => {
      res.status(200).json({
        message: "Fetched successfully",
        movies: response.data.data,
        totalMovies: response.data.total,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error while fetching movies: " + error,
        movies: null,
      });
    });
});

// router.get("/upcoming-movies", (req, res, next) => {
//   axios
//     .get(`${endpoint_url}/movies`, {
//       params: { order: "release_date,DESC" },
//     })
//     .then((response) => {
//       res
//         .status(200)
//         .json({
//           message: "Fetched successfully",
//           upcomingMovie: response.data.data,
//         })
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: "Error while fetching movies: " + error,
//         movies: null,
//       });
//     });;
// });

router.get("/filter-tv-shows", (req, res, next) => {
  const filterText = req.query.searchText;
  axios
    .get(`${endpoint_url}/tvshows`, {
      params: {
        order: "release_date, DESC",
        filter: `title=${filterText}`,
      },
    })
    .then((response) => {
      res.status(200).json({
        message: "Fetched successfully",
        tvShows: response.data.data,
        totalTvshows: response.data.total,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error while fetching movies: " + error,
        movies: null,
      });
    });
});

router.get("/tv-shows", (req, res, next) => {
  const pageNumber = req.query.currentPage;
  const totalSize = req.query.pageSize;
  axios
    .get(`${endpoint_url}/tvshows`, {
      params: {
        order: "release_date, DESC",
        page: pageNumber,
        limit: totalSize,
      },
    })
    .then((response) => {
      res.status(200).json({
        message: "Fetched successfully",
        tvShows: response.data.data,
        totalTvshows: response.data.total,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error while fetching tv-shows: " + error,
        tvshows: null,
      });
    });
});

router.get("/tv-shows/:id", (req, res, next) => {
  const id = req.params.id;
  axios
    .get(`${endpoint_url}/tvshows/${id}`)
    .then((response) => {
      res
        .status(200)
        .json({ message: "Fetched successfully", tvshow: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error while fetching tv-shows: " + error.data,
        tvshow: null,
      });
    });
});

module.exports = router;
