<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\DeliveryInfosRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=DeliveryInfosRepository::class)
 * @ApiResource(
 *     collectionOperations={"GET"},
 *     itemOperations={"GET"},
 *     denormalizationContext={
 *          "disable_type_enforcement"=true
 *      }
 * )
 */
class DeliveryInfos
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     * @Assert\NotBlank(message="Veuillez indiquez votre nom")
     * @Assert\Type(type="string", message="Votre nom doit être une chaine de caractère")
     * @Assert\Length(min=2, max="50", minMessage="Votre nom doit faire plus de 2 caractères", maxMessage="Votre nom ne doit pas dépasser 50 caractères")
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     * @Assert\NotBlank(message="Veuillez indiquez votre prénom")
     * @Assert\Type(type="string", message="Votre prénom doit être une chaine de caractère")
     * @Assert\Length(min=2, max="50", minMessage="Votre prénom doit faire plus de 2 caractères", maxMessage="Votre prénom ne doit pas dépasser 50 caractères")
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     * @Assert\NotBlank(message="Veuillez indiquez votre adresse email")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=22)
     * @Groups({"orders_read"})
     * @Assert\Type(type="string", message="Votre numéro de téléphone doit être une chaine de caractère")
     * @Assert\NotBlank(message="Veuillez indiquez votre numéro de téléphone")
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     * @Assert\Type(type="string", message="Votre adresse doit être une chaine de caractère")
     * @Assert\NotBlank(message="Veuillez indiquez votre adresse")
     */
    private $adress;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     * @Assert\Type(type="string", message="Votre code postal doit être une chaine de caractère")
     * @Assert\NotBlank(message="Veuillez indiquez votre code postal")
     */
    private $zip;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     * @Assert\Type(type="string", message="Votre ville doit être une chaine de caractère")
     * @Assert\NotBlank(message="Veuillez indiquez votre ville")
     */
    private $city;

    /**
     * @ORM\OneToOne(targetEntity=Orders::class, inversedBy="deliveryInfos", cascade={"persist", "remove"})
     */
    private $Orders;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname($lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname($firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone($phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress($adress): self
    {
        $this->adress = $adress;

        return $this;
    }

    public function getZip(): ?string
    {
        return $this->zip;
    }

    public function setZip($zip): self
    {
        $this->zip = $zip;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity($city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getOrders(): ?Orders
    {
        return $this->Orders;
    }

    public function setOrders(?Orders $Orders): self
    {
        $this->Orders = $Orders;

        return $this;
    }
}
