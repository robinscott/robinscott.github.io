### Blog

#### Overview
The blog uses [Jekyll](http://jekyllrb.com) templating engine to generate the blog without the need for database. This is hosted on GitHub pages as a [User Page](https://help.github.com/articles/user-organization-and-project-pages). 

#### Updating the blog resources
1. Run `$ npm unpdate` to update node modules
2. Run `$ bower update` to update bower packages
3. Run `$ bundle update` to update gems

#### Building the blog locally
`$ grunt` will build the blog into the `_site` directory and start a local webserver at `http://localhost:4000`. The `_site` directory is only used for running the blog locally.

#### Publishing the blog
Pushing the blog code base to GitHub will automatically trigger GitHub to generate the blog using Jekyll. Including a `.nojekyll` file in the repo will stop GitHub from building the site.
