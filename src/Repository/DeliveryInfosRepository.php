<?php

namespace App\Repository;

use App\Entity\DeliveryInfos;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DeliveryInfos|null find($id, $lockMode = null, $lockVersion = null)
 * @method DeliveryInfos|null findOneBy(array $criteria, array $orderBy = null)
 * @method DeliveryInfos[]    findAll()
 * @method DeliveryInfos[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DeliveryInfosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DeliveryInfos::class);
    }

    // /**
    //  * @return DeliveryInfos[] Returns an array of DeliveryInfos objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DeliveryInfos
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
