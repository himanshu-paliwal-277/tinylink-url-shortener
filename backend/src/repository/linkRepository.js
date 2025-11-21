import Link from '../schema/link.js';
import crudRepository from './crudRepository.js';

const linkRepository = {
  ...crudRepository(Link),
};

export default linkRepository;
