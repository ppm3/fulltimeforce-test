import { getConfig } from "../api/config/config";

describe('getConfig', () => {
  it('should return the correct configuration', () => {
    process.env.PORT = '999';
    process.env.VERSION = '2';
    process.env.GITHUB_API_BASE_URL = 'http://test.com';
    process.env.GITHUB_URL_SEGMENT_REPOS = '/foo';
    process.env.GITHUB_URL_SEGMENT_COMMITS = '/bar';
    process.env.GITHUB_API_VERSION = '2022-11-28';

    const expectedConfig = {
      service: {
        port: '999',
        version: '2',
      },
      githubApi: {
        baseUrl: 'http://test.com',
        reposSegment: '/foo',
        commitSegment: '/bar',
        version: "2022-11-28",
      },
    };

    const config = getConfig();

    expect(config).toEqual(expectedConfig);
  });

  it('should use default values if environment variables are not set', () => {
    delete process.env.PORT;
    delete process.env.VERSION;
    delete process.env.GITHUB_API_BASE_URL;
    delete process.env.GITHUB_URL_SEGMENT_REPOS;
    delete process.env.GITHUB_URL_SEGMENT_COMMITS;
    delete process.env.GITHUB_API_VERSION;

    const expectedConfig = {
      service: {
        port: '3001',
        version: '1',
      },
      githubApi: {
        baseUrl: '',
        reposSegment: '',
        commitSegment: '',
        version: '',
      },
    };

    const config = getConfig();

    expect(config).toEqual(expectedConfig);
  });

  beforeEach(() => {
    jest.clearAllMocks()
  })
  
});