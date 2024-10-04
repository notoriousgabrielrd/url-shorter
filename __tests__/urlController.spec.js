import { shortenUrl, listUserUrls } from '../src/controllers/urlController';
import { nanoid } from 'nanoid';
import { createUrl, findUrlsAndClickSumByUserId } from '../src/models/Url';
import { findUserById } from '../src/models/User';

jest.mock('nanoid');
jest.mock('../src/models/Url');
jest.mock('../src/models/User');

describe('UrlController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { originalUrl: 'https://example.com' },
      user: { user_id: '123' },
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost:3000'),
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    nanoid.mockReturnValue('abc123');
  });

  describe('shortenUrl', () => {
    it('should return the shortened URL', async () => {
      const mockUrl = { shorter_url: 'abc123' };
      createUrl.mockResolvedValue(mockUrl);
      findUserById.mockResolvedValue({ user_id: '123' });

      await shortenUrl(req, res);

      expect(nanoid).toHaveBeenCalledWith(6); // Verifica se o nanoid gerou um ID de 6 caracteres
      expect(createUrl).toHaveBeenCalledWith({
        original_url: 'https://example.com',
        shorter_url: 'abc123',
        user_id: '123',
      });
      expect(res.json).toHaveBeenCalledWith({
        shorter_url: 'http://localhost:3000/urls/abc123',
      });
    });
  });

  describe('listUserUrls', () => {
    it('should return the URLs and total clicks for a user', async () => {
      req.user = { user_id: '123' };
      const mockUrls = [{ id: '1', original_url: 'https://example.com' }];
      const mockTotalClicks = 10;
      findUrlsAndClickSumByUserId.mockResolvedValue({
        urls: mockUrls,
        totalClicks: mockTotalClicks,
      });

      await listUserUrls(req, res);

      expect(findUrlsAndClickSumByUserId).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({
        urls: mockUrls,
        totalClicks: mockTotalClicks,
      });
    });
  });
});
