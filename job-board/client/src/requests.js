const endpointUrl = 'http://localhost:9000/graphql';

async function graphqlRequest (query, variables = {}) {
  const resp = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  });
  const respBody = await resp.json();
  if (respBody.errors) {
    const message = respBody.errors.map((err) => err.message).join('\n');
    throw new Error(`GraphQL Error: ${message}`);
  }
  return respBody.data;
};

export async function loadJobs () {
  const query = `{
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }`;
  const { jobs } = await graphqlRequest(query);
  return jobs;
};

export async function loadJob (id) {
  const query = `query JobQuery($id: ID!){
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }`;
  const { job } = await graphqlRequest(query, { id });
  return job;
};

export async function loadCompany (id) {
  const query = `query CompanyQuery($id: ID!){
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }`;
  const { company } = await graphqlRequest(query, { id });
  return company;
}
