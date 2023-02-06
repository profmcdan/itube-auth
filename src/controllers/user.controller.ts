import prisma from '../config/database';

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.send({ success: true, data: { users } });
};

export const getOneUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.send({ success: true, data: { user } });
};

export const updateUser = async (req, res) => {
  const updated = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  });
  delete updated.password;
  res.send({ success: true, data: { user: updated } });
};

export const deleteUser = async (req, res) => {
  const deleted = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  delete deleted.password;
  res.send({ success: true, data: { user: deleted } });
};
