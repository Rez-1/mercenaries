import { readdir } from 'fs/promises'

const getDirectories = async (source) => {
  return (await getList(source))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

const getList = async (source) => (await readdir(source, { withFileTypes: true }));

const getFileNames = async source => {
  return (await getList(source))
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name);
}

export { getDirectories, getFileNames }
