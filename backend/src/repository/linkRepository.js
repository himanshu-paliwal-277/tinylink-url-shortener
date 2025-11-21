import Link from '../schema/Link';
import crudRepository from './crudRepository';

const linkRepository = {
  ...crudRepository(Link),
};

export default linkRepository;
