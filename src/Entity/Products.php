<?php

namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProductsRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
 * @ORM\Entity(repositoryClass=ProductsRepository::class)
 * @ORM\HasLifecycleCallbacks
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={"products_read"}
 *      },
 *      denormalizationContext={
 *          "disable_type_enforcement"=true
 *      }
 * )
 * @ApiFilter(OrderFilter::class, properties={"createdAt"}, arguments={"orderParameterName"="order"})
 */
class Products
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"products_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"products_read"})
     * @Groups({"orders_read"})
     * @Assert\NotBlank(message="Veuillez donner un nom à votre produit")
     * @Assert\Type(type="string", message="Le nom du produit doit être une chaine de caractère")
     * @Assert\Length(min=3, max="30", minMessage="Le nom du produit doit faire plus de 3 caractères", maxMessage="Le nom du produit ne doit pas dépasser 30 caractères")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"products_read"})
     * @Assert\Length(min=20, max="400", minMessage="La description du produit doit faire plus de 20 caractères", maxMessage="Le description du produit ne doit pas dépasser 400 caractères")
     */
    private $description;

    /**
     * @ORM\Column(type="float")
     * @Groups({"products_read"})
     * @Groups({"orders_read"})
     * @Assert\NotBlank(message="Veuillez donner un prix à votre produit")
     * @Assert\Type(type="numeric", message="Le prix du produit doit être numérique")
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"products_read"})
     */
    private $picture;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"products_read"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=OrderDetails::class, mappedBy="product")
     */
    private $orderDetails;

    /**
     * Permet d'intialiser la date de création
     * 
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function initializeCreatedAt(){
        if(empty($this->createdAt)){
            $this->createdAt = new \DateTime('Europe/Brussels');
        }
    }

    public function __construct()
    {
        $this->orderDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice($price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection|OrderDetails[]
     */
    public function getOrderDetails(): Collection
    {
        return $this->orderDetails;
    }

    public function addOrderDetail(OrderDetails $orderDetail): self
    {
        if (!$this->orderDetails->contains($orderDetail)) {
            $this->orderDetails[] = $orderDetail;
            $orderDetail->setProduct($this);
        }

        return $this;
    }

    public function removeOrderDetail(OrderDetails $orderDetail): self
    {
        if ($this->orderDetails->removeElement($orderDetail)) {
            // set the owning side to null (unless already changed)
            if ($orderDetail->getProduct() === $this) {
                $orderDetail->setProduct(null);
            }
        }

        return $this;
    }
}
